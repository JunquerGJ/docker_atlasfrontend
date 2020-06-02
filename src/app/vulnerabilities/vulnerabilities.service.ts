import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError, delay, filter, map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/constants/constants';
import { ElementService } from '../shared/interfaces/interfaces';
import Vulnerability from '../shared/models/vulnerability';


@Injectable({
  providedIn: 'root'
})

export class VulnerabilityService implements ElementService<Vulnerability>{
  
  private readonly _baseUrl: string;
  
  constructor(private http: HttpClient) {
    this._baseUrl = AppConstants.baseURL;
  }
  
  get(id,params): Observable<Vulnerability> {
    return this.http.get<Vulnerability>(`${this._baseUrl}/vulnerabilities/${id}`,
    {
      params: params,
      headers: {
        XToken: sessionStorage.getItem('token'),
      }
    })
  }

  delete(element: Vulnerability): Observable<Vulnerability> {
    return this.http.delete<Vulnerability>(`${this._baseUrl}/vulnerabilities/${element.id}`,
      {
        headers: {
          XToken: sessionStorage.getItem('token'),
        }
      });
  }
  getSome(filters: Object[], include : Object): Observable<Vulnerability[]> {
    return this.http.post<Vulnerability[]>(`${this._baseUrl}/vulnerabilities/search`, {filters,include},
      {
        headers: {
          XToken: sessionStorage.getItem('token')
        }});
  }
  add(newVulnerability : Vulnerability): Observable<Vulnerability> {
    return this.http.post<Vulnerability>(`${this._baseUrl}/vulnerabilities`, newVulnerability,
      {
        headers: {
          XToken: sessionStorage.getItem('token'),
        }
      });
  }
  modify(modVulnerability : Vulnerability): Observable<Vulnerability> {
    var id = modVulnerability.id;
    let aux = JSON.parse(JSON.stringify(modVulnerability))
    delete aux.id;
    return this.http.patch<Vulnerability>(`${this._baseUrl}/vulnerabilities/${id}`, aux,
      {
        headers: {
          XToken: sessionStorage.getItem('token'),
        }
      });
  }
}
