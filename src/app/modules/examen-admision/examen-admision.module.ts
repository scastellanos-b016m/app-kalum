import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { ExamenAdmisionComponent } from './components/examen-admision/examen-admision.component';



@NgModule({
  declarations: [
    ExamenAdmisionComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule
  ]
})
export class ExamenAdmisionModule { }
