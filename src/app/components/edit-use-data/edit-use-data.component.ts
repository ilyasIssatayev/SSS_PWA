import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-use-data',
  templateUrl: './edit-use-data.component.html',
  styleUrls: ['./edit-use-data.component.scss']
})
export class EditUseDataComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  name;

  updateName(event)
  {

  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  onCancel(){

  }
  onApply(){

  }
}
