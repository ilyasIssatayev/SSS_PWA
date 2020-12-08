import { Component, OnInit, ViewChild } from "@angular/core";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { Chart } from "chart.js";

export interface GraphStatus {
  name: string;
}
export interface Transaction {
  item: string;
  cost: number;
}

@Component({
  selector: "app-vem-page",
  templateUrl: "./vem-page.component.html",
  styleUrls: ["./vem-page.component.scss"]
})
export class VEMPageComponent implements OnInit {
  constructor() {}
  @ViewChild("lineCanvas", { static: false }) lineCanvas;

  title = "Charts.js in Angular 9";
  barChart: any;
  doughnutChart: any;
  lineChart: any;

  currentGraphMode = "Today";

  graphStatuses: GraphStatus[] = [
    { name: "Today" },
    { name: "Week" },
    { name: "Month" }
  ];

  displayedColumns: string[] = ["item", "cost"];

  transactions: Transaction[] = [
    { item: "In", cost: 41 },
    { item: "Out", cost: 10 },
    { item: "Current Balance", cost: 20 },
    { item: "Available Balance", cost: 400 }
  ];

  ngAfterViewInit() {
    this.lineChartMethod();
  }

  lineChartMethod() {
    console.log("Line Chart ", this.currentGraphMode);
    let active_data = [65, 59, 80, 81, 56, 55, 40, 10, 5, 50, 10, 15];

    let month_labels = [
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

    let week_labels = [
      "Monday",
      "Tuesday",
      "Wendsday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ];

    let today_labels = [
      "0:00-6:00",
      "6:00-12:00",
      "12:00-16:00",
      "16:00-19:00",
      "19:00-21:00",
      "21:00-24:00"
    ];

    let active_labels;
    if (this.currentGraphMode === "Month") {
      active_labels = month_labels;
    }
    if (this.currentGraphMode === "Week") {
      active_labels = week_labels;
    }
    if (this.currentGraphMode === "Today") {
      active_labels = today_labels;
    }

    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: "bar",

      data: {
        labels: active_labels,
        datasets: [
          {
            label: "VEM Balance",
            fill: true,
            lineTension: 0.1,
            backgroundColor: "rgb(240, 128, 128,0.8)",
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
            data: active_data,
            spanGaps: true
          }
        ]
      }
    });
  }

  updateChart() {
    let active_data = [55, 40, 59, 80, 81, 56, 10, 5, 50, 10, 15, 65];

    let month_labels = [
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

    let week_labels = [
      "Monday",
      "Tuesday",
      "Wendsday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ];

    let today_labels = [
      "0:00-6:00",
      "6:00-12:00",
      "12:00-16:00",
      "16:00-19:00",
      "19:00-21:00",
      "21:00-24:00"
    ];

    let active_labels;
    if (this.currentGraphMode === "Month") {
      active_labels = month_labels;
    }
    if (this.currentGraphMode === "Week") {
      active_labels = week_labels;
    }
    if (this.currentGraphMode === "Today") {
      active_labels = today_labels;
    }

    this.lineChart.data.labels = active_labels;
    this.lineChart.data.datasets[0].data = active_data;
    this.lineChart.update();
    return;
  }

  drop(event: CdkDragDrop<GraphStatus[]>) {
    moveItemInArray(
      this.graphStatuses,
      event.previousIndex,
      event.currentIndex
    );
  }

  setGraphMode(input) {
    this.currentGraphMode = input;
  }

  ngOnInit() {}

  /** Gets the total cost of all transactions. */
  getTotalCost() {
    return "";
  }
}
