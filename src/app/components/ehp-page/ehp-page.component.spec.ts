import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EhpPageComponent } from './ehp-page.component';

describe('EhpPageComponent', () => {
  let component: EhpPageComponent;
  let fixture: ComponentFixture<EhpPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EhpPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EhpPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
