import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import Network from '../shared/models/network';
import { ElementService } from '../shared/interfaces/interfaces';
import { AppConstants } from '../shared/constants/constants';


@Injectable({
  providedIn: 'root'
})

export class NetworkService implements ElementService<Network>{
  
  private readonly _baseUrl: string;
  
  constructor(private http: HttpClient) {
    this._baseUrl = AppConstants.baseURL;
  }
  
  get(id: number): Observable<Network> {
    return this.http.get<Network>(`${this._baseUrl}/networks/${id}`,
    {
      headers: {
        XToken: sessionStorage.getItem('token'),
      }
    })
  }

  delete(element: Network): Observable<Network> {
    return this.http.delete<Network>(`${this._baseUrl}/networks/${element.id}`,
      {
        headers: {
          XToken: sessionStorage.getItem('token'),
        }
      });
  }
  getSome(filters: Object[],include : Object): Observable<Network[]> {
    return this.http.post<Network[]>(`${this._baseUrl}/networks/search`, {filters,include},
      {
        headers: {
          XToken: sessionStorage.getItem('token')
        }});
  }
  add(newNetwork : Network): Observable<Network> {
    return this.http.post<Network>(`${this._baseUrl}/networks`, newNetwork,
      {
        headers: {
          XToken: sessionStorage.getItem('token'),
        }
      });
  }
  modify(modNetwork : Network): Observable<Network> {
    var id = modNetwork.id;
    delete modNetwork.id;
    return this.http.patch<Network>(`${this._baseUrl}/networks/${id}`, modNetwork,
      {
        headers: {
          XToken: sessionStorage.getItem('token'),
        }
      });
  }
}
