export interface Referral {
  id: string;
  createdAt: string;
  name: string;
  avatar: string;
  description: string;
  user: string;
  state: boolean;
  email: string;
  phone: string;
}

export interface CreateReferralInput {
  name: string;
  email: string;
  phone: string;
}

export interface ReferralsResponse {
  list: Referral[];
  total: number;
}