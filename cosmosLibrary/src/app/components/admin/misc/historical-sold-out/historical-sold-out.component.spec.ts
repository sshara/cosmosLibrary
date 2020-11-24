import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalSoldOutComponent } from './historical-sold-out.component';

describe('HistoricalSoldOutComponent', () => {
  let component: HistoricalSoldOutComponent;
  let fixture: ComponentFixture<HistoricalSoldOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricalSoldOutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricalSoldOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
