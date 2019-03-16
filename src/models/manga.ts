export interface Manga {
  id: string;
  name: string;
  cardImgSrc: string;
  backImgSrc: string;
  subName: string;
  desc: string;
}
export interface Chapter {
  id: string;
  index: number;
  name: string;
  createdAt: Date;
}
export interface Genre {
  name: string;
  color: string;
}

