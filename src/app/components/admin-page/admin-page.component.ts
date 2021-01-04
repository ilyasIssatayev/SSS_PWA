import { Component, OnInit } from '@angular/core';
import { WebService } from "src/app/services/web.service";
@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  csvOutput='Downloading CSV...';

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
        let output: string="\n";
        data.forEach(element => {
          output+="   | Time: "+element.Time +" | Price_T1_I: "+element.Price_T1_I+" | Price_T2_I: "+element.Price_T2_I+" | rice_T1_E: "+element.Price_T1_E+" | Price_T2_E: "+element.Price_T2_E+" |";
          output+='\n'
        });
        console.log(output)
        this.csvOutput=output;
      });
  }

}
