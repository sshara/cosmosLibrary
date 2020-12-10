import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefoundsComponent } from './refounds.component';

describe('RefoundsComponent', () => {
  let component: RefoundsComponent;
  let fixture: ComponentFixture<RefoundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefoundsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefoundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
