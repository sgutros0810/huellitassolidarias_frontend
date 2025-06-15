import {City} from './enums/city.enum';

export interface ShelterModel {
  id: number;
  username: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: City;
  country: string;
  role: 'ADMIN' | 'USUARIO' | 'REFUGIO';
  nameShelter: string;
  identification: string;
  websiteUrl: string;
  creationDate: string;
  profileImageUrl: string;

  bankAccount: string;
  bizum: string;
  paypal: string;
  donationMessage: string;
  verified: boolean;
}
