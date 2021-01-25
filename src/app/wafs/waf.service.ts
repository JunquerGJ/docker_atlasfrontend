import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppConstants} from '../shared/constants/constants';
import { ElementService } from '../shared/interfaces/interfaces';
import WAF from '../shared/models/waf';


@Injectable({
  providedIn: 'root'
})

export class WafService implements ElementService<WAF>{
  
  private readonly _baseUrl: string;
  
  constructor(private http: HttpClient) {
    this._baseUrl = AppConstants.baseURL;
  }
  
  get(id,params): Observable<WAF> {
    return this.http.get<WAF>(`${this._baseUrl}/wafs/${id}`,
    {
      params : params,
      headers: {
        XToken: sessionStorage.getItem('token'),
      }
    })
  }

  delete(element: WAF): Observable<WAF> {
    return this.http.delete<WAF>(`${this._baseUrl}/wafs/${element.id}`,
      {
        headers: {
          XToken: sessionStorage.getItem('token'),
        }
      });
  }
  getSome(filters: Object[],include: Object): Observable<WAF[]> {
    return this.http.post<WAF[]>(`${this._baseUrl}/wafs/search`, {filters,include}, 
      {
        headers: {
          XToken: sessionStorage.getItem('token')
        }});
  }
  add(newWaf : WAF): Observable<WAF> {
    return this.http.post<WAF>(`${this._baseUrl}/wafs`, newWaf,
      {
        headers: {
          XToken: sessionStorage.getItem('token'),
        }
      });
  }
  modify(modWaf : WAF): Observable<WAF> {
    var id = modWaf.id;
    var aux = JSON.parse(JSON.stringify(modWaf))
    delete aux.id
    return this.http.patch<WAF>(`${this._baseUrl}/wafs/${id}`, aux,
      {
        headers: {
          XToken: sessionStorage.getItem('token'),
        }
      });
  }
}
