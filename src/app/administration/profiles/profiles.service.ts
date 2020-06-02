import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppConstants} from '../../shared/constants/constants';
import { ElementService } from '../../shared/interfaces/interfaces';
import Profile from '../../shared/models/profile';


@Injectable({
  providedIn: 'root'
})

export class ProfileService implements ElementService<Profile>{
  
  private readonly _baseUrl: string;
  
  constructor(private http: HttpClient) {
    this._baseUrl = AppConstants.baseURL;
  }
  
  get(id,params): Observable<Profile> {
    return this.http.get<Profile>(`${this._baseUrl}/profiles/${id}`,
    {
      params : params,
      headers: {
        XToken: sessionStorage.getItem('token'),
      }
    })
  }

  delete(element: Profile): Observable<Profile> {
    return this.http.delete<Profile>(`${this._baseUrl}/profiles/${element.id}`,
      {
        headers: {
          XToken: sessionStorage.getItem('token'),
        }
      });
  }
  public getSome(filters: Object[], include : Object): Observable<Profile[]> {
     return this.http.post<Profile[]>(`${this._baseUrl}/profiles/search`, {filters, include},
      {
        headers: {
          XToken: sessionStorage.getItem('token')
        }});
  }
  add(newProfile : Profile): Observable<Profile> {
    return this.http.post<Profile>(`${this._baseUrl}/profiles`, newProfile,
      {
        headers: {
          XToken: sessionStorage.getItem('token'),
        }
      });
  }
  modify(modProfile : Profile): Observable<Profile> {
    var id = modProfile.id;
    return this.http.patch<Profile>(`${this._baseUrl}/profiles/${id}`, modProfile,
      {
        headers: {
          XToken: sessionStorage.getItem('token'),
        }
      });
  }
}
