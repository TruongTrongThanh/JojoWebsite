import { Manga, Chapter, Paper } from '@/models/manga.ts';
import firebase from 'firebase';
import 'firebase/firestore';

export function getMangaList(lastVisible?: firebase.firestore.QueryDocumentSnapshot, limit?: number): Promise<Manga[]> {
  return new Promise((resolve, reject) => {
    limit = limit || 20;
    const db = firebase.firestore();
    const mangaRefs = db.collection('mangas');

    let query = mangaRefs.orderBy('createdAt', 'desc');
    if (lastVisible) query = query.startAfter(lastVisible);
    query = query.limit(limit);

    query.get()
      .then(snapshot => {
        const list: Manga[] = [];
        for (const doc of snapshot.docs) {
          const data = doc.data();
          list.push({
            id: doc.id,
            name: data.name,
            frontBarImgSrc: data.frontBarImgSrc,
            backBarImgSrc: data.backBarImgSrc,
            subName: data.subName,
            desc: data.desc,
            chapterList: data.chapterList || [],
            createdAt: new Date(data.createdAt),
            modifiedAt: new Date(data.modifiedAt),
          });
        }
        resolve(list);
      })
      .catch(err => reject(err));
  });
}
