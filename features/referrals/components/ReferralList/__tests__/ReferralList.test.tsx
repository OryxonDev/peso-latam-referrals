import { render, screen, fireEvent } from '@testing-library/react';
import { ReferralList } from '../ReferralList';
import { useGetReferrals } from '@/features/referrals/hooks/useGetReferrals';
import { useReferralStore } from '@/features/referrals/store/referralStore';
import type { Referral } from '@/features/referrals/types/referral.types';

jest.mock('@/features/referrals/hooks/useGetReferrals');
jest.mock('@/features/referrals/store/referralStore');

const mockUseGetReferrals = useGetReferrals as jest.MockedFunction<typeof useGetReferrals>;
const mockUseReferralStore = useReferralStore as jest.MockedFunction<typeof useReferralStore>;

const mockSetCurrentPage = jest.fn();

const createMockQueryResult = (overrides: any) => ({
  isLoading: false,
  isError: false,
  isPending: false,
  isSuccess: false,
  data: undefined,
  error: null,
  refetch: jest.fn(),
  ...overrides,
} as any);

const mockReferrals: Referral[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    avatar: 'https://example.com/avatar1.jpg',
    user: 'johndoe',
    state: true,
    description: 'Test description',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+0987654321',
    avatar: 'https://example.com/avatar2.jpg',
    user: 'janesmith',
    state: false,
    description: 'Test description',
    createdAt: '2024-01-02T00:00:00Z',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    phone: '+1122334455',
    avatar: 'https://example.com/avatar3.jpg',
    user: 'bobjohnson',
    state: true,
    description: 'Test description',
    createdAt: '2024-01-03T00:00:00Z',
  },
];

beforeEach(() => {
  jest.clearAllMocks();
  mockUseReferralStore.mockReturnValue({
    currentPage: 1,
    setCurrentPage: mockSetCurrentPage,
  });
});

describe('ReferralList', () => {
  it('should render loading state', () => {
    mockUseGetReferrals.mockReturnValue({
      referrals: createMockQueryResult({ isLoading: true }),
      allReferrals: createMockQueryResult({}),
      referralById: jest.fn(),
    } as any);

    const { container } = render(<ReferralList />);
    
    const loadingElements = container.querySelectorAll('.animate-pulse');
    expect(loadingElements.length).toBeGreaterThan(0);
  });

  it('should render error state', () => {
    const mockError = new Error('Test error');
    const mockRefetch = jest.fn();

    mockUseGetReferrals.mockReturnValue({
      referrals: createMockQueryResult({ isError: true, error: mockError, refetch: mockRefetch }),
      allReferrals: createMockQueryResult({}),
      referralById: jest.fn(),
    } as any);

    render(<ReferralList />);
    
    expect(screen.getByText('Error al cargar los referidos')).toBeDefined();
  });

  it('should render empty state when no referrals', () => {
    mockUseGetReferrals.mockReturnValue({
      referrals: createMockQueryResult({ data: { list: [], total: 0 } }),
      allReferrals: createMockQueryResult({}),
      referralById: jest.fn(),
    } as any);

    render(<ReferralList />);
    
    expect(screen.getByText('No hay referidos disponibles')).toBeDefined();
  });

  it('should render list of referrals', () => {
    mockUseGetReferrals.mockReturnValue({
      referrals: createMockQueryResult({ data: { list: mockReferrals, total: 3 } }),
      allReferrals: createMockQueryResult({}),
      referralById: jest.fn(),
    } as any);

    render(<ReferralList />);
    
    expect(screen.getByText('John Doe')).toBeDefined();
    expect(screen.getByText('Jane Smith')).toBeDefined();
    expect(screen.getByText('Bob Johnson')).toBeDefined();
  });

  it('should not show pagination when total pages is 1', () => {
    mockUseGetReferrals.mockReturnValue({
      referrals: createMockQueryResult({ data: { list: mockReferrals.slice(0, 2), total: 2 } }),
      allReferrals: createMockQueryResult({}),
      referralById: jest.fn(),
    } as any);

    render(<ReferralList />);
    
    expect(screen.queryByText('Anterior')).toBeNull();
    expect(screen.queryByText('Siguiente')).toBeNull();
  });

  it('should show pagination when total pages is greater than 1', () => {
    mockUseGetReferrals.mockReturnValue({
      referrals: createMockQueryResult({ data: { list: mockReferrals, total: 25 } }),
      allReferrals: createMockQueryResult({}),
      referralById: jest.fn(),
    } as any);

    render(<ReferralList />);
    
    expect(screen.getByText('Anterior')).toBeDefined();
    expect(screen.getByText('Siguiente')).toBeDefined();
    expect(screen.getByText(/Página 1 de/)).toBeDefined();
  });

  it('should disable previous button on first page', () => {
    mockUseReferralStore.mockReturnValue({
      currentPage: 1,
      setCurrentPage: mockSetCurrentPage,
    });

    mockUseGetReferrals.mockReturnValue({
      referrals: createMockQueryResult({ data: { list: mockReferrals, total: 25 } }),
      allReferrals: createMockQueryResult({}),
      referralById: jest.fn(),
    } as any);

    render(<ReferralList />);
    
    const prevButton = screen.getByText('Anterior');
    expect(prevButton).toBeDefined();
    expect(prevButton.hasAttribute('disabled')).toBe(true);
  });

  it('should enable previous button when not on first page', () => {
    mockUseReferralStore.mockReturnValue({
      currentPage: 2,
      setCurrentPage: mockSetCurrentPage,
    });

    mockUseGetReferrals.mockReturnValue({
      referrals: createMockQueryResult({ data: { list: mockReferrals, total: 25 } }),
      allReferrals: createMockQueryResult({}),
      referralById: jest.fn(),
    } as any);

    render(<ReferralList />);
    
    const prevButton = screen.getByText('Anterior');
    expect(prevButton).toBeDefined();
    expect(prevButton.hasAttribute('disabled')).toBe(false);
  });

  it('should call setCurrentPage when clicking previous button', () => {
    mockUseReferralStore.mockReturnValue({
      currentPage: 2,
      setCurrentPage: mockSetCurrentPage,
    });

    mockUseGetReferrals.mockReturnValue({
      referrals: createMockQueryResult({ data: { list: mockReferrals, total: 25 } }),
      allReferrals: createMockQueryResult({}),
      referralById: jest.fn(),
    } as any);

    render(<ReferralList />);
    
    const prevButton = screen.getByText('Anterior');
    fireEvent.click(prevButton);
    
    expect(mockSetCurrentPage).toHaveBeenCalledWith(1);
  });

  it('should call setCurrentPage when clicking next button', () => {
    mockUseReferralStore.mockReturnValue({
      currentPage: 1,
      setCurrentPage: mockSetCurrentPage,
    });

    mockUseGetReferrals.mockReturnValue({
      referrals: createMockQueryResult({ data: { list: mockReferrals, total: 25 } }),
      allReferrals: createMockQueryResult({}),
      referralById: jest.fn(),
    } as any);

    render(<ReferralList />);
    
    const nextButton = screen.getByText('Siguiente');
    fireEvent.click(nextButton);
    
    expect(mockSetCurrentPage).toHaveBeenCalledWith(2);
  });

  it('should disable next button on last page', () => {
    mockUseReferralStore.mockReturnValue({
      currentPage: 1,
      setCurrentPage: mockSetCurrentPage,
    });

    mockUseGetReferrals.mockReturnValue({
      referrals: createMockQueryResult({ data: { list: mockReferrals.slice(0, 2), total: 2 } }),
      allReferrals: createMockQueryResult({}),
      referralById: jest.fn(),
    } as any);

    render(<ReferralList />);
    
    const nextButton = screen.queryByText('Siguiente');
    expect(nextButton).toBeNull();
  });

  it('should display correct page number', () => {
    mockUseReferralStore.mockReturnValue({
      currentPage: 2,
      setCurrentPage: mockSetCurrentPage,
    });

    mockUseGetReferrals.mockReturnValue({
      referrals: createMockQueryResult({ data: { list: mockReferrals, total: 25 } }),
      allReferrals: createMockQueryResult({}),
      referralById: jest.fn(),
    } as any);

    render(<ReferralList />);
    
    expect(screen.getByText(/Página 2 de/)).toBeDefined();
  });
});

