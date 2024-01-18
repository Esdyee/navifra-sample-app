import { api } from 'boot/axios';

// Category Data Model
export interface Category {
  categoryId: string;
  categoryName: string;
  label: string;
}

export class CategoryApi {
  public getCategories(): Category[] {
    return [
      { categoryId: '0000', categoryName: '검색', label: '검색' },
      { categoryId: '0001', categoryName: '음식점', label: '음식점' },
      { categoryId: '0002', categoryName: '병원', label: '병원' },
      { categoryId: '0003', categoryName: '옷가게', label: '옷가게' },
      { categoryId: '0004', categoryName: '은행', label: '은행' },
      { categoryId: '0005', categoryName: '음식점', label: '음식점(API)' },
      { categoryId: '0006', categoryName: '카페', label: '카페(API)' },
      { categoryId: '0007', categoryName: '술집', label: '술집(API)' },
      { categoryId: '0008', categoryName: '회사', label: '회사(API)' },
    ];
  }
}


