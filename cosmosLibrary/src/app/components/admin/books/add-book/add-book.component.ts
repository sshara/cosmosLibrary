import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';

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
    back_image: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    on_news: new FormControl(false),
  })

  public optionsTopic:any[];
  public optionsLanguage:any[];
  public optionsStatus:string[];

  constructor(
    private _adminService:AdminService
  ) { 
    this.optionsTopic = [{id: 'RMC', name: 'Romance'}, { id: 'REA', name: 'Realismo'}, 
    { id: 'SUR', name: 'Surrealismo'}, { id: 'RMA', name: 'Realismo Mágico'}, 
    { id: 'CMD', name: 'Comedia'}, { id: 'DRM', name: 'Drama'}, { id: 'TER', name: 'Terror'}, 
    { id: 'SUS', name: 'Suspenso'}, { id: 'TRA', name: 'Tragedia'}, { id: 'CFC', name: 'Ciencia Ficción'}, 
    { id: 'FAN', name: 'Fantasía'}, { id: 'MIS', name: 'Misterio'} ];
    this.optionsLanguage = [{id: 'EN', name: 'English'}, { id: 'ES', name: 'Español'}, 
    { id: 'FR', name: 'Française'}, { id: 'DE', name: 'Deutsche'}, { id: 'PT', name: 'Português'}, { id: 'JP', name: '中文'} ]
    this.optionsStatus = ['Nuevo', 'Usado'];
  }

  ngOnInit(): void {
  }

  createBook(){
    this._adminService.createBook(this.createForm.value);
  }

}
