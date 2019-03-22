import { Manga, Chapter, Paper } from '@/models/manga.ts';
import firebase from 'firebase';
import 'firebase/firestore';

const db = firebase.firestore();

/**
 * Get manga list
 * @param lastVisible The last record of previous page (for pagination)
 * @param limit Number ranges for record
 * @param anchor Second output. Return the last record of result
 * @returns A promise of Manga List
 */
export function getMangaList(lastVisible?: firebase.firestore.QueryDocumentSnapshot, limit?: number, anchor?: firebase.firestore.QueryDocumentSnapshot): Promise<Manga[]> {
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
          const data = doc.data();
          data.id = doc.id;
          list.push(ConvertToManga(data));
        }
        anchor = snapshot.docs[snapshot.docs.length - 1];
        resolve(list);
      })
      .catch(err => reject(err));
  });
}

export function getManga(id: string, withChapters?: boolean): Promise<Manga> {
  return new Promise((resolve, reject) => {
    const mangaRefs = db.collection('mangas');
    mangaRefs.where('id', '==', id).get()
    .then(res => {
      const data = res.docs[0].data();
      data.id = res.docs[0].id;
      resolve(ConvertToManga(data));
    })
    .catch(err => reject(err));
  });
}

/***/
/* Internal functions */
/***/
function ConvertToManga(data: any): Manga {
  return {
    id: data.id,
    name: data.name,
    frontBarImgSrc: data.frontBarImgSrc,
    backBarImgSrc: data.backBarImgSrc,
    subName: data.subName,
    desc: data.desc,
    chapterList: data.chapterList || [],
    createdAt: new Date(data.createdAt),
    modifiedAt: new Date(data.modifiedAt),
  };
}
