export interface PostModel {
  id: number;
  title: string;
  content: string;
  category: 'ADOPTION' | 'ADVICE' | 'RESCUE';
  imageUrl:string;
  username: string;
  createdAt: Date;

}
