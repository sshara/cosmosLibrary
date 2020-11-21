import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GeneralService } from 'src/app/services/system/general.service';
import { SessionService } from 'src/app/services/session.service';

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
    console.log(this.loginForm.value);
    let {username, password} = this.loginForm.value;
    let subscription = this._sessionService.login(username).subscribe(user =>{
      console.log(user);
      if(!user){
        console.log('El usuario no existe');
        subscription.unsubscribe();
        return;
      }
      if(password === user.password){
        console.log('success');
      }
      else{
        console.log('Contraseña Inválida');
      }
      subscription.unsubscribe();
    });
  }

  goTo(route:string){
    this._generalService.goTo(route);
  }

}
