import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppConstants} from '../shared/constants/constants';
import { ElementService } from '../shared/interfaces/interfaces';
import IP from '../shared/models/ip';


@Injectable({
  providedIn: 'root'
})

export class IPService implements ElementService<IP>{
  
  private readonly _baseUrl: string;
  
  constructor(private http: HttpClient) {
    this._baseUrl = AppConstants.baseURL;
  }
  
  get(id: number): Observable<IP> {
    return this.http.get<IP>(`${this._baseUrl}/ips/${id}`,
    {
      headers: {
        XToken: sessionStorage.getItem('token'),
      }
    })
  }

  delete(element: IP): Observable<IP> {
    return this.http.delete<IP>(`${this._baseUrl}/ips/${element.id}`,
      {
        headers: {
          XToken: sessionStorage.getItem('token'),
        }
      });
  }
  getSome(filters: Object[],include: Object): Observable<IP[]> {
    return this.http.post<IP[]>(`${this._baseUrl}/ips/search`, {filters,include},
      {
        headers: {
          XToken: sessionStorage.getItem('token')
        }});
  }
  add(newIP : IP): Observable<IP> {
    return this.http.post<IP>(`${this._baseUrl}/ips`, newIP,
      {
        headers: {
          XToken: sessionStorage.getItem('token'),
        }
      });
  }
  modify(modIP : IP): Observable<IP> {
    var id = modIP.id;
    var aux = JSON.parse(JSON.stringify(modIP))

    return this.http.patch<IP>(`${this._baseUrl}/ips/${id}`, aux,
      {
        headers: {
          XToken: sessionStorage.getItem('token'),
        }
      });
  }
}
