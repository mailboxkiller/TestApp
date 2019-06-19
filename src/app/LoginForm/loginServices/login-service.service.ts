import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginInfo, LoginResponse, AccountCreateInfo, AccountInfo } from '../loginInfo';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient) { }


  apiUrl = 'http://api.funniray.com';

  sentLoginRequest(term: LoginInfo): Observable<LoginResponse> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
      })
    };

    return this.http.post<LoginResponse>(this.apiUrl + '/oauth2/token', `username=${term.username}
      &password=${term.password}
      &grant_type=${term.grant_type}
      &client_id=${term.client_id}
      &client_secret=${term.client_secret}`, httpOptions);
  }


  sendAccountCreateRequest(term: AccountCreateInfo): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };

    return this.http.post(this.apiUrl + '/user/register', term, httpOptions);
  }

  getAccountInfo(token: string): Observable<AccountInfo> {

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization:  `Bearer ${token}`,
      })
    };

    return this.http.get<AccountInfo>(this.apiUrl + '/user/me', httpOptions);
  }

}
