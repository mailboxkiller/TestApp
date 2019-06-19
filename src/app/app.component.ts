import { Component, Input } from '@angular/core';
import { LoginServiceService } from './LoginForm/loginServices/login-service.service';
import { loginResponce, loginInfo, accountCreateInfo, accountInfo } from './LoginForm/loginInfo';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  ulogin:string ="";
  plogin:string ="";
  plogin2:string ="";

  nonMatchingPass:boolean = false;

  constructor(private login:LoginServiceService){}

  loginInfo:loginInfo = new loginInfo
  accountCreateInfo:accountCreateInfo = new accountCreateInfo

  accountInfo: accountInfo = new accountInfo();


token: loginResponce = new loginResponce();

  ngOnInit(){
    this.token.access_token = localStorage.getItem('access_token');
    if(this.token.access_token==="")return;
    this.updateAccountInfo();
  }

  loginRequest(){
    this.loginInfo.username = this.ulogin;
    this.loginInfo.password = this.plogin;
    this.login.sentLoginReqest(this.loginInfo).subscribe(temp => {
      this.token = temp;
      localStorage.setItem('access_token', temp.access_token);
      this.updateAccountInfo();
    });
  }

error: HttpErrorResponse;

  createAccount(){
    if(this.plogin !== this.plogin2){
      this.nonMatchingPass = true;
      return;
    }
    this.accountCreateInfo.email = this.ulogin;
    this.accountCreateInfo.password = this.plogin;
    this.accountCreateInfo.firstname = "John";
    this.accountCreateInfo.lastname = "Doe";

    this.login.sendAccountCreateReqest(this.accountCreateInfo).subscribe(
      data => { console.log(data);},
      error =>{ 
        this.error = error;
        console.log(this.error.error.error);
      }
      );
  }

updateAccountInfo(){
  this.login.getAccountInfo(this.token.access_token).subscribe(data => {
    this.accountInfo = data
  });
}
}
