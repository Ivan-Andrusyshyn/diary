export interface Product {
  _id?: string;
  name: string;
  content: string;
  image: File | string;
}

export interface ProductsResponse {
  message: string;
  products: Product[];
  totalDocs: 4;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number;
  nextPage: null | number;
}
