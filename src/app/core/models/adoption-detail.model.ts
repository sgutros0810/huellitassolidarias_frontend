import {City} from './enums/city.enum';

export interface AdoptionDetailModel {
 id: number;
  name: string;
  species: string;
  breed: string;
  gender: string;
  birthDate: string;
  size: string;
  description: string;
  city: City;
  vaccinated: boolean;
  sterilized: boolean;
  status: string;
  contactPhone: string;
  contactEmail: string;
  imageUrl: string;
  // userId: number;
  user: {
    id: number;
    username: string;
    email: string;
    phoneNumber?: string;
    identification?: string;
    nameShelter?: string;
    address?: string;
    city?: City;
    country?: string;
    websiteUrl?: string;
    profileImageUrl?: string;
  };
}
