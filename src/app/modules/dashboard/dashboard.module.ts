import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './pages/dashboard.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CarreraTecnicaModule } from '../carrera-tecnica/carrera-tecnica.module';
import { JornadaModule } from '../jornada/jornada.module';
import { ExamenAdmisionModule } from '../examen-admision/examen-admision.module';
import { LoginModule } from '../login/login.module';
import { UsuarioModule } from '../usuario/usuario.module';
import { MaterialModule } from '../shared/material.module';
import { AspiranteModule } from '../aspirante/aspirante.module';
import { ResultadoExamenAdmisionModule } from '../resultado-examen-admision/resultado-examen-admision.module';
import { CuentasCobrarModule } from '../cuentas-cobrar/cuentas-cobrar.module';


@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    CarreraTecnicaModule,
    JornadaModule,
    ExamenAdmisionModule,
    LoginModule,
    UsuarioModule,
    MaterialModule,
    AspiranteModule,
    ResultadoExamenAdmisionModule,
    CuentasCobrarModule
  ]
})
export class DashboardModule { }
