import { api } from 'boot/axios';

// Category Data Model
export interface Category {
  categoryId: string;
  categoryName: string;
}

export class CategoryApi {
  public getCategories(): Category[] {
    return [
      { categoryId: '0001', categoryName: '음식점' },
      { categoryId: '0002', categoryName: '병원' },
      { categoryId: '0003', categoryName: '옷가게' },
      { categoryId: '0004', categoryName: '은행' }
    ];
  }
}


