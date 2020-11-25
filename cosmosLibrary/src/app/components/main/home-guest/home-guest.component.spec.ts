import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeGuestComponent } from './home-guest.component';

describe('HomeGuestComponent', () => {
  let component: HomeGuestComponent;
  let fixture: ComponentFixture<HomeGuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeGuestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
