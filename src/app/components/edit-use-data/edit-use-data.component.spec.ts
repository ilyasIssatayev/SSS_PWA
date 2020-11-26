import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUseDataComponent } from './edit-use-data.component';

describe('EditUseDataComponent', () => {
  let component: EditUseDataComponent;
  let fixture: ComponentFixture<EditUseDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditUseDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUseDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
