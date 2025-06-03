export interface UserProfileModel {
  id: number;
  username: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  country: string;
  role: 'ADMIN' | 'USUARIO' | 'REFUGIO';
  name: string;
  lastname: string;
  nameShelter: string;
  identification: string;
  websiteUrl: string;
  creationDate: string;
  profileImageUrl: string;
}
