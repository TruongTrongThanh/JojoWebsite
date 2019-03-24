import { Manga, Chapter, Paper } from '@/models/manga.ts';
import { Options, ChapterOptions, PaperOptions } from '@/models/options.ts';
import firebase from 'firebase';
import { NotFoundError } from '@/models/error.ts';
import 'firebase/firestore';

type QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot;
type DocumentSnapshot = firebase.firestore.DocumentSnapshot;
type DocumentReference = firebase.firestore.DocumentReference;
type Query = firebase.firestore.Query;
type CollectionReference = firebase.firestore.CollectionReference;

const db = firebase.firestore();

/**
 * Get manga list
 * @param lastVisible The last record of previous page (for pagination)
 * @param limit Number ranges for record
 * @param anchor Second output. Return the last record of result
 * @returns A promise of Manga List
 */
export function getMangaList(lastVisible?: QueryDocumentSnapshot, anchor?: QueryDocumentSnapshot, limit?: number): Promise<Manga[]> {
  return new Promise((resolve, reject) => {
    limit = limit || Number(process.env.VUE_APP_MANGA_LIMIT);

    const mangaRefs = db.collection('mangas');
    let query = mangaRefs.orderBy('createdAt', 'desc');
    if (lastVisible) query = query.startAfter(lastVisible);
    query = query.limit(limit);

    query.get()
      .then(snapshot => {
        const list: Manga[] = [];
        for (const doc of snapshot.docs) {
          const m = convertToManga(doc);
          if (m !== undefined) list.push(m);
        }
        anchor = snapshot.docs[snapshot.docs.length - 1];
        resolve(list);
      })
      .catch(err => reject(err));
  });
}

export async function getManga(id: string, chapterOptions?: ChapterOptions): Promise<Manga> {
  const mangaRefs = db.collection('mangas');
  const docRef = mangaRefs.doc(id);
  const manga = convertToManga(await docRef.get());
  if (chapterOptions) {
     manga.chapterList = await getChapterList(docRef, chapterOptions);
  }
  return manga;
}

export async function getChapterList(mangaRef?: DocumentReference, chapterOptions?: ChapterOptions): Promise<Chapter[]> {
  const chapterRefs = db.collection('chapters');
  let query: CollectionReference | Query = chapterRefs;
  if (mangaRef) query.where('manga', '==', mangaRef);
  if (chapterOptions) query = applyOptions(query, chapterOptions);
  const res = await query.get();
  const list: Chapter[] = [];
  res.docs.forEach(chap => {
    if (chap.exists) list.push(convertToChapter(chap));
  });
  return list;
}

export async function getChapter(id: string, paperOptions?: PaperOptions): Promise<Chapter> {
  const chapterRefs = db.collection('chapters');
  const docRef = chapterRefs.doc(id);
  let paperList: Promise<Paper[]>;
  const snapshotPromise = docRef.get();
  const chapterSnapshot = await snapshotPromise;
  const chapter = convertToChapter(chapterSnapshot);
  await addingManga(chapter, chapterSnapshot);
  if (paperOptions) {
    paperList = getPaperList(docRef, paperOptions);
    chapter.paperList = await paperList;
  }
  return chapter;
}

export async function getPaperList(chapterRef?: DocumentReference, paperOptions?: PaperOptions): Promise<Paper[]> {
  const paperRefs = db.collection('papers');
  let query: CollectionReference | Query = paperRefs;
  if (chapterRef) query = query.where('chapter', '==', chapterRef);
  if (paperOptions) query = applyOptions(query, paperOptions);
  const res = await query.get();
  const list: Paper[] = [];
  res.forEach(paper => {
    if (paper.exists) list.push(convertToPaper(paper));
  });
  return list;
}

/***/
/* Internal functions */
/***/
function convertToManga(doc: DocumentSnapshot): Manga {
  const data = doc.data();
  if (!data) throw new NotFoundError('Manga not found');
  return {
    id: doc.id,
    name: data.name,
    subName: data.subName,
    author: data.author,
    banner: data.banner,
    frontBarImgSrc: data.frontBarImgSrc,
    backBarImgSrc: data.backBarImgSrc,
    chapterNumber: data.chapterNumber,
    transChapterNumber: data.transChapterNumber,
    chapterList: [],
    desc: data.desc,
    genres: data.genres || [],
    yearStart: data.yearStart,
    yearEnd: data.yearEnd || -1,
    createdAt: data.createdAt.toDate(),
    modifiedAt: data.modifiedAt.toDate(),
  };
}

function convertToChapter(doc: DocumentSnapshot): Chapter {
  const data = doc.data();
  if (!data) throw new NotFoundError('Chapter not found');
  return {
    id: doc.id,
    index: data.index,
    name: data.name,
    cardImgSrc: data.cardImgSrc,
    manga: undefined,
    paperList: [],
    createdAt: data.createdAt.toDate(),
    modifiedAt: data.modifiedAt.toDate(),
  };
}

async function addingManga(chapter: Chapter, doc: DocumentSnapshot) {
  const data = doc.data();
  if (!data) throw new NotFoundError('Chapter not found');
  if (data.manga) {
    const mangaRef = data.manga as DocumentReference;
    chapter.manga = await getManga(mangaRef.id, ChapterOptions.ALPHABET_ASC);
  }
}

function convertToPaper(doc: DocumentSnapshot): Paper {
  const data = doc.data();
  if (!data) throw new NotFoundError('Paper not found');
  return {
    id: doc.id,
    index: data.index,
    url: data.url,
    chapter: undefined,
    createdAt: data.createdAt.toDate(),
    modifiedAt: data.modifiedAt.toDate(),
  };
}

function applyOptions(query: Query | CollectionReference, options: Options): Query {
  let resQy = query;
  resQy = resQy.orderBy(options.orderBy.field, options.orderBy.direction);
  if (options.startAtValue) resQy = resQy.startAt(options.startAtValue);
  if (options.limit) resQy = resQy.limit(options.limit);
  return resQy;
}
