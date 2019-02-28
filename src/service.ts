export interface IOrigin {
  name: string;
  url: string;
}

export interface ICharacters {
  id : number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: IOrigin;
  location: IOrigin;
  episode: string[];
  url: string;
  image: string;
  created: string | Date;
}

export interface IMetaPage {
  count: number;
  page: number;
  next: string;
  prev: string;
}

export interface IPage {
  info: IMetaPage;
  results: ICharacters[];
}

export interface IError {
  message: string;
  code: number;
}

export class Service {

  private processJson(promise: Promise<Response>): any {
    return promise
    .then(res => {
      if (res.ok) { 
        return res.json()
      } else {
        return { message: '', code: 500}
      }
      }
    )
    .catch(() => ({ message: '', code: 500}))
  }

  getCharacters(page: number = 1) {
    return this.processJson(
      fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
    )
  }

}