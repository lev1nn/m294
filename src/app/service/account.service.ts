import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Account } from '../data/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  readonly backendUrl = 'account';

  constructor(private http: HttpClient) {
  }

  public getList(): Observable<Account[]> {
    return this.http.get<Account[]>(environment.backendBaseUrl + this.backendUrl);
  }

  public getOne(id: number): Observable<Account> {
    return this.http.get<Account>(environment.backendBaseUrl + this.backendUrl + `/${id}`);
  }

  public update(department: Account): Observable<Account> {
    return this.http.put<Account>(environment.backendBaseUrl + this.backendUrl + `/${department.id}`, department);
  }

  public save(department: Account): Observable<Account> {
    return this.http.post<Account>(environment.backendBaseUrl + this.backendUrl, department);
  }

  public delete(id: number): Observable<HttpResponse<string>> {
    return this.http.delete<string>(environment.backendBaseUrl + this.backendUrl + `/${id}`, {observe: 'response'});
  }

  public getSelfList(id: number): Observable<Account[]> {
    return this.http.get<Account[]>(environment.backendBaseUrl + this.backendUrl + `/customer` + `/${id}`);
  }
}
