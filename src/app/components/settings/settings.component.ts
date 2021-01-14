import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material';
import { WebService } from "src/app/services/web.service";
import { Router } from "@angular/router";
import { MatRadioChange } from '@angular/material';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  displayType;
  vemActive;
  //Radio Buttons functionality
  selected: string;
  filter: any;

  constructor(private dataService: WebService, private router: Router) { }

  ngOnInit() {
    this.loadSettings();

    //this.changeTheme('lightcoral','lightblue','rgba(255, 255, 255, 0.377)');
  }

  saveSettings(){
    localStorage.setItem("displayType",this.displayType);
    
  }

  loadSettings()
  {
    this.displayType = localStorage.getItem("displayType");
     if (this.displayType==='2') this.changeTheme('darkgrey','white','black');
     else this.changeTheme('lightcoral','lightblue','rgba(255, 255, 255, 0.377)');
     console.log("DISPLAY: ",this.displayType)
    this.dataService.getVemActive().subscribe(vem_active => {
      this.vemActive=``+(vem_active.vem_active+1);
      console.log("VEM_ACTIVE: ",this.vemActive)
    })
    this.dataService.getColorBlindMode().subscribe(cb_active => {
      this.displayType=cb_active+1;
      console.log(this.displayType);
    })

  }

  onLogout(){
    this.dataService.setToken(undefined);
    this.router.navigateByUrl("");
  }
// rgba(255, 255, 255, 0.377)
  changeTheme(primary: string, secondary: string, arrow: string) {
    document.documentElement.style.setProperty('--primary-color', primary);
    document.documentElement.style.setProperty('--secondary-color', secondary);
    document.documentElement.style.setProperty('--arrow-color', arrow);
  }

  radioChange(event: MatRadioChange) {
    console.log(event.value);
    this.displayType=event.value;

    if (event.value==='1') this.changeTheme('lightcoral','lightblue','rgba(255, 255, 255, 0.377)');
    else this.changeTheme('darkgrey','white','black');
    this.saveSettings();
}

radioChangeVEM(event: MatRadioChange){
  console.log(event.value);
  this.vemActive=event.value;
  let vem;
  if(this.vemActive==='2') vem=true;
  else vem=false;
  this.dataService.putVemActive(vem).subscribe(data=>{

  })
}



}
