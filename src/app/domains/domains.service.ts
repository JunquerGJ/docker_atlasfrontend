import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppConstants} from '../shared/constants/constants';
import { ElementService } from '../shared/interfaces/interfaces';
import Domain from '../shared/models/domain';


@Injectable({
  providedIn: 'root'
})

export class DomainService implements ElementService<Domain>{
  
  private readonly _baseUrl: string;
  
  constructor(private http: HttpClient) {
    this._baseUrl = AppConstants.baseURL;
  }
  
  get(id: number): Observable<Domain> {
    return this.http.get<Domain>(`${this._baseUrl}/domains/${id}`,
    {
      headers: {
        XToken: sessionStorage.getItem('token'),
      }
    })
  }

  delete(element: Domain): Observable<Domain> {
    return this.http.delete<Domain>(`${this._baseUrl}/domains/${element.id}`,
      {
        headers: {
          XToken: sessionStorage.getItem('token'),
        }
      });
  }
  getSome(filters: Object[],include : Object): Observable<Domain[]> {
    return this.http.post<Domain[]>(`${this._baseUrl}/domains/search`, {filters, include},
      {
        headers: {
          XToken: sessionStorage.getItem('token')
        }});
  }
  add(newDomain : Domain): Observable<Domain> {
    return this.http.post<Domain>(`${this._baseUrl}/domains`, newDomain,
      {
        headers: {
          XToken: sessionStorage.getItem('token'),
        }
      });
  }
  modify(modDomain : Domain): Observable<Domain> {
    var id = modDomain.id;
    return this.http.patch<Domain>(`${this._baseUrl}/domains/${id}`, modDomain,
      {
        headers: {
          XToken: sessionStorage.getItem('token'),
        }
      });
  }
}
