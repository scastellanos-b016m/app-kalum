import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CuentasCobrarComponent } from './components/cuentas-cobrar/cuentas-cobrar.component';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CuentasCobrarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CuentasCobrarModule { }
