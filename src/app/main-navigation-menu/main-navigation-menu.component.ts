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

  constructor() {}

  ngOnInit() {}

  onSettings() {

    if (this.settings_name === "Settings") {
      this.settings_name="Back";

      this.fullpage_api.moveTo("settings", 0);
    }
    else{
      this.settings_name="Settings";
      this.fullpage_api.moveSectionUp();
    }
  }
}
