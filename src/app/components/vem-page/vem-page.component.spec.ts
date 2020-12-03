import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VEMPageComponent } from './vem-page.component';

describe('VEMPageComponent', () => {
  let component: VEMPageComponent;
  let fixture: ComponentFixture<VEMPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VEMPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VEMPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
