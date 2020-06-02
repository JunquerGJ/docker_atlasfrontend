import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppConstants} from '../shared/constants/constants';
import { ElementService } from '../shared/interfaces/interfaces';
import Area from '../shared/models/area';


@Injectable({
  providedIn: 'root'
})

export class AreaService implements ElementService<Area>{
  
  private readonly _baseUrl: string;
  
  constructor(private http: HttpClient) {
    this._baseUrl = AppConstants.baseURL;
  }
  
  get(id): Observable<Area> {
    return this.http.get<Area>(`${this._baseUrl}/areas/${id}`,
    {
      headers: {
        XToken: sessionStorage.getItem('token'),
      }
    })
  }

  delete(element: Area): Observable<Area> {
    return this.http.delete<Area>(`${this._baseUrl}/areas/${element.id}`,
      {
        headers: {
          XToken: sessionStorage.getItem('token'),
        }
      });
  }
  getSome(filters: Object[],include : Object): Observable<Area[]> {
    return this.http.post<Area[]>(`${this._baseUrl}/areas/search`, {filters, include},
      {
        headers: {
          XToken: sessionStorage.getItem('token')
        }});
  }
  add(newArea : Area): Observable<Area> {
    return this.http.post<Area>(`${this._baseUrl}/areas`, newArea,
      {
        headers: {
          XToken: sessionStorage.getItem('token'),
        }
      });
  }
  modify(modArea : Area): Observable<Area> {
    var id = modArea.id;
    var aux = JSON.parse(JSON.stringify(modArea))
    delete aux.id
    return this.http.patch<Area>(`${this._baseUrl}/areas/${id}`, aux,
      {
        headers: {
          XToken: sessionStorage.getItem('token'),
        }
      });
  }
}
