import {City} from './enums/city.enum';

export interface UserProfileModel {
  id: number;
  username: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: City;
  country: string;
  role: 'ADMIN' | 'USUARIO' | 'REFUGIO';
  name: string;
  lastname: string;
  nameShelter: string;
  identification: string;
  websiteUrl: string;
  creationDate: string;
  profileImageUrl: string;
  verificationRequested: boolean;
  verified?: boolean;
  bankAccount?: string;
  bizum?: string;
  paypal?: string;
  donationMessage?: string;
}
