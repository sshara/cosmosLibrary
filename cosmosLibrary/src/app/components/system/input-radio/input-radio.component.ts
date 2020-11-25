import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-radio',
  templateUrl: './input-radio.component.html',
  styleUrls: ['./input-radio.component.scss']
})
export class InputRadioComponent implements OnInit {

  @Input() headerText: string;
  @Input() control: FormControl;
  @Input() options: string[];

  constructor() { }

  ngOnInit(): void {
  }

}
