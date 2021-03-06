import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { WebService } from "src/app/services/web.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-edit-user-info",
  templateUrl: "./edit-user-info.component.html",
  styleUrls: ["./edit-user-info.component.scss"]
})
export class EditUserInfoComponent implements OnInit {
  name;
  surname;
  houseNumber;

  @Input()
  userDataActivator;

  constructor(
    private dataService: WebService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {}
  updateName(event) {
    this.name = event.target.value;
  }

  updateSurname(event) {
    this.surname = event.target.value;
  }

  updateHouseNumber(event) {
    this.houseNumber = event.target.value;
  }

  //Make sure to recieve only numbers from input
  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  onClear() {
    this.name = "";
    this.surname = "";
    this.houseNumber = "";
  }

  onSave() {
    this.sendUserData();
   // this.userDataActivator.updateUserData();
    this.dataService.user_name=this.name;
    this.dataService.user_surname=this.surname;
    this.dataService.user_houseNumber=this.houseNumber;
    this.dataService.profile.updateUserData();
  }

  sendUserData() {
    //Updating User's first name
    let success = 0;
    this.dataService.putName({ name: this.name }).subscribe(
      data => {
        success++;
        if (success === 3) {
          //Sends local pop up
          this._snackBar.open("Data has been changed", "OK", {
            duration: 1000
          });
        }
      }
    );
    //Updating User's last name
    this.dataService.putSurname({ surname: this.surname }).subscribe(
      data => {
        success++;
        if (success === 3) {
          //Sends local pop up          
          this._snackBar.open("Data has been changed", "OK", {
            duration: 1000
          });
        }
      }
    );

    this.dataService.postHouseNumber( {houseNumber: this.houseNumber }).subscribe(
      data => {
        success++;
        if (success === 3) {
          this._snackBar.open("Data has been changed", "OK", {
            duration: 1000
          });
        }
      },
      error => {
        //console.log("Error: ", error);
      }
    )
  }
}
