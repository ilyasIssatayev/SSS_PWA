import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material';
import { WebService } from "src/app/services/web.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private dataService: WebService, private router: Router) { }

  ngOnInit() {
  }

  onLogout(){
    this.dataService.setToken(undefined);
    this.router.navigateByUrl("");
  }

}
