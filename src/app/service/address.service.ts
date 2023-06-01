import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Address } from '../data/address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

readonly backendUrl = 'address';

  constructor(private http: HttpClient) {
  }

  public getList(): Observable<Address[]> {
    return this.http.get<Address[]>(environment.backendBaseUrl + this.backendUrl);
  }

  public getOne(id: number): Observable<Address> {
    return this.http.get<Address>(environment.backendBaseUrl + this.backendUrl + `/${id}`);
  }

  public update(department: Address): Observable<Address> {
    return this.http.put<Address>(environment.backendBaseUrl + this.backendUrl + `/${department.id}`, department);
  }

  public save(department: Address): Observable<Address> {
    return this.http.post<Address>(environment.backendBaseUrl + this.backendUrl, department);
  }

  public delete(id: number): Observable<HttpResponse<string>> {
    return this.http.delete<string>(environment.backendBaseUrl + this.backendUrl + `/${id}`, {observe: 'response'});
  }
}
