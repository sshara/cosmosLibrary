import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralSnackBarComponent } from './general-snack-bar.component';

describe('GeneralSnackBarComponent', () => {
  let component: GeneralSnackBarComponent;
  let fixture: ComponentFixture<GeneralSnackBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralSnackBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralSnackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
