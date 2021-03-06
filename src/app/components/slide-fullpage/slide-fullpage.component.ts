import { Component, OnInit } from "@angular/core";
import { WebService } from "src/app/services/web.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-slide-fullpage",
  templateUrl: "./slide-fullpage.component.html",
  styleUrls: ["./slide-fullpage.component.scss"]
})
export class SlideFullpageComponent implements OnInit {
  config: any;
  fullpage_api: any;

  user_name;
  user_surname;
  user_houseNumber;

  constructor(private dataService: WebService, private router: Router) {
    // for more details on config options please visit fullPage.js docs

    this.config = {
      // fullpage options
      licenseKey: "0A9E7E6B-F20D4B1D-9056A152-EFBD3D42",
      anchors: ["main", "settings","profile"],
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
        //console.log(origin.index);
        if (typeof this.dataService.getToken() != "undefined" && this.dataService.getToken() != "undefined") {this.updateUserData();}
      },
      onLeave: (index, nextIndex, direction) => {
         if (typeof this.dataService.getToken() != "undefined" && this.dataService.getToken() != "undefined") {this.updateUserData();}
      }
    };
  }

  getRef(fullPageRef) {
    this.fullpage_api = fullPageRef;
    this.fullpage_api.setAllowScrolling(false, "down, up");
    this.fullpage_api.setKeyboardScrolling(false, "down, up");
  }

  getFullpageAPI()
  {
    return this.fullpage_api;
  }

  ngOnInit() {


    if (typeof this.dataService.getToken() === "undefined" || this.dataService.getToken() === "undefined") {
      //console.log("MOVING BACK USER");
      this.router.navigateByUrl("");

    } else this.updateUserData();
  }

  updateUserData() {
    this.dataService.getVemBalance({year:2018, month: 12, day: 8}).subscribe(data => {
      console.log(data);
    });
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
