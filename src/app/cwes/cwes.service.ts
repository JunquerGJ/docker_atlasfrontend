import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppConstants} from '../shared/constants/constants';
import { ElementService } from '../shared/interfaces/interfaces';
import CWE from '../shared/models/cwe';


@Injectable({
  providedIn: 'root'
})

export class CWEService implements ElementService<CWE>{
  
  private readonly _baseUrl: string;
  
  constructor(private http: HttpClient) {
    this._baseUrl = AppConstants.baseURL;
  }
  
  get(id: number): Observable<CWE> {
    return this.http.get<CWE>(`${this._baseUrl}/cwes/${id}`,
    {
      headers: {
        XToken: sessionStorage.getItem('token'),
      }
    })
  }


  
  delete(element: CWE): Observable<CWE> {
    return this.http.delete<CWE>(`${this._baseUrl}/cwes/${element.id}`,
      {
        headers: {
          XToken: sessionStorage.getItem('token'),
        }

        
      });
  }
  getSome(filters: Object[], include : Object): Observable<CWE[]> {
    return this.http.post<CWE[]>(`${this._baseUrl}/cwes/search`,{ filters,include},
      {
        headers: {
          XToken: sessionStorage.getItem('token')
        }});
  }
  add(newAudit : CWE): Observable<CWE> {
    return this.http.post<CWE>(`${this._baseUrl}/cwes`, newAudit,
      {
        headers: {
          XToken: sessionStorage.getItem('token'),
        }
      });
  }
  modify(modAudit : CWE): Observable<CWE> {
    var id = modAudit.id;
    var aux = JSON.parse(JSON.stringify(modAudit))
    delete aux.id;
    return this.http.patch<CWE>(`${this._baseUrl}/cwes/${id}`, aux,
      {
        headers: {
          XToken: sessionStorage.getItem('token'),
        }
      });
  }
}
