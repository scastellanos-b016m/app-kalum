import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormRegisterAlumnoComponent } from './components/form-register-alumno.component';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormRegisterComponent } from '../login/components/form-register.component';
import { FormUpdateIdentificationIdComponent } from '../login/components/form-update-identification-id.component';
import { SharedModule } from '../shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [
    FormRegisterAlumnoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule
  ]
})
export class AlumnoModule { }
