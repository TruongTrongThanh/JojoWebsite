import { Manga, Chapter, Paper, ChapterOptions } from '@/models/manga.ts';
import firebase from 'firebase';
import { NotFoundError } from '@/models/error.ts';
import 'firebase/firestore';

const db = firebase.firestore();

/**
 * Get manga list
 * @param lastVisible The last record of previous page (for pagination)
 * @param limit Number ranges for record
 * @param anchor Second output. Return the last record of result
 * @returns A promise of Manga List
 */
export function getMangaList(lastVisible?: firebase.firestore.QueryDocumentSnapshot, anchor?: firebase.firestore.QueryDocumentSnapshot, limit?: number): Promise<Manga[]> {
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
  const docRef = mangaRefs.doc(id)
  const res = convertToManga(await docRef.get());
  if (chapterOptions) {
    const chapterRefs = db.collection('chapters');
    let query = chapterRefs.where('manga', '==', docRef);
    query = applyChapterOptions(query, chapterOptions);
    const cRes = await query.get();
    cRes.docs.forEach(chap => {
      res.chapterList.push(convertToChapter(chap));
    });
  }
  return res;
}

/***/
/* Internal functions */
/***/
function convertToManga(doc: firebase.firestore.DocumentSnapshot): Manga {
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

function convertToChapter(doc: firebase.firestore.DocumentSnapshot): Chapter {
  const data = doc.data();
  if (!data) throw new NotFoundError('Chapter not found');
  console.log(data.createdAt.seconds);
  return {
    id: doc.id,
    index: data.index,
    name: data.name,
    cardImgSrc: data.cardImgSrc,
    manga: null,
    paperList: [],
    createdAt: data.createdAt.toDate(),
    modifiedAt: data.modifiedAt.toDate(),
  };
}

function applyChapterOptions(query: firebase.firestore.Query, options: ChapterOptions): firebase.firestore.Query {
  let resQy: firebase.firestore.Query = query;
  if (options.lastVisible) resQy = query.startAfter(options.lastVisible);
  if (options.limit) resQy = query.limit(options.limit);
  if (options.orderBy) {
    for (const order of options.orderBy) {
      resQy = query.orderBy(order.field, order.direction);
    }
  }
  return resQy;
}