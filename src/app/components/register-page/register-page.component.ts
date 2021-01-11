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
  dpassword;
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
      licenseKey: "0A9E7E6B-F20D4B1D-9056A152-EFBD3D42",
      anchors: [],
      menu: "#menu",
      paddingTop: 10,
      controlArrows: false,
      dragAndMove: false,
      scrollingSpeed: 500,

      // fullpage callbacks
      afterResize: () => {
        //this.renderer.appendChild(this.fp_directive.nativeElement, section);
        //this.fullpage_api.build(); // <-- here
      },
      afterLoad: (origin, destination, direction) => {
        //console.log(origin.index);
      }
    };
  }

  moveToMain() {
    this.router.navigateByUrl("main");
  }

  ngOnInit() {}

  updateAccount(event: any) {
    this.account = event.target.value;
  }

  updatePassword(event: any) {
    this.password = event.target.value;
    this.duplicatePasswordCorrect = event.target.value === this.dpassword;
  }

  updateDuplicatePassword(event: any) {
    this.duplicatePasswordCorrect = event.target.value === this.password;
    this.dpassword=event.target.value;
  }

  updateName(event: any) {
    this.name = event.target.value;
  }

  onCancel() {
    this.router.navigateByUrl("");
  }

  onFinish() {
    if (this.duplicatePasswordCorrect === false) {
      this._snackBar.open("Passwors do not match", "OK", {
        duration: 2000
      });
      return;
    }

    this.dataService
      .postRegister({
        account: this.account,
        password: this.password
      })
      .subscribe(
        token => {
          console.log(token);
          this.dataService.setToken(token);

          if (token != undefined && token != null) {
            this.fullpage_api.moveSlideRight();
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
