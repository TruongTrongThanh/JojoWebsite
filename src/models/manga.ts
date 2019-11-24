export interface Manga {
  id: string
  name: string
  subName: string
  author: string
  banner: string
  themeColor: ThemeColor
  backBarImgSrc: string
  chapterNumber: number
  transChapterNumber: number
  chapterList: Chapter[]
  desc: string
  genres: Genre[]
  yearStart: number
  yearEnd: number
  createdAt: Date
  modifiedAt: Date
}
export interface Chapter {
  id: string
  index: number
  name: string
  cardImgSrc: string
  mangaRef: any
  paperListSize: number
  paperList: Paper[]
  createdAt: Date
  modifiedAt: Date
  manga?: Manga
}
export interface Paper {
  id: string
  index: number
  url: ImageURL
  chapterRef: any
  createdAt: Date
  modifiedAt: Date
  isDoneLoading?: boolean
  chapter?: Chapter
}
export interface Genre {
  name: string
  color: string
}
export interface ImageURL {
  [field: string]: string
}
export interface ThemeColor {
  r: number
  g: number
  b: number
  a: number
}
