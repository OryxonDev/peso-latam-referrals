import { render, screen } from '@testing-library/react';
import { ReferralCard } from '../ReferralCard';
import type { Referral } from '@/features/referrals/types/referral.types';

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

const mockReferral: Referral = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1234567890',
  avatar: 'https://example.com/avatar.jpg',
  user: 'johndoe',
  state: false,
  description: 'Test description',
  createdAt: '2024-01-01T00:00:00Z',
};

describe('ReferralCard', () => {
  it('should render referral information correctly', () => {
    render(<ReferralCard referral={mockReferral} />);

    expect(screen.getByText('John Doe')).toBeDefined();
    expect(screen.getByText('johndoe')).toBeDefined();
    expect(screen.getByText('john@example.com')).toBeDefined();
    expect(screen.getByText('+1234567890')).toBeDefined();
  });

  it('should render "Invitado" status when referral is not confirmed', () => {
    render(<ReferralCard referral={mockReferral} />);

    expect(screen.getByText('Invitado')).toBeDefined();
  });

  it('should render "Confirmado" status when referral is confirmed', () => {
    const confirmedReferral = { ...mockReferral, state: true };
    render(<ReferralCard referral={confirmedReferral} />);

    expect(screen.getByText(/Confirmado/)).toBeDefined();
  });

  it('should have correct link href', () => {
    render(<ReferralCard referral={mockReferral} />);

    const link = screen.getByRole('link');
    expect(link).toBeDefined();
    expect(link.getAttribute('href')).toBe('/referrals/1');
  });

  it('should render avatar image with correct src and alt', () => {
    render(<ReferralCard referral={mockReferral} />);

    const image = screen.getByAltText('John Doe');
    expect(image).toBeDefined();
    expect(image.getAttribute('src')).toBe('https://example.com/avatar.jpg');
  });
});

