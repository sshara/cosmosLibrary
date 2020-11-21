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
    username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
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
      console.log(user);
      if(!user){
        let message = 'El usuario no existe';
        this._generalService.openSnackBar({message});
        subscription.unsubscribe();
        return;
      }
      if(password === user.password){
        console.log(user.role);
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
