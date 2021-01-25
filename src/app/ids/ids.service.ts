import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppConstants} from '../shared/constants/constants';
import { ElementService } from '../shared/interfaces/interfaces';
import IDS from '../shared/models/ids';


@Injectable({
  providedIn: 'root'
})

export class IDSService implements ElementService<IDS>{
  
  private readonly _baseUrl: string;
  
  constructor(private http: HttpClient) {
    this._baseUrl = AppConstants.baseURL;
  }
  
  get(id,params): Observable<IDS> {
    return this.http.get<IDS>(`${this._baseUrl}/idss/${id}`,
    {
      params : params,
      headers: {
        XToken: sessionStorage.getItem('token'),
      }
    })
  }

  delete(element: IDS): Observable<IDS> {
    return this.http.delete<IDS>(`${this._baseUrl}/idss/${element.id}`,
      {
        headers: {
          XToken: sessionStorage.getItem('token'),
        }
      });
  }
  getSome(filters: Object[],include: Object): Observable<IDS[]> {
    return this.http.post<IDS[]>(`${this._baseUrl}/idss/search`, {filters,include}, 
      {
        headers: {
          XToken: sessionStorage.getItem('token')
        }});
  }
  add(newIDS : IDS): Observable<IDS> {
    return this.http.post<IDS>(`${this._baseUrl}/idss`, newIDS,
      {
        headers: {
          XToken: sessionStorage.getItem('token'),
        }
      });
  }
  modify(modIDS : IDS): Observable<IDS> {
    var id = modIDS.id;
    var aux = JSON.parse(JSON.stringify(modIDS))
    delete aux.id
    return this.http.patch<IDS>(`${this._baseUrl}/idss/${id}`, aux,
      {
        headers: {
          XToken: sessionStorage.getItem('token'),
        }
      });
  }
}
