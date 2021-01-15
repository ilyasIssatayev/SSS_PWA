import { Component, OnInit, ViewChild } from "@angular/core";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { Chart } from "chart.js";
import { WebService } from "src/app/services/web.service";
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
  constructor(private dataService: WebService) {}
  @ViewChild("lineCanvas", { static: false }) lineCanvas;

  title = "Charts.js in Angular 9";
  barChart: any;
  doughnutChart: any;
  lineChart: any;

  currentGraphMode = "Today";

  in_value: number;
  out_value: number;

  graphStatuses: GraphStatus[] = [
    { name: "Today" },
    { name: "Week" },
    { name: "Month" }
  ];

  displayedColumns: string[] = ["item", "cost"];

  transactions: Transaction[] = [
    //redo to balance only
    { item: "In", cost: 41 },
    { item: "Out", cost: 10 },
    { item: "Total", cost: 20 }
  ];

  ngAfterViewInit() {
    this.getVEMBalance(this.lineChartMethod);
    this.getVEMBalance(this.updateChart);
  }

  getVEMBalance(callback) {
    let output_data = [];
    let output_labels = [];
    let date = new Date();
    let t_date = new Date();

    let day_range;
    if (this.currentGraphMode === "Month") {
      day_range = 31;
    }
    if (this.currentGraphMode === "Week") {
      day_range = 7;
    }
    if (this.currentGraphMode === "Today") {
      day_range = 1;
    }
    date.setDate(date.getDate());
    t_date.setDate(t_date.getDate() - day_range);

    let current_date = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate()
    };
    let target_date = {
      year: t_date.getFullYear(),
      month: t_date.getMonth() + 1,
      day: t_date.getDate()
    };

    this.getInOut(current_date, target_date);
    if (day_range !== 1) {
      this.dataService
        .getVemBalanceRange(
          target_date, //Start Date
          current_date //End Date
        )
        .subscribe(data => {
          data.forEach(function(balance) {
            output_data.push(balance.Balance);
            output_labels.push(balance.day);

          });
          callback(output_data, output_labels, this);
        });
    }
    if (day_range === 1) {
      this.dataService
        .getVemBalance(
          current_date //End Date
        )
        .subscribe(data => {
          data.forEach(function(balance) {
            output_data.push(balance.Balance);
            output_labels.push(balance.time);
          });
          callback(output_data, output_labels, this);
        });
    }
  }

  lineChartMethod(active_data, a_labels, obj) {
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
    if (obj.currentGraphMode === "Month") {
      active_labels = month_labels;
    }
    if (obj.currentGraphMode === "Week") {
      active_labels = week_labels;
    }
    if (obj.currentGraphMode === "Today") {
      active_labels = today_labels;
    }

    obj.lineChart = new Chart(obj.lineCanvas.nativeElement, {
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

            borderDash: [],
            borderDashOffset: 0.0,

            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 3,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 3,
            pointRadius: 1,
            pointHitRadius: 3,
            data: a_labels,
            spanGaps: true
          }
        ]
      }
    });
  }

  updateChart(active_data, a_labels, obj) {

    let active_labels = [];

    a_labels.forEach(element => {
      let date = new Date(element);
      if (obj.currentGraphMode === "Today") {
        active_labels.push(date.getHours() + ":" + date.getMinutes());
      }
      if (obj.currentGraphMode === "Week") {
        active_labels.push(date.getDate() + " / " + date.getMonth());
      }
      if (obj.currentGraphMode === "Month") {
        active_labels.push(date.getDate() + " / " + date.getMonth());
      }
    });

    obj.lineChart.data.labels = active_labels;
    obj.lineChart.data.datasets[0].data = active_data;
    obj.lineChart.update();
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

  ngOnInit() {

  }

  /** Gets the total cost of all transactions. */
  getTotalCost() {
    return "";
  }

  getInOut(target_date,current_date ) {
    this.dataService
      .getVemInOutRange(current_date, target_date)
      .subscribe(data => {
        this.in_value = data.in;
        this.out_value = data.out;
        this.transactions=[
          { item: "In", cost: data.in },
          { item: "Out", cost: data.out },
          { item: "Total", cost: (data.out - data.in) }
        ];
      });
  }
}
