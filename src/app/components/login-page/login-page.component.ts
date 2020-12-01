import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { WebService } from "../../services/web.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"]
})
export class LoginPageComponent implements OnInit {
  hide = true;

  email = new FormControl("", [Validators.required, Validators.email]);

  account;
  password;

  getErrorMessage() {
    if (this.email.hasError("required")) {
      return "You must enter a value";
    }

    return this.email.hasError("email") ? "Not a valid email" : "";
  }

  constructor(
    private dataService: WebService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  updateAccount(event: any) {
    this.account = event.target.value;
  }

  updatePassword(event: any) {
    this.password = event.target.value;
  }

  onRegister() {
    this.router.navigateByUrl("register");
  }

  onLogin() {
    this.dataService
      .postLogin({ account: this.account, password: this.password })
      .subscribe(
        token => {
          if (token != undefined && token != null) {
            this.router.navigateByUrl("main");
            this.dataService.setToken( token );
          } else {
            this._snackBar.open("Wrong Account or password", "OK", {
              duration: 2000
            });
          }
        },
        error => {
          //console.log("ERROR", error);

          if (error.status === 400) {
            this._snackBar.open("Wrong Account or password", "OK", {
              duration: 10000
            });
          } else {
            this._snackBar.open("Something went wrong", "OK", {
              duration: 10000
            });
          }
        }
      );
  }
}
