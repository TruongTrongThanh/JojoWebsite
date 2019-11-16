import { MangaOptions, ChapterOptions, PaperOptions } from '@/models/options'
import { Manga, Chapter, Paper, Genre } from '@/models/manga'

export interface IMangaAPI {
  getMangaList(options?: MangaOptions): Promise<Manga[]>
  getMangaByID(id: string): Promise<Manga>
  getChapterList(mangaID?: string, options?: ChapterOptions): Promise<Chapter[]>
  getChapterByID(id: string): Promise<Chapter>
  getPaperList(chapterID?: string, options?: PaperOptions): Promise<Paper[]>
  getGenreList(mangaID?: string): Promise<Genre[]>
}
