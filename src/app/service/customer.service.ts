import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Customer } from '../data/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  readonly backendUrl = 'customer';

  constructor(private http: HttpClient) {
  }

  public getList(): Observable<Customer[]> {
    return this.http.get<Customer[]>(environment.backendBaseUrl + this.backendUrl);
  }

  public getOne(id: number): Observable<Customer> {
    return this.http.get<Customer>(environment.backendBaseUrl + this.backendUrl + `/${id}`);
  }

  public update(department: Customer): Observable<Customer> {
    return this.http.put<Customer>(environment.backendBaseUrl + this.backendUrl + `/${department.id}`, department);
  }

  public save(department: Customer): Observable<Customer> {
    return this.http.post<Customer>(environment.backendBaseUrl + this.backendUrl, department);
  }

  public delete(id: number): Observable<HttpResponse<string>> {
    return this.http.delete<string>(environment.backendBaseUrl + this.backendUrl + `/${id}`, {observe: 'response'});
  }

  public getSelf(): Observable<Customer> {
    return this.http.get<Customer>(environment.backendBaseUrl + this.backendUrl + `/whoami`);
  }
}
