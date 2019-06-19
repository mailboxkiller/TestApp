import {Component, Input, OnInit} from '@angular/core';
import { LoginServiceService } from './LoginForm/loginServices/login-service.service';
import { LoginResponse, LoginInfo, AccountCreateInfo, AccountInfo } from './LoginForm/loginInfo';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  constructor(private login: LoginServiceService) {}
  ulogin = '';
  plogin = '';
  plogin2 = '';

  nonMatchingPass = false;

  loginInfo: LoginInfo = new LoginInfo();
  accountCreateInfo: AccountCreateInfo = new AccountCreateInfo();

  accountInfo: AccountInfo = new AccountInfo();
  token: LoginResponse = new LoginResponse();
  error: HttpErrorResponse;

  ngOnInit() {
    this.token.access_token = localStorage.getItem('access_token');
    if (this.token.access_token === '') {return; }
    this.updateAccountInfo();
  }

  loginRequest() {
    this.loginInfo.username = this.ulogin;
    this.loginInfo.password = this.plogin;
    this.login.sentLoginRequest(this.loginInfo).subscribe(temp => {
      this.token = temp;
      localStorage.setItem('access_token', temp.access_token);
      this.updateAccountInfo();
    });
  }

  createAccount() {
    if (this.plogin !== this.plogin2) {
      this.nonMatchingPass = true;
      return;
    }
    this.accountCreateInfo.email = this.ulogin;
    this.accountCreateInfo.password = this.plogin;
    this.accountCreateInfo.firstname = 'John';
    this.accountCreateInfo.lastname = 'Doe';

    this.login.sendAccountCreateRequest(this.accountCreateInfo).subscribe(
      data => { console.log(data); },
      error => {
        this.error = error;
        console.log(this.error.error.error);
      }
      );
  }

updateAccountInfo() {
  this.login.getAccountInfo(this.token.access_token).subscribe(data => {
    this.accountInfo = data;
  });
}
}
