import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/Button'; 
import {MatIconModule} from '@angular/material/Icon';
import {MatTabsModule} from '@angular/material/Tabs';
import {MatExpansionModule} from '@angular/material/Expansion';
import {MatDialogModule} from '@angular/material/Dialog';
import {MatGridListModule} from '@angular/material/Grid-List';
import {MatCheckboxModule} from '@angular/material/Checkbox';
import {MatCardModule} from '@angular/material/Card';
import {MatTableModule} from '@angular/material/Table';
import {MatMenuModule} from '@angular/material/Menu';
import {MatSnackBarModule} from '@angular/material/Snack-Bar';
import {MatDividerModule} from '@angular/material/Divider';
import {MatToolbarModule} from '@angular/material/Toolbar'; 
import {MatSidenavModule} from '@angular/material/Sidenav'; 
import {MatListModule} from '@angular/material/List';
import {MatButtonToggleModule} from '@angular/material/Button-Toggle';
import {MatSortModule} from '@angular/material/Sort';
import {MatBadgeModule} from '@angular/material/Badge';
import {MatProgressSpinnerModule} from '@angular/material/Progress-Spinner';
import {MatChipsModule} from '@angular/material/Chips';
import {MatTooltipModule} from '@angular/material/Tooltip';
import {MatSlideToggleModule} from '@angular/material/Slide-Toggle';
import {MatStepperModule} from '@angular/material/Stepper';
import {MatProgressBarModule} from '@angular/material/Progress-Bar';
import {MatRadioModule} from '@angular/material/Radio';
import {MatSliderModule} from '@angular/material/slider';


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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    RecoverPasswordComponent,
    InputTextComponent,
    InputImageComponent,
    InputDateComponent,
    InputSelectComponent
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
    MatGridListModule,
    MatCheckboxModule,
    MatCardModule,
    MatTableModule,
    MatMenuModule,
    MatSnackBarModule,
    MatDividerModule,
    MatToolbarModule, 
    MatSidenavModule, 
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
    MatProgressBarModule,
    FormsModule, 
    ReactiveFormsModule,
    MatRadioModule,
    MatSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
