import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppConstants} from '../shared/constants/constants';
import { ElementService } from '../shared/interfaces/interfaces';
import Asset from '../shared/models/asset';


@Injectable({
  providedIn: 'root'
})

export class AssetService implements ElementService<Asset>{
  
  private readonly _baseUrl: string;
  
  constructor(private http: HttpClient) {
    this._baseUrl = AppConstants.baseURL;
  }
  
  get(id,params): Observable<Asset> {
    return this.http.get<Asset>(`${this._baseUrl}/assets/${id}`,
    {
      params : params,
      headers: {
        XToken: sessionStorage.getItem('token'),
      }
    })
  }

  delete(element: Asset): Observable<Asset> {
    return this.http.delete<Asset>(`${this._baseUrl}/assets/${element.id}`,
      {
        headers: {
          XToken: sessionStorage.getItem('token'),
        }
      });
  }
  getSome(filters: Object[], include : Object): Observable<Asset[]> {
    return this.http.post<Asset[]>(`${this._baseUrl}/assets/search`, {filters,include},
      {
        headers: {
          XToken: sessionStorage.getItem('token')
        }});
  }
  add(newAsset : Asset): Observable<Asset> {
    return this.http.post<Asset>(`${this._baseUrl}/assets`, newAsset,
      {
        headers: {
          XToken: sessionStorage.getItem('token'),
        }
      });
  }
  modify(modAsset : Asset): Observable<Asset> {
    var id = modAsset.id;
    delete modAsset.id;
    return this.http.patch<Asset>(`${this._baseUrl}/assets/${id}`, modAsset,
      {
        headers: {
          XToken: sessionStorage.getItem('token'),
        }
      });
  }
}
