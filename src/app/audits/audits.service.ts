import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppConstants} from '../shared/constants/constants';
import { ElementService } from '../shared/interfaces/interfaces';
import Audit from '../shared/models/audit';


@Injectable({
  providedIn: 'root'
})

export class AuditService implements ElementService<Audit>{
  
  private readonly _baseUrl: string;
  
  constructor(private http: HttpClient) {
    this._baseUrl = AppConstants.baseURL;
  }
  
  get(id,params): Observable<Audit> {
    return this.http.get<Audit>(`${this._baseUrl}/audits/${id}`,
    {
      params : params,
      headers: {
        XToken: sessionStorage.getItem('token'),
      }
    })
  }

  delete(element: Audit): Observable<Audit> {
    return this.http.delete<Audit>(`${this._baseUrl}/audits/${element.id}`,
      {
        headers: {
          XToken: sessionStorage.getItem('token'),
        }
      });
  }
  getSome(filters: Object[], include : Object): Observable<Audit[]> {
    return this.http.post<Audit[]>(`${this._baseUrl}/audits/search`, {filters,include},
      {
        headers: {
          XToken: sessionStorage.getItem('token')
        }});
  }
  add(newAudit : Audit): Observable<Audit> {
    if(newAudit.domain){
      delete newAudit.domain.asset
      delete newAudit.domain.certificate
      delete newAudit.domain.client
      delete newAudit.domain.enviroment
      delete newAudit.domain.errorCode
      delete newAudit.domain.id
      delete newAudit.domain.wafs
      delete newAudit.domain.privateDomain
    }
    delete newAudit.asset.Domain
    return this.http.post<Audit>(`${this._baseUrl}/audits`, newAudit,
      {
        headers: {
          XToken: sessionStorage.getItem('token'),
        }
      });
  }
  modify(modAudit : Audit): Observable<Audit> {
    var id = modAudit.id;
    var aux = JSON.parse(JSON.stringify(modAudit))
    delete aux.id;
    return this.http.patch<Audit>(`${this._baseUrl}/audits/${id}`, aux,
      {
        headers: {
          XToken: sessionStorage.getItem('token'),
        }
      });
  }
}
