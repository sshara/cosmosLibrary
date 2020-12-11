import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GeneralService } from 'src/app/services/system/general.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.scss']
})
export class InputDateComponent implements OnInit, OnDestroy {

  @Input() headerText: string;
  @Input() control: FormControl;
  @Input() years: number;
  
  public dateError:boolean;
  private _subscription:Subscription;

  constructor(
    private _generalService:GeneralService
  ) { 
    this.years = 0;
  }

  ngOnInit(): void {
    this._subscription = this.control.valueChanges.subscribe(value =>{
      this.dateError = ! this._generalService.dateYearsBefore(this.years, value);
      if (this.dateError) this.control.setErrors({invalid:true});
      else this.control.setErrors(null);
    })
  }

  showError(){
    const {touched, dirty, errors} = this.control;
    return touched && this.dateError;
  }

  ngOnDestroy(){
    this._subscription.unsubscribe();
  }

}
