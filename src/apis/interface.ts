import { Manga, Chapter, Paper, Genre } from '@/models/manga'

export interface IMangaAPI {
  getMangaList(): Promise<Manga[]>
  getMangaByID(id: string): Promise<Manga>
  getChapterList(mangaID?: string): Promise<Chapter[]>
  getChapterByID(id: string): Promise<Chapter>
  getPaperList(chapterID?: string): Promise<Paper[]>
  getGenreList(mangaID?: string): Promise<Genre[]>
}
