import { Component, OnInit } from "@angular/core";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";

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
  vegetables: GraphStatus[] = [
    { name: "Today" },
    { name: "Week" },
    { name: "Month" }
  ];

  displayedColumns: string[] = ["item", "cost"];

  transactions: Transaction[] = [
    { item: "In", cost: 41 },
    { item: "Out", cost: 10 },
    { item: "Current Balance", cost: 20 },
    { item: "Available Balance", cost: 400 },
  ];

  drop(event: CdkDragDrop<GraphStatus[]>) {
    moveItemInArray(this.vegetables, event.previousIndex, event.currentIndex);
  }

  ngOnInit() {}

  /** Gets the total cost of all transactions. */
  getTotalCost() {
    return "";
  }
}
