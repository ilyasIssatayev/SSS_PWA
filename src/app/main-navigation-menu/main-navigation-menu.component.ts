import { Component, OnInit, Input  } from '@angular/core';

@Component({
  selector: 'app-main-navigation-menu',
  templateUrl: './main-navigation-menu.component.html',
  styleUrls: ['./main-navigation-menu.component.scss']
})
export class MainNavigationMenuComponent implements OnInit {

  @Input()
  fullpage_api: any;

  constructor() { }

  ngOnInit() {
  }



}