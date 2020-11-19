import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormControl, Validators } from "@angular/forms";
import { WebService } from "src/app/services/web.service";
import { MatSnackBar } from "@angular/material";
@Component({
  selector: "app-register-page",
  templateUrl: "./register-page.component.html",
  styleUrls: ["./register-page.component.scss"]
})
export class RegisterPageComponent implements OnInit {
  hide = true;

  email = new FormControl("", [Validators.required, Validators.email]);

  account;
  password;
  name;
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
    console.log("account: ", this.account);
  }

  updatePassword(event: any) {
    this.password = event.target.value;
    console.log("password: ", this.password);
  }

  updateName(event: any) {
    this.name = event.target.value;
    console.log("name: ", this.name);
  }

  onFinish() {
    this.dataService
      .postRegister({
        account: this.account,
        password: this.password
      })
      .subscribe(
        token => {
          console.log(token);
          if (token != undefined && token != null) {
            this.router.navigateByUrl("main");
          } else {
            this._snackBar.open("Something went wrong", "OK", {
              duration: 2000
            });
          }
        },
        error => {
          console.log("ERROR", error.state);
          {
            this._snackBar.open("Something went wrong", "OK", {
              duration: 10000
            });
          }
        }
      );

    //this.router.navigateByUrl("");
  }
}
