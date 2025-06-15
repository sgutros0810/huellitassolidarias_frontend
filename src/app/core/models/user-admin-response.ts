import { City } from './enums/city.enum';

export interface UserAdminResponse {
  id: number;
  username: string;
  email: string;
  role: 'ADMIN' | 'USUARIO' | 'REFUGIO';
  active: boolean;
  creationDate: string;

  name?: string;
  lastname?: string;
  phoneNumber?: string;
  address?: string;
  city?: City;
  country?: string;
  identification?: string;
  nameShelter?: string;
  verified?: boolean;
  verificationRequested?: boolean;
  websiteUrl?: string;
  bankAccount?: string;
  bizum?: string;
  paypal?: string;
  donationMessage?: string;
}
