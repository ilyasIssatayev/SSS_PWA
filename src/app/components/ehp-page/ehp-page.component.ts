import { Component, OnInit, ViewChild } from "@angular/core";
import * as Chart from "chart.js";
import { MatDatepickerInputEvent } from "@angular/material";
import { WebService } from '../../services/web.service';
@Component({
  selector: "app-ehp-page",
  templateUrl: "./ehp-page.component.html",
  styleUrls: ["./ehp-page.component.scss"]
})
export class EhpPageComponent implements OnInit {
  @ViewChild("lineCanvas", { static: false }) lineCanvas;
  lineChart: any;

  //Start Date
  sd;
  //End Date
  ed;

  //Array for graph datasets
  consumption = [];
  production = [];
  //Array for graph label
  labels = [];

  constructor(private dataService: WebService) { }

  ngOnInit() { }


  ngAfterViewInit() {
    //Initiate the graph
    this.lineChartMethod();
    //update chart based on Backends
    this.updateChart(this);
  }

  enterDateStart(type: string, event: MatDatepickerInputEvent<Date>) {
    let d: Date;
    d = event.value;
    this.sd = d;
  }

  enterDateEnd(type: string, event: MatDatepickerInputEvent<Date>) {
    let d: Date;
    d = event.value;
    this.ed = d;
  }
  //Initialize graph
  lineChartMethod() {
    //default values
    let active_data_c = [65, 59, 80, 81, 56, 55, 40, 10, 5, 50, 10, 15];
    let active_data_p = [40, 10, 5, 50, 10, 15, 65, 59, 80, 81, 56, 55];

    //default values
    let active_labels = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "November",
      "December"
    ];

    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: "line",

      data: {
        labels: active_labels,
        datasets: [
          {
            label: "Energy Production",
            fill: true,
            lineTension: 0.1,
            backgroundColor: "rgb(240, 128, 128,0.3)",
            borderColor: "rgb(240, 128, 128,0.8)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 3,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 3,
            pointRadius: 1,
            pointHitRadius: 3,
            data: active_data_c,
            spanGaps: true
          },
          {
            label: "Energy Consuption",
            fill: true,
            lineTension: 0.1,
            backgroundColor: "rgb(128, 128, 240,0.3)",
            borderColor: "rgb(240, 128, 128,0.8)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 3,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 3,
            pointRadius: 1,
            pointHitRadius: 3,
            data: active_data_p,
            spanGaps: true
          }
        ]
      }
    });
  }

  //Updates Graph based on Backend's data
  updateChart(obj) {

    //start date must be before end date
    if (obj.sd > obj.ed) {
      return;
    }

    //Setting object to the chart
    obj.lineChart.data.labels = this.labels;
    obj.lineChart.data.datasets[0].data = this.production;
    obj.lineChart.data.datasets[1].data = this.consumption;
    obj.lineChart.update();
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  //Downloads Energy Data From Backend
  downloadEnergyData() {
    console.log("downloading ehp data...", this.sd);
    console.log("END date", this.ed);
    this.dataService.getEnergyProfileHistory(
      { month: this.sd.getMonth() + 1, day: this.sd.getDate(), year: this.sd.getFullYear() },
      { month: this.ed.getMonth() + 1, day: this.ed.getDate(), year: this.ed.getFullYear() }).subscribe(data => {
        console.log("EHP:", data);
        this.labels = [];
        this.production = [];
        this.consumption = [];
        for (const [key, value] of Object.entries(data)) {
          //console.log(`${key}: ${value}`);
          //console.log(value);
          let temp: any = value;
          let productionToAdd = temp.productiont1 + temp.productiont2;
          let consumptionToAdd = temp.consumptiont1 + temp.consumptiont2;
          this.labels.push(key);
          this.production.push(productionToAdd);
          this.consumption.push(consumptionToAdd);
        }
        //updates graph
        this.updateChart(this);

      });
  }
}
