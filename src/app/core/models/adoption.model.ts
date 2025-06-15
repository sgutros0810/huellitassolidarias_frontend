import {City} from './enums/city.enum';

export interface AdoptionModel {
  id: number;
  name: string;
  species: string;
  gender: string;
  breed: string;
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
  userId: number;
}
