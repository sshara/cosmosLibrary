import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {

  updateForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
    author: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
    publish_year: new FormControl('', [Validators.required]),
    topic: new FormControl('',[Validators.required]),
    pages_number: new FormControl('',[Validators.required]),
    editorial: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]),
    language: new FormControl('', [Validators.required]),
    isbn: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
    front_image: new FormControl('', [Validators.required]),
    back_image: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    on_news: new FormControl(false),
  })

  public optionsTopic:any[];
  public optionsLanguage:any[];
  public optionsStatus:string[];

  constructor() { 
    this.optionsTopic = [{id: 'literatura', name: 'literatura'}, { id: 'ES', name: 'español'}, { id: 'FR', name: 'francaise'} ]
    this.optionsLanguage = [{id: 0, name: 'english'}, { id: 1, name: 'español'}, { id: 2, name: 'francaise'} ]
    this.optionsStatus = ['Nuevo', 'Usado'];
  }

  ngOnInit(): void {
  }

  updateBook(){
    console.log(this.updateForm.value , this.updateForm.get('on_news').value)
    if(this.updateForm.get('on_news').value){
      console.log('published en news');
    }
  }

}