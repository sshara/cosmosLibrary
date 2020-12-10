import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordMatchVaildator } from 'src/app/validators/password-match.validator';
import { RootService } from 'src/app/services/root.service';
import { GeneralService } from 'src/app/services/system/general.service';

@Component({
  selector: 'app-manage-admin',
  templateUrl: './manage-admin.component.html',
  styleUrls: ['./manage-admin.component.scss']
})
export class ManageAdminComponent implements OnInit, OnDestroy{

  manageForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern(/^([^\.\#\$\,\[\]])+$/)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
    confirmationPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
  }, {validators: this._passwordMatchValidator.validate})

  public admins:any[];
  private subscription: any;

  constructor(
    private _passwordMatchValidator: PasswordMatchVaildator,
    private _rootService:RootService,
    private _generalService:GeneralService
  ) { }

  ngOnInit(): void {
    this.getAdmins();
  }

  createAdmin(){
    this._rootService.createUserAdmin(this.manageForm.value);
  }
  
  isFormError(){
    const {errors} = this.manageForm;
    const passwordTouched = this.manageForm.get('password').touched;
    const confirmPasswordTouched = this.manageForm.get('confirmationPassword').touched;
    return errors && passwordTouched && confirmPasswordTouched;
  }

  logOut(){
    this._generalService.clearLocaleData();
  }

  getAdmins(){
    this.subscription = this._rootService.getAdmins().subscribe(admins => {
      this.admins = admins;
    })
  }

  updateStatus(admin:any){
    admin.enabled= !admin.enabled;
    this._rootService.updateStatusAdmin(admin);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
