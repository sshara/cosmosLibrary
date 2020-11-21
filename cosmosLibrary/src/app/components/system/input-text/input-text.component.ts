import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss']
})
export class InputTextComponent implements OnInit {

  @Input() headerText: string;
  @Input() inputType: string = 'text';
  @Input() control: FormControl;

  constructor() { }

  ngOnInit(): void {
  }

  showError(){
    const {touched, dirty, errors} = this.control;
    return touched && dirty && errors;
  }

}
