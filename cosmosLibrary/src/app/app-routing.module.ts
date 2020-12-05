import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddBookComponent } from './components/admin/books/add-book/add-book.component';
import { DeleteBookComponent } from './components/admin/books/delete-book/delete-book.component';
import { EditBookComponent } from './components/admin/books/edit-book/edit-book.component';
import { ManageBookComponent } from './components/admin/books/manage-book/manage-book.component';
import { MainAdminComponent } from './components/admin/main-admin/main-admin.component';
import { ChangeAdminPasswordComponent } from './components/admin/misc/change-admin-password/change-admin-password.component';
import { HistoricalSoldOutComponent } from './components/admin/misc/historical-sold-out/historical-sold-out.component';
import { LoginComponent } from './components/session/login/login.component';
import { RecoverPasswordComponent } from './components/session/recover-password/recover-password.component';
import { SignupComponent } from './components/session/signup/signup.component';
import { NavigationGuard } from './services/system/navigation.guard';
import { ManageAdminComponent } from './components/root/administrators/manage-admin/manage-admin.component';
import { ProfileComponent } from './components/client/profile/profile.component';
import { HomeComponent } from './components/main/home/home.component';
import { HomeGuestComponent } from './components/main/home-guest/home-guest.component';

const routes: Routes = [
  {path: 'login', canActivate:[NavigationGuard], component:LoginComponent},
  {path: 'signup', canActivate:[NavigationGuard], component:SignupComponent},
  {path: 'recover-password', canActivate:[NavigationGuard], component:RecoverPasswordComponent},
  {path: 'main-admin', canActivate:[NavigationGuard], component:MainAdminComponent},
  {path: 'add-book', canActivate:[NavigationGuard], component:AddBookComponent},
  {path: 'manage-admin', canActivate:[NavigationGuard], component:ManageAdminComponent},
  {path: 'edit-book', canActivate:[NavigationGuard], component:EditBookComponent},
  {path: 'manage-books', canActivate:[NavigationGuard], component:ManageBookComponent},
  {path: 'historical-sold-out', canActivate:[NavigationGuard], component:HistoricalSoldOutComponent},
  {path: 'update-admin', canActivate:[NavigationGuard], component:ChangeAdminPasswordComponent},
  {path: 'profile-client', canActivate:[NavigationGuard], component:ProfileComponent},
  {path: 'home-client', canActivate:[NavigationGuard], component:HomeComponent},
  {path: 'home-guest', canActivate:[NavigationGuard], component:HomeGuestComponent},

  {path: '**', pathMatch: 'full', redirectTo: 'home-guest'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
