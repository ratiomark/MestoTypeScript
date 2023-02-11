interface IConstructorApi {
  baseUrl: string;
  headers: HeadersInit;
}

interface StudentResponse {
  _id: string;
  name: string;
  about: string;
  avatar: string;
  cohort: string;
}

type CardDeletedResponse = { message: string }

export interface CardResponse {
  _id: string;
  name: string;
  link: string;
  likes: StudentResponse[];
  owner: StudentResponse;
  createdAt: Date;
}

interface IBaseRequest {
  name: string;
  [propName: string]: string
}

interface IApi extends IConstructorApi {
  handleFirstResponse<T>(res: Response): PromiseConstructor | Promise<T>;
  handleError(error: Error): void;
  getUserData(): Promise<StudentResponse>;
  getInitialCard(): Promise<CardResponse>;
  editProfile({ name, about }: IBaseRequest): Promise<StudentResponse>;
  deleteCard(id: number): Promise<CardDeletedResponse>;
  addCardRequest({ name, link }: IBaseRequest): Promise<CardResponse>;
  updateAvatar(avatar: string): Promise<StudentResponse>;
  setLike(id: number): Promise<CardResponse>;
  unsetLike(id: number): Promise<CardResponse>;
}

export class Api implements IApi {
  baseUrl: string;
  headers: HeadersInit;

  constructor({ baseUrl, headers }: IConstructorApi) {
    this.baseUrl = baseUrl
    this.headers = headers
  }

  handleFirstResponse(res: Response) {
    if (res.ok) {
      return res.json()
    }
    console.error("Похоже возникла проблемка")
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  handleError(error: Error): void {
    console.log(`Произошла ошибка: ${error.name}`)
    console.log(`Сообщение ошибки: ${error.message}`)
  }

  getUserData(): Promise<StudentResponse> {
    return fetch(`${this.baseUrl}/users/me`, { headers: this.headers })
      .then(this.handleFirstResponse)

  }

  getInitialCard(): Promise<CardResponse> {
    return fetch(`${this.baseUrl}/cards`, { headers: this.headers })
      .then(this.handleFirstResponse)
  }

  editProfile({ name, about }: IBaseRequest): Promise<StudentResponse> {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name,
        about
      })
    })
      .then(this.handleFirstResponse)
  }

  deleteCard(id: number): Promise<CardDeletedResponse> {
    return fetch(`${this.baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this.headers,
    })
      .then(this.handleFirstResponse)
  }

  addCardRequest({ name, link }: IBaseRequest): Promise<CardResponse> {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name,
        link
      })
    })
      .then(this.handleFirstResponse)
  }

  updateAvatar(avatar: string): Promise<StudentResponse> {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar
      })
    })
      .then(this.handleFirstResponse)
  }

  setLike(id: number): Promise<CardResponse> {
    return fetch(`${this.baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this.headers,
    })
      .then(this.handleFirstResponse)
  }

  unsetLike(id: number): Promise<CardResponse> {
    return fetch(`${this.baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this.headers,
    })
      .then(this.handleFirstResponse)
  }
}