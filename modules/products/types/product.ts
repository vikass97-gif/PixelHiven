export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  image: string;
  filePath: string;
  price: number;
  rating: number;
  sales: number;
  badge: string;
  createdAt: Date;
  updatedAt: Date;
}