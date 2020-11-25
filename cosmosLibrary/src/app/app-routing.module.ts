import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddBookComponent } from './components/admin/books/add-book/add-book.component';
import { MainAdminComponent } from './components/admin/main-admin/main-admin.component';
import { LoginComponent } from './components/session/login/login.component';
import { RecoverPasswordComponent } from './components/session/recover-password/recover-password.component';
import { SignupComponent } from './components/session/signup/signup.component';
import { NavigationGuard } from './services/system/navigation.guard';
import { ManageAdminComponent } from './components/root/administrators/manage-admin/manage-admin.component';

const routes: Routes = [
  {path: 'login', canActivate:[NavigationGuard], component:LoginComponent},
  {path: 'signup', canActivate:[NavigationGuard], component:SignupComponent},
  {path: 'recover-password', canActivate:[NavigationGuard], component:RecoverPasswordComponent},
  {path: 'main-admin', canActivate:[NavigationGuard], component:MainAdminComponent},
  {path: 'add-book', canActivate:[NavigationGuard], component:AddBookComponent},
  {path: 'manage-admin', canActivate:[NavigationGuard], component:ManageAdminComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
