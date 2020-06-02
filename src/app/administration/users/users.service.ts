import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppConstants} from '../../shared/constants/constants';
import { ElementService } from '../../shared/interfaces/interfaces';
import User from '../../shared/models/user';


@Injectable({
  providedIn: 'root'
})

export class UserService implements ElementService<User>{
  
  private readonly _baseUrl: string;
  
  constructor(private http: HttpClient) {
    this._baseUrl = AppConstants.baseURL;
  }
  
  get(id: number): Observable<User> {
    return this.http.get<User>(`${this._baseUrl}/users/${id}`,
    {
      headers: {
        XToken: sessionStorage.getItem('token'),
      }
    })
  }

  delete(element: User): Observable<User> {
    return this.http.delete<User>(`${this._baseUrl}/users/${element.id}`,
      {
        headers: {
          XToken: sessionStorage.getItem('token'),
        }
      });
  }
  getSome(filters: Object[], include : Object): Observable<User[]> {
    return this.http.post<User[]>(`${this._baseUrl}/users/search`, {filters,include},
      {
        headers: {
          XToken: sessionStorage.getItem('token')
        }});
  }
  add(newUser : User): Observable<User> {
    return this.http.post<User>(`${this._baseUrl}/users`, newUser,
      {
        headers: {
          XToken: sessionStorage.getItem('token'),
        }
      });
  }
  modify(modUser : User): Observable<User> {
    var id = modUser.id;
    delete modUser.id;
    return this.http.patch<User>(`${this._baseUrl}/users/${id}`, modUser,
      {
        headers: {
          XToken: sessionStorage.getItem('token'),
        }
      });
  }
}
