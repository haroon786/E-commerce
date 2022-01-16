import { Category } from 'src/category/entities/category.entity';

export class CreateProductDto {
  name: string;

  description: string;

  richDescription: string;

  image: string;

  images: string[];

  brand: string;

  price: string;

  countInStock: number;

  category: Category;

  rating: number;

  numReviews: number;

  isFeatured: boolean;

  dateCreated: string;
}
