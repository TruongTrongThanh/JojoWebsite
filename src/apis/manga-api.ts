import { IMangaAPI } from './interface'
import { MangaOptions, ChapterOptions, PaperOptions, Options } from '@/models/options'
import { Manga, Chapter, Paper, Genre } from '@/models/manga'
import firebase from 'firebase'
import { NotFoundError } from '@/models/error'
import 'firebase/firestore'
import FirebaseAPI from './firebase'

type DocumentSnapshot = firebase.firestore.DocumentSnapshot
type Query = firebase.firestore.Query
type CollectionReference = firebase.firestore.CollectionReference
type Firestore = firebase.firestore.Firestore

export class MangaAPI implements IMangaAPI {
  DB: Firestore = FirebaseAPI.getDBInstance()

  async getMangaList(options?: MangaOptions): Promise<Manga[]> {
    const list: Manga[] = []
    let query: Query | CollectionReference = this.DB!.collection('mangas')
    query = this.applyOptions(query, options || MangaOptions.NEWEST)
    const res = await query.get()
    if (res.size === 0) throw new NotFoundError('No manga(s) is available')
    res.forEach(snapshot => {
      list.push(this.convertToManga(snapshot))
    })
    return list
  }
  async getMangaByID(id: string): Promise<Manga> {
    const ref = this.DB!.collection('mangas').doc(id)
    const res = await ref.get()
    return this.convertToManga(res)
  }
  async getChapterList(mangaID?: string, options?: ChapterOptions): Promise<Chapter[]> {
    const list: Chapter[] = []
    let query: Query | CollectionReference = this.DB!.collection('chapters')
    const mangaRef = this.DB!.collection('mangas').doc(mangaID)
    query = query.where('mangaRef', '==', mangaRef)
    query = this.applyOptions(query, options || ChapterOptions.ALPHABET_ASC)
    const res = await query.get()
    res.forEach(snapshot => {
      list.push(this.convertToChapter(snapshot))
    })
    return list
  }
  async getChapterByID(id: string): Promise<Chapter> {
    const ref = this.DB!.collection('chapters').doc(id)
    const res = await ref.get()
    return this.convertToChapter(res)
  }
  async getPaperList(chapterID?: string, options?: PaperOptions): Promise<Paper[]> {
    const list: Paper[] = []
    let query: Query | CollectionReference = this.DB!.collection('papers')
    const chapterRef = this.DB!.collection('chapters').doc(chapterID)
    query = query.where('chapterRef', '==', chapterRef)
    query = this.applyOptions(query, options || PaperOptions.INDEX_ASC)
    const res = await query.get()
    if (res.size === 0) throw new NotFoundError('No page(s) is available')
    res.forEach(snapshot => {
      list.push(this.convertToPaper(snapshot))
    })
    return list
  }
  async getGenreList(mangaID?: string): Promise<Genre[]> {
    const list: Genre[] = []
    let query: Query | CollectionReference = this.DB!.collection('genres')
    const mangaRef = this.DB!.collection('mangas').doc(mangaID)
    query = query.where('mangaList', 'array-contains', mangaRef)
    const res = await query.get()
    res.forEach(snapshot => {
      list.push(this.convertToGenre(snapshot))
    })
    return list
  }

  /***/
  /* Internal functions */
  /***/
  private convertToManga(doc: DocumentSnapshot): Manga {
    const data = doc.data()
    if (!data) throw new NotFoundError('Manga not found')
    return {
      id: doc.id,
      name: data.name,
      subName: data.subName,
      author: data.author,
      banner: data.banner,
      themeColor: {r: 0, g: 0, b: 0, a: 0},
      backBarImgSrc: data.backBarImgSrc,
      chapterNumber: data.chapterNumber,
      transChapterNumber: data.transChapterNumber,
      chapterList: [],
      desc: data.desc,
      genres: data.genres || [],
      yearStart: data.yearStart,
      yearEnd: data.yearEnd || -1,
      createdAt: data.createdAt.toDate(),
      modifiedAt: data.modifiedAt.toDate()
    }
  }

  private convertToChapter(doc: DocumentSnapshot): Chapter {
    const data = doc.data()
    if (!data) throw new NotFoundError('Chapter not found')
    return {
      id: doc.id,
      index: data.index,
      name: data.name,
      cardImgSrc: data.cardImgSrc,
      mangaRef: data.mangaRef,
      paperListSize: data.paperListSize,
      paperList: [],
      createdAt: data.createdAt.toDate(),
      modifiedAt: data.modifiedAt.toDate()
    }
  }

  private convertToPaper(doc: DocumentSnapshot): Paper {
    const data = doc.data()
    if (!data) throw new NotFoundError('Paper not found')
    return {
      id: doc.id,
      index: data.index,
      url: data.url,
      chapterRef: data.chapterRef,
      createdAt: data.createdAt.toDate(),
      modifiedAt: data.modifiedAt.toDate()
    }
  }

  private convertToGenre(doc: DocumentSnapshot): Genre {
    const data = doc.data()
    if (!data) throw new NotFoundError('Genre not found')
    return {
      name: doc.id,
      color: data.color
    }
  }

  private applyOptions(query: Query | CollectionReference, options: Options): Query {
    let resQy = query
    resQy = resQy.orderBy(options.orderBy.field, options.orderBy.direction)
    if (options.startAtValue) resQy = resQy.startAt(options.startAtValue)
    if (options.limit) resQy = resQy.limit(options.limit)
    return resQy
  }
}
