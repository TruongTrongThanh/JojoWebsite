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
  manga: Manga | null;
  paperList: Paper[];
  createdAt: Date;
  modifiedAt: Date;
}

export class ChapterOptions {
  lastVisible?: firebase.firestore.QueryDocumentSnapshot;
  limit?: number;
  orderBy?: Order[];

  constructor(lastVisible?: firebase.firestore.QueryDocumentSnapshot, limit?: number, orderBy?: Order[]) {
    this.lastVisible = lastVisible;
    this.limit = limit;
    this.orderBy = orderBy;
  }

  static get ALPHABET_ASC(): ChapterOptions {
    return new ChapterOptions(
      undefined,
      Number(process.env.VUE_APP_CHAPTER_LIMIT),
      [{ field: 'name', direction: 'asc' }]
    );
  }
}

export interface Order {
  field: string;
  direction: 'desc' | 'asc' | undefined;
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

