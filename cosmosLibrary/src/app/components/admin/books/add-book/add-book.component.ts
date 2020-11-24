import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {

  createForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
    author: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
    publish_year: new FormControl('', [Validators.required]),
    topic: new FormControl('',[Validators.required]),
    pages_number: new FormControl('',[Validators.required]),
    editorial: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]),
    language: new FormControl('', [Validators.required]),
    isbn: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
    front_image: new FormControl('', [Validators.required]),
    back_image: new FormControl('', [Validators.required])
  })

  public optionsTopic:any[];
  public optionsLanguage:any[];

  constructor() { 
    this.optionsTopic = [{id: 'english', name: 'english'}, { id: 'ES', name: 'español'}, { id: 'FR', name: 'francaise'} ]
    this.optionsLanguage = [{id: 0, name: 'english'}, { id: 1, name: 'español'}, { id: 2, name: 'francaise'} ]
  }

  ngOnInit(): void {
  }

  createBook(){
  }

}
