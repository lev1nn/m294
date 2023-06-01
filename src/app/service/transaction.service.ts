import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Transaction } from '../data/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  readonly backendUrl = 'transaction';

  constructor(private http: HttpClient) {
  }

  public getList(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(environment.backendBaseUrl + this.backendUrl);
  }

  public getOne(id: number): Observable<Transaction> {
    return this.http.get<Transaction>(environment.backendBaseUrl + this.backendUrl + `/${id}`);
  }

  public update(department: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(environment.backendBaseUrl + this.backendUrl + `/${department.id}`, department);
  }

  public save(department: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(environment.backendBaseUrl + this.backendUrl, department);
  }

  public delete(id: number): Observable<HttpResponse<string>> {
    return this.http.delete<string>(environment.backendBaseUrl + this.backendUrl + `/${id}`, {observe: 'response'});
  }
}
