import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-main-navigation-menu",
  templateUrl: "./main-navigation-menu.component.html",
  styleUrls: ["./main-navigation-menu.component.scss"]
})
export class MainNavigationMenuComponent implements OnInit {
  @Input()
  fullpage_api: any;

  settings_name = "Settings";
  profile_name = "Profile";
  constructor() {}

  ngOnInit() {}

  onSettings() {

    if (this.settings_name === "Settings") {
      this.settings_name="Back";
      this.profile_name="Profile";
      this.fullpage_api.moveTo("settings", 0);
    }
    else{
      this.settings_name="Settings";
      this.fullpage_api.moveSectionUp();
    }
  }
  onProfile() {

    if (this.profile_name === "Profile") {
      this.profile_name="Back";
      this.settings_name="Settings";
      this.fullpage_api.moveTo("profile", 0);
    }
    else{
      this.profile_name="Profile";
      this.fullpage_api.moveSectionUp();
      this.fullpage_api.moveSectionUp();
    }
  }
}
