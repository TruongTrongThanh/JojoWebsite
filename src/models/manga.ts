export interface Manga {
  id: string;
  name: string;
  subName: string;
  author: string;
  banner: string;
  frontBarImgSrc: string;
  backBarImgSrc: string;
  chapterNumber: number;
  transChapterNumber: number;
  chapterList: Chapter[];
  desc: string;
  genres: Genre[];
  yearStart: number;
  yearEnd: number;
  createdAt: Date;
  modifiedAt: Date;
}
export interface Chapter {
  id: string;
  index: number;
  name: string;
  cardImgSrc: string;
  manga?: Manga;
  paperList: Paper[];
  createdAt: Date;
  modifiedAt: Date;
}

export interface Paper {
  id: string;
  index: number;
  url: ImageURL;
  chapter?: Chapter;
  createdAt: Date;
  modifiedAt: Date;
}

export interface Genre {
  name: string;
  color: string;
}

export interface ImageURL {
  [field: string]: string;
}

