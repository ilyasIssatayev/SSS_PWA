import { Component, ViewChild, AfterViewInit } from "@angular/core";
import { Chart } from "chart.js";

@Component({
  selector: "app-graph-line",
  templateUrl: "./graph-line.component.html",
  styleUrls: ["./graph-line.component.scss"]
})
export class GraphLineComponent implements AfterViewInit {
  @ViewChild("lineCanvas", { static: false }) lineCanvas;

  title = "Charts.js in Angular 9";
  barChart: any;
  doughnutChart: any;
  lineChart: any;

  ngAfterViewInit() {
    this.lineChartMethod();
  }

  lineChartMethod() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: "line",
      options: {
        tooltips: {
          mode: "y"
        }
      },
      data: {
        labels: [
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
        ],
        datasets: [
          {
            label: "Energy Consumption",
            fill: true,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 3,
            pointHoverRadius: 3,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 5,
            pointRadius: 1,
            pointHitRadius: 3,
            data: [65, 59, 80, 81, 56, 55, 40, 10, 5, 50, 10, 15],
            spanGaps: true
          },
          {
            label: "Energy Production",
            fill: true,
            lineTension: 0.1,
            backgroundColor: "rgba(245,64,41,0.4)",
            borderColor: "rgba(245,64,41,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(245,64,41,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 3,
            pointHoverBackgroundColor: "rgba(245,64,41,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 3,
            data: [35, 69, 10, 71, 50, 15, 40, 100, 5, 30, 20, 65],
            spanGaps: true
          }
        ]
      }
    });
  }
}
