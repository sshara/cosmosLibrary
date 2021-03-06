import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button'; 
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDividerModule} from '@angular/material/divider'; 
import {MatListModule} from '@angular/material/list';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSortModule} from '@angular/material/sort';
import {MatBadgeModule} from '@angular/material/badge';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatChipsModule} from '@angular/material/chips';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatStepperModule} from '@angular/material/stepper';
import {MatRadioModule} from '@angular/material/radio';
import {MatSliderModule} from '@angular/material/slider';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';

import { FilterByPipe } from './pipes/filter-by.pipe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/session/login/login.component';
import { SignupComponent } from './components/session/signup/signup.component';
import { RecoverPasswordComponent } from './components/session/recover-password/recover-password.component';
import { InputTextComponent } from './components/system/input-text/input-text.component';
import { InputImageComponent } from './components/system/input-image/input-image.component';
import { InputDateComponent } from './components/system/input-date/input-date.component';
import { InputSelectComponent } from './components/system/input-select/input-select.component';
import { environment } from '../environments/environment';
import { HeaderComponent } from './components/system/header/header.component';
import { GeneralSnackBarComponent } from './components/system/general-snack-bar/general-snack-bar.component';
import { HomeComponent } from './components/main/home/home.component';
import { ProfileComponent } from './components/client/profile/profile.component';
import { ShoppingCartComponent } from './components/client/shopping-cart/shopping-cart.component';
import { AddBookComponent } from './components/admin/books/add-book/add-book.component';
import { ManageBookComponent } from './components/admin/books/manage-book/manage-book.component';
import { EditBookComponent } from './components/admin/books/edit-book/edit-book.component';
import { DeleteBookComponent } from './components/admin/books/delete-book/delete-book.component';
import { ChangeAdminPasswordComponent } from './components/admin/misc/change-admin-password/change-admin-password.component';
import { HistoricalSoldOutComponent } from './components/admin/misc/historical-sold-out/historical-sold-out.component';
import { ManageAdminComponent } from './components/root/administrators/manage-admin/manage-admin.component';
import { InputRadioComponent } from './components/system/input-radio/input-radio.component';
import { HomeGuestComponent } from './components/main/home-guest/home-guest.component';
import { HistoryComponent } from './components/client/history/history.component';
import { RefoundsComponent } from './components/admin/misc/refounds/refounds.component';
import { PocketComponent } from './components/client/pocket/pocket.component';
import { CartComponent } from './components/system/cart/cart.component';
import { RequestsComponent } from './components/system/requests/requests.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    RecoverPasswordComponent,
    InputTextComponent,
    InputImageComponent,
    InputDateComponent,
    InputSelectComponent,
    HeaderComponent,
    GeneralSnackBarComponent,
    HomeComponent,
    GeneralSnackBarComponent,
    ProfileComponent,
    ShoppingCartComponent,
    AddBookComponent,
    ManageBookComponent,
    EditBookComponent,
    DeleteBookComponent,
    ChangeAdminPasswordComponent,
    HistoricalSoldOutComponent,
    ManageAdminComponent,
    InputRadioComponent,
    HomeGuestComponent,
    FilterByPipe,
    HistoryComponent,
    RefoundsComponent,
    PocketComponent,
    CartComponent,
    RequestsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule, 
    MatButtonModule, 
    MatIconModule,
    MatTabsModule,
    MatExpansionModule,
    MatDialogModule,
    MatCheckboxModule,
    MatTableModule,
    MatMenuModule,
    MatSnackBarModule,
    MatDividerModule,  
    MatListModule,
    MatButtonToggleModule,
    MatSortModule,
    MatSelectModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatStepperModule,
    FormsModule, 
    ReactiveFormsModule,
    MatRadioModule,
    MatSliderModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
