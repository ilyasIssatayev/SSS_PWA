import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingListPageComponent } from './ranking-list-page.component';

describe('RankingListPageComponent', () => {
  let component: RankingListPageComponent;
  let fixture: ComponentFixture<RankingListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RankingListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RankingListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
