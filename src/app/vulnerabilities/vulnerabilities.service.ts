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
    if(newVulnerability.audit){
      delete newVulnerability.audit.asset
      delete newVulnerability.audit.auditor
      delete newVulnerability.audit.domain
    }
    if(newVulnerability.domain){
      delete newVulnerability.domain.asset
      delete newVulnerability.domain.certificate
      delete newVulnerability.domain.client
      delete newVulnerability.domain.enviroment
      delete newVulnerability.domain.errorCode
      delete newVulnerability.domain.id
      delete newVulnerability.domain.certificateId
      delete newVulnerability.domain.assetId
      delete newVulnerability.domain.wafs
      delete newVulnerability.domain.privateDomain
    }

    if(newVulnerability.asset){
      delete newVulnerability.asset.confidentiality
      delete newVulnerability.asset.availability
      delete newVulnerability.asset.integrity
      delete newVulnerability.asset.Domain
      delete newVulnerability.asset.characteristics
    }


    if(newVulnerability.server){
      delete newVulnerability.server.idss
      delete newVulnerability.server.assets
      delete newVulnerability.server.characteristics
    }
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
