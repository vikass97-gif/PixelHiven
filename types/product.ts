export interface Product {
  id: string | number;
  slug: string;
  title: string;
  category: string;
  description: string;
  price: string;
  image: string;
  filePath?: string;
  rating?: string;
  sales?: string;
  badge?: string;
}