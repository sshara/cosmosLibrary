import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from 'src/app/services/system/general.service';
import { PasswordMatchVaildator } from 'src/app/validators/password-match.validator';

@Component({
  selector: 'app-change-admin-password',
  templateUrl: './change-admin-password.component.html',
  styleUrls: ['./change-admin-password.component.scss']
})
export class ChangeAdminPasswordComponent implements OnInit {

  countryOptions: any[];
  stateOptions: any[];
  cityOptions: any[];
  genderOptions: any[];
  topicOptions: any[];

  changeAdminForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
    lastname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
    birthdate: new FormControl('', [Validators.required]),
    country: new FormControl('',[Validators.required]),
    state: new FormControl('',[Validators.required]),
    city: new FormControl('',[Validators.required]),
    gender: new FormControl('',[Validators.required]),
    email: new FormControl('', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
    topic: new FormControl('',[Validators.required]),
    username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
    oldPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmationPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
  }, {validators: this._passwordMatchValidator.validate})

  constructor(
    private _generalService:GeneralService,
    private _passwordMatchValidator: PasswordMatchVaildator
  ){ 
    this.countryOptions = [];
    this.stateOptions = [];
    this.cityOptions = [];
    this.genderOptions = [];
    this.topicOptions = [{id: 'literatura', name: 'literatura'}, { id: 'ES', name: 'español'}, { id: 'FR', name: 'francaise'} ];
  }

  ngOnInit(): void {
  }

  changeAdmin(){

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
}
