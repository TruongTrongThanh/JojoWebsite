export interface Manga {
  id: string;
  name: string;
  frontBarImgSrc: string;
  backBarImgSrc: string;
  subName: string;
  desc: string;
  chapterList: Chapter[];
  createdAt: Date;
  modifiedAt: Date;
}
export interface Chapter {
  id: string;
  index: number;
  name: string;
  cardImgSrc: string;
  manga: Manga;
  paperList: Paper[];
  createdAt: Date;
  modifiedAt: Date;
}
export interface Paper {
  id: string;
  name: string;
  url: string;
  chapter: Chapter;
  createdAt: Date;
  modifiedAt: Date;
}
export interface Genre {
  name: string;
  color: string;
}

