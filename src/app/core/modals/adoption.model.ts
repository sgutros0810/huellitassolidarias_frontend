export interface AdoptionModel {
  id: number;
  name: string;
  species: string;
  breed: string;
  age: number;
  size: string;
  vaccinated: boolean;
  sterilized: boolean;
  forAdoption: boolean;
  userId: number;
}
