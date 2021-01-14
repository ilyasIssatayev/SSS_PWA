import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserChangeInfoComponent } from './user-change-info.component';

describe('UserChangeInfoComponent', () => {
  let component: UserChangeInfoComponent;
  let fixture: ComponentFixture<UserChangeInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserChangeInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserChangeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
