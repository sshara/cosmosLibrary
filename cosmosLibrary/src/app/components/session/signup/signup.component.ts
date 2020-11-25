import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GeneralService } from 'src/app/services/system/general.service';
import { PasswordMatchVaildator } from 'src/app/validators/password-match.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  dniOptions: any[];
  countryOptions: any[];
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
    username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmationPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
  }, {validators: this._passwordMatchValidator.validate})


  constructor(private _generalService:GeneralService,
              private _passwordMatchValidator: PasswordMatchVaildator
              ) 
              {
                this.dniOptions = [];
                this.countryOptions = [];
                this.stateOptions = [];
                this.cityOptions = [];
                this.genderOptions = [];
                this.topicOptions = [{id: 'literatura', name: 'literatura'}, { id: 'ES', name: 'español'}, { id: 'FR', name: 'francaise'} ];
               }

  ngOnInit(): void {
  }

  signUp(){}

  isFormError(){
    const {errors} = this.signupForm;
    const passwordTouched = this.signupForm.get('password').touched;
    const confirmPasswordTouched = this.signupForm.get('confirmationPassword').touched;
    return errors && passwordTouched && confirmPasswordTouched;
  }

}
