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

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  onCancel() {
    this.router.navigateByUrl("main");
  }
  onApply() {
    this.router.navigateByUrl("main");
    this.sendUserData();

  }

  sendUserData() {
    //Updating User's first name
    console.log("Sending USER DATA: ",this.name," / ",this.surname)

    this.dataService.putName({ name: this.name }).subscribe(
      data => {
        console.log(data);
        console.log("<+++++++++++>")
      },
      error => {
        console.log("Error: ", error);
      }
    );
    //Updating User's last name
    this.dataService.putSurname({ surname: this.surname }).subscribe(
      data => {
        console.log(data);
        console.log("<+++++++++++>")
      },
      error => {
        console.log("Error: ", error);
      }
    );
  }
}
