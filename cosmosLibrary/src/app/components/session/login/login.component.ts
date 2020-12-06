import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GeneralService } from 'src/app/services/system/general.service';
import { SessionService } from 'src/app/services/session.service';
import { GeneralSnackBarComponent } from '../../system/general-snack-bar/general-snack-bar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25), Validators.pattern(/^([^\.\#\$\,\[\]])+$/)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  constructor(
    private _generalService:GeneralService,
    private _sessionService:SessionService
  ) { }

  ngOnInit(): void {
  }

  login(){
    let {username, password} = this.loginForm.value;
    let subscription = this._sessionService.logIn(username).subscribe(user =>{
      if(!user){
        let message = 'El usuario no existe';
        this._generalService.openSnackBar({message});
        subscription.unsubscribe();
        return;
      }
      if(password === user.password){
        let identity = {username:user.username, role:user.role};
        this._generalService.saveInfo('identity', identity);
        console.log(this._generalService.loadInfo('identity'))
        if(user.role === 'admin'){
          if(user.email){
            this.goTo('home');
          }else{
            this.goTo('update-admin');
          }
        }
        else{
          this.goTo('home');
        }
      }
      else{
        let message = 'Contraseña Inválida';
        this._generalService.openSnackBar({message});
      }
      subscription.unsubscribe();
    });
  }

  goTo(route:string){
    this._generalService.goTo(route);
  }

}
