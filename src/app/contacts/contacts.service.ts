import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppConstants} from '../shared/constants/constants';
import { ElementService } from '../shared/interfaces/interfaces';
import Contact from '../shared/models/contact';


@Injectable({
  providedIn: 'root'
})

export class ContactService implements ElementService<Contact>{
  
  private readonly _baseUrl: string;
  
  constructor(private http: HttpClient) {
    this._baseUrl = AppConstants.baseURL;
  }
  
  get(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${this._baseUrl}/contacts/${id}`,
    {
      headers: {
        XToken: sessionStorage.getItem('token'),
      }
    })
  }


  
  delete(element: Contact): Observable<Contact> {
    return this.http.delete<Contact>(`${this._baseUrl}/contacts/${element.id}`,
      {
        headers: {
          XToken: sessionStorage.getItem('token'),
        }

        
      });
  }
  getSome(filters: Object[], include : Object): Observable<Contact[]> {
    return this.http.post<Contact[]>(`${this._baseUrl}/contacts/search`, {filters,include},
      {
        headers: {
          XToken: sessionStorage.getItem('token')
        }});
  }
  add(newAudit : Contact): Observable<Contact> {
    return this.http.post<Contact>(`${this._baseUrl}/contacts`, newAudit,
      {
        headers: {
          XToken: sessionStorage.getItem('token'),
        }
      });
  }
  modify(modAudit : Contact): Observable<Contact> {
    var id = modAudit.id;
    let aux = JSON.parse(JSON.stringify(modAudit))
    delete aux.id;
    return this.http.patch<Contact>(`${this._baseUrl}/contacts/${id}`, aux,
      {
        headers: {
          XToken: sessionStorage.getItem('token'),
        }
      });
  }
}
