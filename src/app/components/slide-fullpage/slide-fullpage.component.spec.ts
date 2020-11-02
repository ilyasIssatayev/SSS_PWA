import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideFullpageComponent } from './slide-fullpage.component';

describe('SlideFullpageComponent', () => {
  let component: SlideFullpageComponent;
  let fixture: ComponentFixture<SlideFullpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlideFullpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideFullpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
