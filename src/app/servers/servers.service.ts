import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppConstants} from '../shared/constants/constants';
import { ElementService } from '../shared/interfaces/interfaces';
import Server from '../shared/models/server';
import { JsonPipe } from '@angular/common';


@Injectable({
  providedIn: 'root'
})

export class ServerService implements ElementService<Server>{
  
  private readonly _baseUrl: string;
  
  constructor(private http: HttpClient) {
    this._baseUrl = AppConstants.baseURL;
  }
  
  get(id,params): Observable<Server> {
    return this.http.get<Server>(`${this._baseUrl}/servers/${id}`,
    {
      params : params,
      headers: {
        XToken: sessionStorage.getItem('token'),
      }
    })
  }

  delete(element: Server): Observable<Server> {
    return this.http.delete<Server>(`${this._baseUrl}/servers/${element.id}`,
      {
        headers: {
          XToken: sessionStorage.getItem('token'),
        }
      });
  }
  getSome(filters: Object[],include: Object): Observable<Server[]> {
    return this.http.post<Server[]>(`${this._baseUrl}/servers/search`, {filters,include}, 
      {
        headers: {
          XToken: sessionStorage.getItem('token')
        }});
  }
  add(newServer : Server): Observable<Server> {
    return this.http.post<Server>(`${this._baseUrl}/servers`, newServer,
      {
        headers: {
          XToken: sessionStorage.getItem('token'),
        }
      });
  }
  modify(modServer : Server): Observable<Server> {
    var id = modServer.id;
    var aux = JSON.parse(JSON.stringify(modServer))
    delete aux.id
    return this.http.patch<Server>(`${this._baseUrl}/servers/${id}`, aux,
      {
        headers: {
          XToken: sessionStorage.getItem('token'),
        }
      });
  }
}
