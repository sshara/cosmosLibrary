import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/session/login/login.component';
import { RecoverPasswordComponent } from './components/session/recover-password/recover-password.component';
import { SignupComponent } from './components/session/signup/signup.component';
import { NavigationGuard } from './services/system/navigation.guard';

const routes: Routes = [
  {path: 'login', canActivate:[NavigationGuard], component:LoginComponent},
  {path: 'signup', canActivate:[NavigationGuard], component:SignupComponent},
  {path: 'recover-password', canActivate:[NavigationGuard], component:RecoverPasswordComponent},

  {path: '**', pathMatch: 'full', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
