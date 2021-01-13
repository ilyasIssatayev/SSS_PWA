import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-nav-menu',
  templateUrl: './top-nav-menu.component.html',
  styleUrls: ['./top-nav-menu.component.scss']
})
export class TopNavMenuComponent implements OnInit {

  @Input()
  fullpage_api: any;

  settings_name = "Settings";
  profile_name = "Profile";
  constructor() { }

  ngOnInit() { }

  onSettings() {

    this.fullpage_api.moveTo("settings", 0);
    return;

  }
  onProfile() {
    this.fullpage_api.moveTo("profile", 1);

  }

}
