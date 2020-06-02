import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppConstants} from '../shared/constants/constants';
import { ElementService } from '../shared/interfaces/interfaces';
import Characteristic from '../shared/models/characteristic';


@Injectable({
  providedIn: 'root'
})

export class CharacteristicService implements ElementService<Characteristic>{
  
  private readonly _baseUrl: string;
  
  constructor(private http: HttpClient) {
    this._baseUrl = AppConstants.baseURL;
  }
  
  get(id): Observable<Characteristic> {
    return this.http.get<Characteristic>(`${this._baseUrl}/characteristics/${id}`,
    {
      headers: {
        XToken: sessionStorage.getItem('token'),
      }
    })
  }

  delete(element: Characteristic): Observable<Characteristic> {
    return this.http.delete<Characteristic>(`${this._baseUrl}/characteristics/${element.name}`,
      {
        headers: {
          XToken: sessionStorage.getItem('token'),
        }
      });
  }
  getSome(filters: Object[], include : Object): Observable<Characteristic[]> {
    return this.http.post<Characteristic[]>(`${this._baseUrl}/characteristics/search`, {filters,include},
      {
        headers: {
          XToken: sessionStorage.getItem('token')
        }});
  }
  add(newCharacteristic : Characteristic): Observable<Characteristic> {
    return this.http.post<Characteristic>(`${this._baseUrl}/characteristics`, newCharacteristic,
      {
        headers: {
          XToken: sessionStorage.getItem('token'),
        }
      });
  }
  modify(modCharacteristic : Characteristic): Observable<Characteristic> {
    var id = modCharacteristic.name;
    delete modCharacteristic.name;
    return this.http.patch<Characteristic>(`${this._baseUrl}/characteristics/${id}`, modCharacteristic,
      {
        headers: {
          XToken: sessionStorage.getItem('token'),
        }
      });
  }
}
