import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultadoExamenAdmisionComponent } from './components/resultado-examen-admision/resultado-examen-admision.component';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormresultadoExamenAdmisionComponent } from './components/resultado-examen-admision/formresultado-examen-admision.component';
import { ResultadoExamenAdmisionNoexpedienteComponent } from './components/resultado-examen-admision-noexpediente/resultado-examen-admision-noexpediente.component';



@NgModule({
  declarations: [
    ResultadoExamenAdmisionComponent,
    FormresultadoExamenAdmisionComponent,
    ResultadoExamenAdmisionNoexpedienteComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ResultadoExamenAdmisionModule { }
