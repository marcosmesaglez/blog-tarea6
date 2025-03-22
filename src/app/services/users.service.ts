import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IError, IUser, IUserRes } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl: string = "https://peticiones.online/api/users";

  constructor(private http: HttpClient) { }

  public getUsers(page: number): Observable<IUserRes>{
    return this.http.get<IUserRes>(`${this.baseUrl}?page=${page}`);
  }

  public getUserById(user_id: string): Observable<IUser | IError>{
    return this.http.get<IUser | IError>(`${this.baseUrl}/${user_id}`);
  }

  public createUser(user: Omit<IUser, "_id" | "username" | "password">): Observable<Omit<IUser, "_id" | "username" | "password"> >{
    return this.http.post<Omit<IUser, "_id" | "username" | "password"> >(`${this.baseUrl}`, user);
  }
  public updateUser(user_id: string, user_updated: Omit<IUser, "_id" | "username" | "password">): Observable<IUser | IError>{
    return this.http.put<IUser | IError>(`${this.baseUrl}/${user_id}`, user_updated);
  }

  public deleteUser(user_id: string): Observable<IUser | IError>{
    return this.http.delete<IUser | IError>(`${this.baseUrl}/${user_id}`);
  }
}
