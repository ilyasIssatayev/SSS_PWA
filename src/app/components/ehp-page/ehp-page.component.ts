import { Component, OnInit, ViewChild } from "@angular/core";
import * as Chart from "chart.js";
import { MatDatepickerInputEvent } from "@angular/material";

@Component({
  selector: "app-ehp-page",
  templateUrl: "./ehp-page.component.html",
  styleUrls: ["./ehp-page.component.scss"]
})
export class EhpPageComponent implements OnInit {
  @ViewChild("lineCanvas", { static: false }) lineCanvas;
  lineChart: any;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.lineChartMethod();
  }

  enterDateStart(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log(`${typeof event.value}: ${event.value}`);
    let d: Date;
    d = event.value;
    console.log("Date: ",d);
  }

  enterDateEnd(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log(`${typeof event.value}: ${event.value}`);
    let d: Date;
    d = event.value;
    console.log("Date: ",d);
  }

  lineChartMethod() {
    let active_data_c = [65, 59, 80, 81, 56, 55, 40, 10, 5, 50, 10, 15];
    let active_data_p = [40, 10, 5, 50, 10, 15, 65, 59, 80, 81, 56, 55];

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
}
