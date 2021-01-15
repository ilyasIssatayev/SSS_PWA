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
  
  getName(){
    return this.dataService.user_name;
  }

  getSurname(){
    return this.dataService.user_surname;
  }

  getHouseNumber(){
    return this.dataService.user_houseNumber;
  }

  constructor(private dataService: WebService) { }

  ngOnInit() {
    this.updateUserData();
    this.dataService.updateProfile=this;
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
      this.dataService.user_name = data.firstname;
    });
    this.dataService.getSurname({}).subscribe(
      data => {
        this.dataService.user_surname = data.lastname;
      },
      error => {}
    );
    this.dataService.getHouseNumber().subscribe(
      data => {
        this.dataService.user_houseNumber = data.house_number;
      },
      error => {}
    );
  }

}
