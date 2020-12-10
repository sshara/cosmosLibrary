import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddBookComponent } from './components/admin/books/add-book/add-book.component';
import { DeleteBookComponent } from './components/admin/books/delete-book/delete-book.component';
import { EditBookComponent } from './components/admin/books/edit-book/edit-book.component';
import { ManageBookComponent } from './components/admin/books/manage-book/manage-book.component';
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
import { ShoppingCartComponent } from './components/client/shopping-cart/shopping-cart.component';
import { HistoryComponent } from './components/client/history/history.component';
import { RefoundsComponent } from './components/admin/misc/refounds/refounds.component';
import { PocketComponent } from './components/client/pocket/pocket.component';

const routes: Routes = [

  //guest routes
  {path: 'login', canActivate:[NavigationGuard], component:LoginComponent},
  {path: 'signup', canActivate:[NavigationGuard], component:SignupComponent},
  {path: 'recover-password', canActivate:[NavigationGuard], component:RecoverPasswordComponent},
  {path: 'home', canActivate:[NavigationGuard], component:HomeGuestComponent},

  //root routes
  {path: 'manage-admin', canActivate:[NavigationGuard], component:ManageAdminComponent},

  //admin routes
  {path: 'add-book', canActivate:[NavigationGuard], component:AddBookComponent},
  {path: 'edit-book', canActivate:[NavigationGuard], component:EditBookComponent},
  {path: 'manage-books', canActivate:[NavigationGuard], component:ManageBookComponent},
  {path: 'update-admin', canActivate:[NavigationGuard], component:ChangeAdminPasswordComponent},
  {path: 'sold-out', canActivate:[NavigationGuard], component:HistoricalSoldOutComponent},
  {path: 'refound-request', canActivate:[NavigationGuard], component:RefoundsComponent},

  //client routes
  {path: 'profile-client', canActivate:[NavigationGuard], component:ProfileComponent},
  {path: 'home-client', canActivate:[NavigationGuard], component:HomeComponent},
  {path: 'shopping-cart', canActivate:[NavigationGuard], component:ShoppingCartComponent},
  {path: 'history-client', canActivate:[NavigationGuard], component:HistoryComponent},
  {path: 'pocket-client', canActivate:[NavigationGuard], component:PocketComponent},
  
  {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
