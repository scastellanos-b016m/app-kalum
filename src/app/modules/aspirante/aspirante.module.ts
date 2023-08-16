import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormRegisterAspiranteComponent } from './components/form-register-aspirante.component';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AspiranteComponent } from './components/aspirante.component';


@NgModule({
  declarations: [
    FormRegisterAspiranteComponent,
    AspiranteComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AspiranteModule { }
