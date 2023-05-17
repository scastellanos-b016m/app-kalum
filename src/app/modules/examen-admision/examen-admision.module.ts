import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExamenAdmisionComponent } from './components/examen-admision/examen-admision.component';
import { FormExamenAdmisionComponent } from './components/examen-admision/form-examen-admision.component';



@NgModule({
  declarations: [
    ExamenAdmisionComponent,
    FormExamenAdmisionComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ExamenAdmisionModule { }
