import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GeneralService } from 'src/app/services/system/general.service';
import { PasswordMatchVaildator } from 'src/app/validators/password-match.validator';
import { SessionService } from 'src/app/services/session.service';

import countries from 'src/assets/json/countries.json';
import states from 'src/assets/json/states.json';
import cities from 'src/assets/json/cities.json';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit , OnDestroy {

  dniOptions: any[];
  countryOptions:any[];
  stateOptions: any[];
  cityOptions: any[];
  genderOptions: any[];
  topicOptions: any[];

  signupForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
    lastname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
    dni_type: new FormControl('',[Validators.required]),
    dni: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
    birthdate: new FormControl('', [Validators.required]),
    country: new FormControl('',[Validators.required]),
    state: new FormControl('',[Validators.required]),
    city: new FormControl('',[Validators.required]),
    gender: new FormControl('',[Validators.required]),
    email: new FormControl('', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
    topic: new FormControl('',[Validators.required]),
    username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25), Validators.pattern(/^([^\.\#\$\,\[\]])+$/)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmationPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
  }, {validators: this._passwordMatchValidator.validate})

  private _subscriptorCountry:any;
  private _subscriptorState:any;

  constructor(
    private _generalService:GeneralService,
    private _passwordMatchValidator: PasswordMatchVaildator,
    private _sessionService: SessionService
  ) 
  {
    this.dniOptions = [{id:'CC', name:'Cédula de Ciudadania'}, {id:'PA', name:'Pasaporte'}, {id:'TI', name:'Tarjeta de Identidad'}, {id:'RC', name:'Registro Civil'}, {id:'CE', name:'Cédula de Extranjeria'}];
    this.genderOptions = [{id:'F', name:'Femenino'}, {id:'M', name:'Masculino'}, {id:'O', name:'Otro'}];

    this.topicOptions = [{id: 'literatura', name: 'literatura'}, { id: 'ES', name: 'español'}, { id: 'FR', name: 'francaise'} ];

    this.countryOptions = countries.countries;

    let observableCountry = this.signupForm.get('country').valueChanges;
    this._subscriptorCountry = observableCountry.subscribe(countryCode => {
      this.stateOptions = states.states.filter(state => state.id_country == countryCode);
    })

    let observableState = this.signupForm.get('state').valueChanges;
    this._subscriptorState = observableState.subscribe(stateCode => {
      this.cityOptions = cities.cities.filter(city => city.id_state == stateCode);
    })
  }

  ngOnInit(): void {
  }

  signUp(){
    this._sessionService.signUp(this.signupForm.value);
  }

  isFormError(){
    const {errors} = this.signupForm;
    const passwordTouched = this.signupForm.get('password').touched;
    const confirmPasswordTouched = this.signupForm.get('confirmationPassword').touched;
    return errors && passwordTouched && confirmPasswordTouched;
  }

  ngOnDestroy(){
    this._subscriptorCountry.unsubscribe();
    this._subscriptorState.unsubscribe();
  }

}
