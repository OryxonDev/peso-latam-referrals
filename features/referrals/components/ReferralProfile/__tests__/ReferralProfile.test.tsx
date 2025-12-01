import { render, screen } from '@testing-library/react';
import { ReferralProfile } from '../ReferralProfile';
import { useReferrals } from '@/features/referrals/hooks/useReferrals';
import type { Referral } from '@/features/referrals/types/referral.types';

jest.mock('@/features/referrals/hooks/useReferrals');
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    const { fill, ...restProps } = props;
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...restProps} />;
  },
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  },
}));

const mockUseReferrals = useReferrals as jest.MockedFunction<typeof useReferrals>;

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

const mockReferral: Referral = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1234567890',
  avatar: 'https://example.com/avatar.jpg',
  user: 'johndoe',
  state: true,
  description: 'Test description',
  createdAt: '2024-01-15T10:30:00Z',
};

const mockReferralById = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  mockUseReferrals.mockReturnValue({
    referrals: createMockQueryResult({}),
    allReferrals: createMockQueryResult({}),
    referralById: mockReferralById,
  } as any);
});

describe('ReferralProfile', () => {
  it('should render loading state', () => {
    mockReferralById.mockReturnValue(createMockQueryResult({ isLoading: true }));

    const { container } = render(<ReferralProfile id="1" />);
    
    const loadingElements = container.querySelectorAll('.animate-pulse');
    expect(loadingElements.length).toBeGreaterThan(0);
  });

  it('should render error state', () => {
    const mockError = new Error('Test error');
    const mockRefetch = jest.fn();

    mockReferralById.mockReturnValue(createMockQueryResult({ isError: true, error: mockError, refetch: mockRefetch }));

    render(<ReferralProfile id="1" />);
    
    expect(screen.getByText('Error al cargar el referido')).toBeDefined();
  });

  it('should render not found state when referral is null', () => {
    mockReferralById.mockReturnValue(createMockQueryResult({ data: null }));

    render(<ReferralProfile id="1" />);
    
    expect(screen.getByText('Referido no encontrado')).toBeDefined();
    expect(screen.getByText('Volver')).toBeDefined();
  });

  it('should render referral information correctly', () => {
    mockReferralById.mockReturnValue(createMockQueryResult({ data: mockReferral }));

    render(<ReferralProfile id="1" />);
    
    expect(screen.getByText('John Doe')).toBeDefined();
    expect(screen.getByText('@johndoe')).toBeDefined();
    expect(screen.getByText('john@example.com')).toBeDefined();
    expect(screen.getByText('+1234567890')).toBeDefined();
  });

  it('should render confirmed status when referral is confirmed', () => {
    mockReferralById.mockReturnValue(createMockQueryResult({ data: mockReferral }));

    render(<ReferralProfile id="1" />);
    
    expect(screen.getByText(/Confirmado/)).toBeDefined();
  });

  it('should render invited status when referral is not confirmed', () => {
    const invitedReferral = { ...mockReferral, state: false };
    
    mockReferralById.mockReturnValue(createMockQueryResult({ data: invitedReferral }));

    render(<ReferralProfile id="1" />);
    
    expect(screen.getByText('Invitado')).toBeDefined();
    expect(screen.queryByText(/Confirmado/)).toBeNull();
  });

  it('should render description when it exists', () => {
    mockReferralById.mockReturnValue(createMockQueryResult({ data: mockReferral }));

    render(<ReferralProfile id="1" />);
    
    expect(screen.getByText('Descripción')).toBeDefined();
    expect(screen.getByText('Test description')).toBeDefined();
  });

  it('should not render description when it does not exist', () => {
    const referralWithoutDescription = { ...mockReferral, description: '' };
    
    mockReferralById.mockReturnValue(createMockQueryResult({ data: referralWithoutDescription }));

    render(<ReferralProfile id="1" />);
    
    expect(screen.queryByText('Descripción')).toBeNull();
  });

  it('should render formatted registration date', () => {
    mockReferralById.mockReturnValue(createMockQueryResult({ data: mockReferral }));

    render(<ReferralProfile id="1" />);
    
    expect(screen.getByText('Fecha de registro')).toBeDefined();
    const dateText = new Date(mockReferral.createdAt).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    expect(screen.getByText(dateText)).toBeDefined();
  });

  it('should render avatar image with correct src and alt', () => {
    mockReferralById.mockReturnValue(createMockQueryResult({ data: mockReferral }));

    render(<ReferralProfile id="1" />);
    
    const image = screen.getByAltText('John Doe');
    expect(image).toBeDefined();
    expect(image.getAttribute('src')).toBe('https://example.com/avatar.jpg');
  });

  it('should render all contact information sections', () => {
    mockReferralById.mockReturnValue(createMockQueryResult({ data: mockReferral }));

    render(<ReferralProfile id="1" />);
    
    expect(screen.getByText('Email')).toBeDefined();
    expect(screen.getByText('Teléfono')).toBeDefined();
    expect(screen.getByText('Fecha de registro')).toBeDefined();
  });

  it('should call referralById with correct id', () => {
    mockReferralById.mockReturnValue(createMockQueryResult({ data: mockReferral }));

    render(<ReferralProfile id="123" />);
    
    expect(mockReferralById).toHaveBeenCalledWith('123');
  });
});

