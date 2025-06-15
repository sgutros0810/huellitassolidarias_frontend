export interface PostDetailModel {
  id: number;
  category: 'ADOPTION' | 'ADVICE' | 'RESCUE';
  title: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
  authorId: number;
}
