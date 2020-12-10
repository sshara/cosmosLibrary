import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { GeneralService } from 'src/app/services/system/general.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {

  updateForm = new FormGroup({
    title: new FormControl('', [Validators.minLength(1), Validators.maxLength(50)]),
    author: new FormControl('', [Validators.minLength(1), Validators.maxLength(50)]),
    publish_year: new FormControl(''),
    topic: new FormControl(''),
    pages_number: new FormControl(''),
    editorial: new FormControl('', [Validators.minLength(1), Validators.maxLength(30)]),
    language: new FormControl(''),
    front_image: new FormControl(''),
    back_image: new FormControl(''),
    status: new FormControl(''),
    on_news: new FormControl(false),
    price: new FormControl('',[Validators.required]),
    available_units: new FormControl('',[Validators.required]),
  })

  public optionsTopic:any[];
  public optionsLanguage:any[];
  public optionsStatus:string[];

  constructor(
    private _generalService:GeneralService,
    private _adminService:AdminService
  ) { 
    this.optionsTopic = [{id: 'RMC', name: 'Romance'}, { id: 'REA', name: 'Realismo'}, 
    { id: 'SUR', name: 'Surrealismo'}, { id: 'RMA', name: 'Realismo Mágico'}, 
    { id: 'CMD', name: 'Comedia'}, { id: 'DRM', name: 'Drama'}, { id: 'TER', name: 'Terror'}, 
    { id: 'SUS', name: 'Suspenso'}, { id: 'TRA', name: 'Tragedia'}, { id: 'CFC', name: 'Ciencia Ficción'}, 
    { id: 'FAN', name: 'Fantasía'}, { id: 'MIS', name: 'Misterio', { id: 'NVL', name: 'Novela'} ];
    this.optionsLanguage = [{id: 'EN', name: 'English'}, { id: 'ES', name: 'Español'}, 
    { id: 'FR', name: 'Française'}, { id: 'DE', name: 'Deutsche'}, { id: 'PT', name: 'Português'}, { id: 'JP', name: '中文'} ]
    this.optionsStatus = ['Nuevo', 'Usado'];
  }

  ngOnInit(): void {
    this.getBookData();
  }

  getBookData(){
    let subsciption = this._adminService.getBookData().subscribe(book => {
      console.log(book);
      this.updateForm.setValue(this._generalService.assertInfo(book, this.updateForm));
      subsciption.unsubscribe();
    })
  }

  updateBook(){
    this._adminService.updateBook(this.updateForm.value);
  }

  goTo(route:string){
    this._generalService.goTo(route);
  }

  logOut(){
    this._generalService.clearLocaleData();
  }

}