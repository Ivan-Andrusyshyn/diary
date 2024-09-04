export interface DiaryContentArray {
  imgAlt: string;
  imgUrl: string;
  imgTitle: string;
}
export interface DiaryPost {
  userDescribe: string;
  imgUrl: string;
  imgTitle: string;
  imgAlt: string;
}
export interface DiaryDatePost {
  _id: string;
  createdAt: Date;
}
export interface ResponseDiaryPost extends DiaryPost {
  _id: string;
  createdAt: string;
}
export interface PaginatedDiaryResponse {
  diaryList: ResponseDiaryPost[];
  status: number;
  totalItems: number;
  message: string;
  totalPages: number;
  page: number;
  limit: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}
