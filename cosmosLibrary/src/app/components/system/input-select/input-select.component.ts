import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

interface Option {
  id: number;
  name: string;
}

@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss']
})
export class InputSelectComponent implements OnInit {

  @Input() headerText: string;
  @Input() control: FormControl;
  @Input() options: Option[];

  constructor() {
  }

  ngOnInit(): void {
  }

}