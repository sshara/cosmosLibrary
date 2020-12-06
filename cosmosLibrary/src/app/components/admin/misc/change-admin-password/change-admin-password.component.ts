import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from 'src/app/services/system/general.service';
import { PasswordMatchVaildator } from 'src/app/validators/password-match.validator';

import countries from 'src/assets/json/countries.json';
import states from 'src/assets/json/states.json';
import cities from 'src/assets/json/cities.json';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-change-admin-password',
  templateUrl: './change-admin-password.component.html',
  styleUrls: ['./change-admin-password.component.scss']
})
export class ChangeAdminPasswordComponent implements OnInit , OnDestroy {

  dniOptions: any[];
  countryOptions: any[];
  stateOptions: any[];
  cityOptions: any[];
  genderOptions: any[];
  topicOptions: any[];

  changeAdminForm = new FormGroup({
    name: new FormControl('', [Validators.minLength(3), Validators.maxLength(25)]),
    lastname: new FormControl('', [Validators.minLength(3), Validators.maxLength(25)]),
    dni_type: new FormControl('',[Validators.required]),
    dni: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
    birthdate: new FormControl('', [Validators.required]),
    country: new FormControl(''),
    state: new FormControl(''),
    city: new FormControl(''),
    gender: new FormControl(''),
    email: new FormControl('', [Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
    topic: new FormControl(''),
    oldPassword: new FormControl('', [Validators.minLength(8)]),
    password: new FormControl('', [Validators.minLength(8)]),
    confirmationPassword: new FormControl('', [Validators.minLength(8)])
  }, {validators: this._passwordMatchValidator.validate})
  
  private _subscriptorCountry:any;
  private _subscriptorState:any;

  constructor(
    private _generalService:GeneralService,
    private _adminService:AdminService,
    private _passwordMatchValidator: PasswordMatchVaildator
  ){ 
    this.countryOptions = [];
    this.stateOptions = [];
    this.cityOptions = [];
    this.dniOptions = [{id:'CC', name:'Cédula de Ciudadania'}, {id:'PA', name:'Pasaporte'}, {id:'TI', name:'Tarjeta de Identidad'}, {id:'RC', name:'Registro Civil'}, {id:'CE', name:'Cédula de Extranjeria'}];
    this.genderOptions = [{id:'F', name:'Femenino'}, {id:'M', name:'Masculino'}, {id:'O', name:'Otro'}];
    this.topicOptions = [{id: 'RMC', name: 'Romance'}, { id: 'REA', name: 'Realismo'}, 
    { id: 'SUR', name: 'Surrealismo'}, { id: 'RMA', name: 'Realismo Mágico'}, 
    { id: 'CMD', name: 'Comedia'}, { id: 'DRM', name: 'Drama'}, { id: 'TER', name: 'Terror'}, 
    { id: 'SUS', name: 'Suspenso'}, { id: 'TRA', name: 'Tragedia'}, { id: 'CFC', name: 'Ciencia Ficción'}, 
    { id: 'FAN', name: 'Fantasía'}, { id: 'MIS', name: 'Misterio'} ];

    this.countryOptions = countries.countries;

    let observableCountry = this.changeAdminForm.get('country').valueChanges;
    this._subscriptorCountry = observableCountry.subscribe(countryCode => {
      this.stateOptions = states.states.filter(state => state.id_country == countryCode);
    })

    let observableState = this.changeAdminForm.get('state').valueChanges;
    this._subscriptorState = observableState.subscribe(stateCode => {
      this.cityOptions = cities.cities.filter(city => city.id_state == stateCode);
    })
  }

  ngOnInit(): void {
    this.getAdminData();
  }

  getAdminData(){
    let subsciption = this._adminService.getAdminData().subscribe(user => {
      console.log(user);
      this.changeAdminForm.setValue(this._generalService.assertInfo(user, this.changeAdminForm));
      subsciption.unsubscribe();
    })
  }

  changeAdmin(){
    this._adminService.updateAdminData(this.changeAdminForm.value);
  }

  goTo(route:string){
    this._generalService.goTo(route);
  }

  isFormError(){
    const {errors} = this.changeAdminForm;
    const passwordTouched = this.changeAdminForm.get('password').touched;
    const confirmPasswordTouched = this.changeAdminForm.get('confirmationPassword').touched;
    return errors && passwordTouched && confirmPasswordTouched;
  }

  ngOnDestroy(){
    this._subscriptorCountry.unsubscribe();
    this._subscriptorState.unsubscribe();
  }

  logOut(){
    this._generalService.clearLocaleData();
  }
}
