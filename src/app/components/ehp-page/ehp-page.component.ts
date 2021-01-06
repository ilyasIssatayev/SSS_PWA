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

  start_date = false;
  end_date = false;

  sd;
  ed;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.lineChartMethod();
  }

  enterDateStart(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log(`${typeof event.value}: ${event.value}`);
    let d: Date;
    d = event.value;
    console.log("Date: ", d);
    this.start_date = true;
    this.sd = d;

    if (this.end_date && this.start_date) {
      console.log("Start");
      this.updateChart(this);
    }
  }

  enterDateEnd(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log(`${typeof event.value}: ${event.value}`);
    let d: Date;
    d = event.value;
    console.log("Date: ", d);
    this.end_date = true;
    this.ed = d;

    if (this.end_date && this.start_date) {
      console.log("End");
      this.updateChart(this);
    }
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

  updateChart(obj) {
    if (obj.sd > obj.ed) {
      return;
    }

    let dates = [];
    let active_date = obj.sd;

    while (active_date < obj.ed) {
      active_date.setDate(active_date.getDate() + 1);
      dates.push(new Date(active_date));
    }

    //labels and datasets
    let active_data = [];
    let active_data2 = [];
    let active_labels = [];

    dates.forEach(element => {
      let date = new Date(element);

      //pushing data
      active_labels.push(date.getDate() + " / " + date.getMonth() + 1);
      active_data.push(this.getRandomInt(60));
      active_data2.push(this.getRandomInt(50));
    });

    //Setting object to the chart
    obj.lineChart.data.labels = active_labels;
    obj.lineChart.data.datasets[0].data = active_data;
    obj.lineChart.data.datasets[1].data = active_data2;
    obj.lineChart.update();
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
}
