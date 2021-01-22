import { Component, OnInit } from '@angular/core';
import { WebService } from "src/app/services/web.service";
@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  csvOutput = 'Downloading CSV...';
  csvInput = '';
  constructor(private dataService: WebService) { }

  //Downloads CSV file from Backend when page is loaded
  ngOnInit() {
    this.DownloadCSV();
  }
  onCSVEnter(event) {
    this.csvInput = event.target.value;
  }
  onUploadCSV() {
    this.UploadCSV();
  }

  //Downloads CSV from backend
  DownloadCSV() {
    this.dataService
      .getTariff()
      .subscribe(data => {

        let output: string = "\n";
        data.forEach(element => {
          output += "   | Time: " + element.Time + " | Price_T1_I: " + element.Price_T1_I + " | Price_T2_I: " + element.Price_T2_I + " | rice_T1_E: " + element.Price_T1_E + " | Price_T2_E: " + element.Price_T2_E + " |";
          output += '\n'
        });

        this.csvOutput = output;

      });
  }
  //Uploads CSV
  UploadCSV() {
    this.dataService
      .putCSVTariff(this.csvInput);
  }

}
