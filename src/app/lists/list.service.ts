import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppConstants} from '../shared/constants/constants';
import { ElementService } from '../shared/interfaces/interfaces';
import List from '../shared/models/list';
import { JsonPipe } from '@angular/common';


@Injectable({
  providedIn: 'root'
})

export class ListService implements ElementService<List>{
  
  private readonly _baseUrl: string;
  
  constructor(private http: HttpClient) {
    this._baseUrl = AppConstants.baseURL;
  }
  
  get(id,params): Observable<List> {
    return this.http.get<List>(`${this._baseUrl}/lists/${id}`,
    {
      params : params,
      headers: {
        XToken: sessionStorage.getItem('token'),
      }
    })
  }

  delete(element: List): Observable<List> {
    return this.http.delete<List>(`${this._baseUrl}/lists/${element.id}`,
      {
        headers: {
          XToken: sessionStorage.getItem('token'),
        }
      });
  }
  getSome(filters: Object[],include: Object): Observable<List[]> {
    return this.http.post<List[]>(`${this._baseUrl}/lists/search`, {filters,include}, 
      {
        headers: {
          XToken: sessionStorage.getItem('token')
        }});
  }
  add(newList : List): Observable<List> {
    return this.http.post<List>(`${this._baseUrl}/lists`, newList,
      {
        headers: {
          XToken: sessionStorage.getItem('token'),
        }
      });
  }
  modify(modList : List): Observable<List> {
    var id = modList.id;
    var aux = JSON.parse(JSON.stringify(modList))
    delete aux.id
    return this.http.patch<List>(`${this._baseUrl}/lists/${id}`, aux,
      {
        headers: {
          XToken: sessionStorage.getItem('token'),
        }
      });
  }
}
