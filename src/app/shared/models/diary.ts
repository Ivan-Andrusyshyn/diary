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
export interface ResponsedDiaryPost extends DiaryPost {
  _id: string;
  createdAt: string;
}
