import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { ReferralForm } from '../ReferralForm';
import { useCreateReferral } from '@/features/referrals/hooks/useCreateReferral';
import { useRouter } from 'next/navigation';
import { NetworkError, ApiError } from '@/lib/api/client';

jest.mock('@/features/referrals/hooks/useCreateReferral');
jest.mock('next/navigation');

const mockUseCreateReferral = useCreateReferral as jest.MockedFunction<typeof useCreateReferral>;
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

const mockMutate = jest.fn();
const mockPush = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  mockUseRouter.mockReturnValue({
    push: mockPush,
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  } as any);

  mockUseCreateReferral.mockReturnValue({
    mutate: mockMutate,
    isPending: false,
    isError: false,
    isSuccess: false,
    error: null,
    data: undefined,
    reset: jest.fn(),
    mutateAsync: jest.fn(),
  } as any);
});

describe('ReferralForm', () => {
  it('should render all form fields', () => {
    render(<ReferralForm />);
    
    expect(screen.getByLabelText('Nombre')).toBeDefined();
    expect(screen.getByLabelText('Email')).toBeDefined();
    expect(screen.getByLabelText('Teléfono')).toBeDefined();
  });

  it('should render submit button', () => {
    render(<ReferralForm />);
    
    const submitButton = screen.getByRole('button', { name: 'Invitar' });
    expect(submitButton).toBeDefined();
  });

  it('should show validation error for empty name', async () => {
    render(<ReferralForm />);
    
    const submitButton = screen.getByRole('button', { name: 'Invitar' });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('El nombre es requerido')).toBeDefined();
    });
  });

  it('should show validation error for invalid email', async () => {
    render(<ReferralForm />);
    
    const nameInput = screen.getByLabelText('Nombre');
    const emailInput = screen.getByLabelText('Email');
    const phoneInput = screen.getByLabelText('Teléfono');
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.change(phoneInput, { target: { value: '+1234567890' } });
    
    const form = nameInput.closest('form')!;
    fireEvent.submit(form);
    
    await waitFor(() => {
      expect(screen.getByText('El email debe ser válido')).toBeDefined();
    }, { timeout: 3000 });
  });

  it('should show validation error for empty phone', async () => {
    render(<ReferralForm />);
    
    const nameInput = screen.getByLabelText('Nombre');
    const emailInput = screen.getByLabelText('Email');
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    
    const submitButton = screen.getByRole('button', { name: 'Invitar' });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('El teléfono es requerido')).toBeDefined();
    });
  });

  it('should submit form with valid data', async () => {
    render(<ReferralForm />);
    
    const nameInput = screen.getByLabelText('Nombre');
    const emailInput = screen.getByLabelText('Email');
    const phoneInput = screen.getByLabelText('Teléfono');
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(phoneInput, { target: { value: '+1234567890' } });
    
    const form = nameInput.closest('form')!;
    fireEvent.submit(form);
    
    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(
        {
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+1234567890',
        },
        expect.any(Object)
      );
    });
  });

  it('should navigate to home on successful submission', async () => {
    render(<ReferralForm />);
    
    const nameInput = screen.getByLabelText('Nombre');
    const emailInput = screen.getByLabelText('Email');
    const phoneInput = screen.getByLabelText('Teléfono');
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(phoneInput, { target: { value: '+1234567890' } });
    
    const form = nameInput.closest('form')!;
    fireEvent.submit(form);
    
    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalled();
    });
    
    const onSuccessCallback = mockMutate.mock.calls[0][1]?.onSuccess;
    if (onSuccessCallback) {
      onSuccessCallback();
      expect(mockPush).toHaveBeenCalledWith('/');
    }
  });

  it('should display NetworkError when mutation fails with NetworkError', async () => {
    const networkError = new NetworkError('Network error');
    
    render(<ReferralForm />);
    
    const nameInput = screen.getByLabelText('Nombre');
    const emailInput = screen.getByLabelText('Email');
    const phoneInput = screen.getByLabelText('Teléfono');
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(phoneInput, { target: { value: '+1234567890' } });
    
    const form = nameInput.closest('form')!;
    fireEvent.submit(form);
    
    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalled();
    });
    
    const onErrorCallback = mockMutate.mock.calls[0][1]?.onError;
    if (onErrorCallback) {
      act(() => {
        onErrorCallback(networkError);
      });
      
      await waitFor(() => {
        expect(screen.getByText('NetworkError: Network error')).toBeDefined();
      });
    }
  });

  it('should display ApiError when mutation fails with ApiError', async () => {
    const apiError = new ApiError('API error', 500);
    
    render(<ReferralForm />);
    
    const nameInput = screen.getByLabelText('Nombre');
    const emailInput = screen.getByLabelText('Email');
    const phoneInput = screen.getByLabelText('Teléfono');
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(phoneInput, { target: { value: '+1234567890' } });
    
    const form = nameInput.closest('form')!;
    fireEvent.submit(form);
    
    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalled();
    });
    
    const onErrorCallback = mockMutate.mock.calls[0][1]?.onError;
    if (onErrorCallback) {
      act(() => {
        onErrorCallback(apiError);
      });
      
      await waitFor(() => {
        expect(screen.getByText('ApiError: API error')).toBeDefined();
      });
    }
  });

  it('should clear submit error when form is submitted again', async () => {
    const apiError = new ApiError('API error', 500);
    
    render(<ReferralForm />);
    
    const nameInput = screen.getByLabelText('Nombre');
    const emailInput = screen.getByLabelText('Email');
    const phoneInput = screen.getByLabelText('Teléfono');
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(phoneInput, { target: { value: '+1234567890' } });
    
    const form = nameInput.closest('form')!;
    fireEvent.submit(form);
    
    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalled();
    });
    
    const onErrorCallback = mockMutate.mock.calls[0][1]?.onError;
    if (onErrorCallback) {
      act(() => {
        onErrorCallback(apiError);
      });
      
      await waitFor(() => {
        expect(screen.getByText('ApiError: API error')).toBeDefined();
      });
      
      fireEvent.submit(form);
      
      await waitFor(() => {
        expect(screen.queryByText('ApiError: API error')).toBeNull();
      });
    }
  });

  it('should disable submit button when isPending is true', () => {
    mockUseCreateReferral.mockReturnValue({
      mutate: mockMutate,
      isPending: true,
      isError: false,
      isSuccess: false,
      error: null,
      data: undefined,
      reset: jest.fn(),
      mutateAsync: jest.fn(),
    } as any);

    render(<ReferralForm />);
    
    const submitButton = screen.getByRole('button', { name: 'Invitando...' });
    expect(submitButton).toBeDefined();
    expect(submitButton.hasAttribute('disabled')).toBe(true);
  });

  it('should show "Invitando..." text when isPending is true', () => {
    mockUseCreateReferral.mockReturnValue({
      mutate: mockMutate,
      isPending: true,
      isError: false,
      isSuccess: false,
      error: null,
      data: undefined,
      reset: jest.fn(),
      mutateAsync: jest.fn(),
    } as any);

    render(<ReferralForm />);
    
    expect(screen.getByText('Invitando...')).toBeDefined();
    expect(screen.queryByText('Invitar')).toBeNull();
  });

  it('should not show error message initially', () => {
    render(<ReferralForm />);
    
    expect(screen.queryByText(/Error/)).toBeNull();
  });
});

