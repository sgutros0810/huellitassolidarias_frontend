import {City} from './enums/city.enum';

export interface ShelterDetailModel {
  id: number;
  identification: string;
  username: string;
  nameShelter: string;
  phoneNumber: string;
  address: string;
  city: City;
  country: string;
  websiteUrl: string;
  email: string;
  profileImageUrl: string;

  bankAccount: string;
  bizum: string;
  paypal: string;
  donationMessage: string;
  verified: boolean;
}
