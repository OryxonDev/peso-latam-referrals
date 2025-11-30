import { render, screen, fireEvent } from '@testing-library/react';
import { ReferralListError } from '../ReferralListError';
import { ApiError } from '@/lib/api/client';
import { useErrorSimulationStore } from '@/lib/store/errorSimulationStore';

jest.mock('@/lib/store/errorSimulationStore');

const mockReset = jest.fn();
const mockRefetch = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  (useErrorSimulationStore as unknown as jest.Mock).mockReturnValue({
    reset: mockReset,
  });
});

describe('ReferralListError', () => {
  it('should render error title', () => {
    const error = new ApiError('Test error', 500);
    render(<ReferralListError error={error} />);

    expect(screen.getByText('Error al cargar los referidos')).toBeDefined();
  });

  it('should render error type', () => {
    const error = new ApiError('Test error', 403);
    render(<ReferralListError error={error} />);

    expect(screen.getByText('403 - Forbidden')).toBeDefined();
  });

  it('should render what failed message', () => {
    const error = new ApiError('Test error', 404);
    render(<ReferralListError error={error} />);

    expect(screen.getByText(/Qué falló:/)).toBeDefined();
    expect(screen.getByText(/recurso que buscas no existe/)).toBeDefined();
  });

  it('should render how to recover message', () => {
    const error = new ApiError('Test error', 500);
    render(<ReferralListError error={error} />);

    expect(screen.getByText(/Cómo recuperarse:/)).toBeDefined();
  });

  it('should render retry button when refetch is provided', () => {
    const error = new ApiError('Test error', 500);
    render(<ReferralListError error={error} refetch={mockRefetch} />);

    const retryButton = screen.getByText('Reintentar');
    expect(retryButton).toBeDefined();
  });

  it('should not render retry button when refetch is not provided', () => {
    const error = new ApiError('Test error', 500);
    render(<ReferralListError error={error} />);

    expect(screen.queryByText('Reintentar')).toBeNull();
  });

  it('should call reset and refetch when retry button is clicked', () => {
    const error = new ApiError('Test error', 500);
    render(<ReferralListError error={error} refetch={mockRefetch} />);

    const retryButton = screen.getByText('Reintentar');
    fireEvent.click(retryButton);

    expect(mockReset).toHaveBeenCalledTimes(1);
    expect(mockRefetch).toHaveBeenCalledTimes(1);
  });
});

