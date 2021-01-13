import { Component, OnInit, Input } from '@angular/core';
import { WebService } from "../../services/web.service";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  @Input()
  fullpage_api;

  user_name
  user_surname
  user_houseNumber

  constructor(private dataService: WebService) { }

  ngOnInit() {
    this.updateUserData();
  }

  goToEditInfo()
  {
    console.log("Edit INfo")
    this.fullpage_api.moveSlideRight();
  }

  goToEditPassword()
  {
    this.fullpage_api.moveSlideLeft();
  }

  updateUserData() {

    this.dataService.getUserName({}).subscribe(data => {
      this.user_name = data.firstname;
    });
    this.dataService.getSurname({}).subscribe(
      data => {
        this.user_surname = data.lastname;
      },
      error => {}
    );
    this.dataService.getHouseNumber().subscribe(
      data => {
        this.user_houseNumber = data.house_number;
      },
      error => {}
    );
  }

}
