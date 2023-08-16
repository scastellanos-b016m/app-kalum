import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormLoginComponent } from './components/form-login.component';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormRegisterComponent } from './components/form-register.component';
import { FormUpdateIdentificationIdComponent } from './components/form-update-identification-id.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    FormLoginComponent,
    FormRegisterComponent,
    FormUpdateIdentificationIdComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LoginModule { }
