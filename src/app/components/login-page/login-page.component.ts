import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { WebService } from '../../services/web.service';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  hide: true;

  email = new FormControl('', [Validators.required, Validators.email]);

  account;
  password;

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  constructor(private dataService: WebService)
  {

  }

  ngOnInit() {

  }

  updateAccount(event: any)
  {
    this.account = event.target.value;
    console.log("account: ",this.account)
  }

  updatePassword(event: any)
  {
    this.password = event.target.value;
    console.log("password: ",this.password )
  }

  onLogin(){
    console.log("Login",{account:this.account,password:this.password} );
    this.dataService.postLogin({account:this.account,password:this.password}).subscribe(
      token => {
        console.log("Subscribe")
        console.log(token);

      }
  );;
  }

}
