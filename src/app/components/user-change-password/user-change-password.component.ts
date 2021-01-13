import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";
import { WebService } from "../../services/web.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
@Component({
  selector: 'app-user-change-password',
  templateUrl: './user-change-password.component.html',
  styleUrls: ['./user-change-password.component.scss']
})
export class UserChangePasswordComponent implements OnInit {
  hide = true;

  email = new FormControl("", [Validators.required, Validators.email]);

  old_password;
  new_password;

  getErrorMessage() {
    if (this.email.hasError("required")) {
      return "You must enter a value";
    }

    return this.email.hasError("email") ? "Not a valid email" : "";
  }
  constructor(private dataService: WebService,
    private router: Router,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  updateNewPassword(event) {
    this.new_password = event.target.value;
  }

  updateOldPassword(event) {
    this.old_password = event.target.value;
  }

  onCancel() {

  }

  onChange() {
    this.dataService.postPassword({old_password: this.old_password,new_password: this.new_password}).subscribe(
      data=>{
        console.log("OUTPUT: ",data);
    
    })
  }
}
