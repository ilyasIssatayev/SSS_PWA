import { Component, OnInit } from '@angular/core';
import { WebService } from "src/app/services/web.service";
@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  constructor(private dataService: WebService) { }

  ngOnInit() {
    this.DownloadCSV();
  }

  onUploadCSV(){

  }

  DownloadCSV(){
    this.dataService
      .getTariff()
      .subscribe(data => {
        console.log("CSV: ",data)
      });
  }

}
