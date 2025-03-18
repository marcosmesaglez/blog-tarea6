export interface IUserRes {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    results: IUser[];
  }
  
  export interface IUser {
    _id: string;
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    password: string;
    image: string;
  }
  
  export interface IError {
    error: string;
  }
  
  export class User {
    constructor(
      public _id: string,
      public id: number,
      public first_name: string,
      public last_name: string,
      public username: string,
      public email: string,
      public image: string
    ){};
  }