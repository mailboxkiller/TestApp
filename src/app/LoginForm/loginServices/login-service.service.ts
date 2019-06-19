import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loginInfo, loginResponce, accountCreateInfo, accountInfo } from '../loginInfo';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient) { }


  apiUrl:string = "http://api.funniray.com"; 

  sentLoginReqest(term: loginInfo):Observable<loginResponce>{

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
      })
    };

    return this.http.post<loginResponce>(this.apiUrl + "/oauth2/token", `username=${term.username}&password=${term.password}&grant_type=${term.grant_type}&client_id=${term.client_id}&client_secret=${term.client_secret}`, httpOptions);
  }


  sendAccountCreateReqest(term: accountCreateInfo):Observable<any>{

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };

    return this.http.post(this.apiUrl + "/user/register", term, httpOptions);
  }

  getAccountInfo(token: string):Observable<accountInfo>{

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':  `Bearer ${token}`,
      })
    };

    return this.http.get<accountInfo>(this.apiUrl + "/user/me", httpOptions);
  }

}
