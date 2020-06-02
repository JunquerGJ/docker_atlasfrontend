import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppConstants} from '../shared/constants/constants';
import { ElementService } from '../shared/interfaces/interfaces';
import Certificate from '../shared/models/certificate';


@Injectable({
  providedIn: 'root'
})

export class CertificateService implements ElementService<Certificate>{
  
  private readonly _baseUrl: string;
  
  constructor(private http: HttpClient) {
    this._baseUrl = AppConstants.baseURL;
  }
  
  get(id: number): Observable<Certificate> {
    return this.http.get<Certificate>(`${this._baseUrl}/certificates/${id}`,
    {
      headers: {
        XToken: sessionStorage.getItem('token'),
      }
    })
  }

  delete(element: Certificate): Observable<Certificate> {
    return this.http.delete<Certificate>(`${this._baseUrl}/certificates/${element.id}`,
      {
        headers: {
          XToken: sessionStorage.getItem('token'),
        }
      });
  }
  getSome(filters: Object[], include : Object): Observable<Certificate[]> {
    return this.http.post<Certificate[]>(`${this._baseUrl}/certificates/search`, {filters,include},
      {
        headers: {
          XToken: sessionStorage.getItem('token')
        }});
  }
  add(newCertificate : Certificate): Observable<Certificate> {
    return this.http.post<Certificate>(`${this._baseUrl}/certificates`, newCertificate,
      {
        headers: {
          XToken: sessionStorage.getItem('token'),
        }
      });
  }
  modify(modCertificate : Certificate): Observable<Certificate> {
    var id = modCertificate.id;
    delete modCertificate.id;
    return this.http.patch<Certificate>(`${this._baseUrl}/certificates/${id}`, modCertificate,
      {
        headers: {
          XToken: sessionStorage.getItem('token'),
        }
      });
  }
}
