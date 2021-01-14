import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { WebService } from "src/app/services/web.service";
@Component({
  selector: "app-edit-use-data",
  templateUrl: "./edit-use-data.component.html",
  styleUrls: ["./edit-use-data.component.scss"]
})
export class EditUseDataComponent implements OnInit {
  constructor(private dataService: WebService, private router: Router) {}

  ngOnInit() {}

  name;
  surname;
  houseNumber;

  @Input()
  leftButtonName;
  @Input()
  leftButtonCallback;

  @Input()
  rightButtonName;
  @Input()
  rightButtonCallback;

  @Input()
  fullpage_api;

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

  //Navigate to main
  onCancel() {
    this.router.navigateByUrl("main");
  }

  //Navigate to main with saveing UserData on Backend
  onApply() {
    this.router.navigateByUrl("main");
    this.sendUserData();
  }

  sendUserData() {
    //Updating User's first name
    this.dataService.putName({ name: this.name }).subscribe();
    //Updating User's last name
    this.dataService.putSurname({ surname: this.surname }).subscribe();
    //Updating User's HouseNumber
    this.dataService.postHouseNumber({houseNumber: this.houseNumber}).subscribe();
  }
}
