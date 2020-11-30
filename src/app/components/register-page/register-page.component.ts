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
  duplicatePasswordCorrect = true;


  account;
  password;
  name;

  config: any;
  fullpage_api: any;




  getErrorMessage() {
    if (this.email.hasError("required")) {
      return "You must enter a value";
    }

    return this.email.hasError("email") ? "Not a valid email" : "";
  }

  getRef(fullPageRef) {
    this.fullpage_api = fullPageRef;
    this.fullpage_api.setAllowScrolling(false, "down, up", "left", "right");
    this.fullpage_api.setKeyboardScrolling(false, "down, up", "left", "right");
  }

  constructor(
    private dataService: WebService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.config = {
      // fullpage options
      licenseKey: "YOUR LICENSE KEY HERE",
      anchors: [],
      menu: "#menu",
      paddingTop: 10,
      controlArrows: true,
      dragAndMove: true,
      scrollingSpeed: 500,

      // fullpage callbacks
      afterResize: () => {
        //this.renderer.appendChild(this.fp_directive.nativeElement, section);
        //this.fullpage_api.build(); // <-- here
      },
      afterLoad: (origin, destination, direction) => {
        console.log(origin.index);
      }
    };
  }

  ngOnInit() {}

  updateAccount(event: any) {
    this.account = event.target.value;
    console.log("account: ", this.account);
  }

  updatePassword(event: any) {
    this.password = event.target.value;
    console.log("password: ", this.password);
  }

  updateDuplicatePassword(event: any) {
    this.duplicatePasswordCorrect = event.target.value === this.password;
    console.log(this.duplicatePasswordCorrect);
  }

  updateName(event: any) {
    this.name = event.target.value;
    console.log("name: ", this.name);
  }

  onCancel() {
    this.router.navigateByUrl("");
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
            this.fullpage_api.moveSlideRight();
            this.dataService.token = token;
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
