import {  Genre } from '@/models/manga'
import firebase from 'firebase'
import { NotFoundError } from '@/models/error'
import 'firebase/firestore'

type DocumentSnapshot = firebase.firestore.DocumentSnapshot
type Query = firebase.firestore.Query
type CollectionReference = firebase.firestore.CollectionReference

const db = firebase.firestore()

export async function getGenreList(): Promise<Genre[]> {
  const list: Genre[] = []
  const query: Query | CollectionReference = db.collection('genres')
  const res = await query.get()
  res.forEach(snapshot => {
    list.push(convertToGenre(snapshot))
  })
  return list
}

export async function getGenreListFromManga(mangaID: string): Promise<Genre[]> {
  const list: Genre[] = []
  const mangaRef = db.collection('mangas').doc(mangaID)
  const query = db.collection('genres').where('mangaList', 'array-contains', mangaRef)
  const res = await query.get()
  res.forEach(snapshot => {
    list.push(convertToGenre(snapshot))
  })
  return list
}

export async function deleteGenre(genreName: string): Promise<void> {
  return db.collection('genres').doc(genreName).delete()
}

/***/
/* Internal functions */
/***/
function convertToGenre(doc: DocumentSnapshot): Genre {
  const data = doc.data()
  if (!data) throw new NotFoundError('Genre not found')
  return {
    name: doc.id,
    color: data.color
  }
}
