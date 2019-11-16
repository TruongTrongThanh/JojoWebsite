import { injectable, inject } from 'tsyringe'
import { IMangaAPI } from './interface'

@injectable()
export default class Client {
  mangaAPI: IMangaAPI

  constructor(@inject('IMangaAPI') mangaAPI: IMangaAPI) {
    this.mangaAPI = mangaAPI
  }
}


