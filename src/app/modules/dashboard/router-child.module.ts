import { RoleGuard } from './../usuario/guards/role.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CarreraTecnicaComponent } from '../carrera-tecnica/components/carrera-tecnica/carrera-tecnica.component';
import { JornadaComponent } from '../jornada/components/jornada/jornada.component';
import { ExamenAdmisionComponent } from '../examen-admision/components/examen-admision/examen-admision.component';
import { FormUpdateIdentificationIdComponent } from '../login/components/form-update-identification-id.component';
import { AuthGuard } from '../usuario/guards/auth.guard';
import { AspiranteComponent } from '../aspirante/components/aspirante.component';
import { ResultadoExamenAdmisionComponent } from '../resultado-examen-admision/components/resultado-examen-admision/resultado-examen-admision.component';
import { CuentasCobrarComponent } from '../cuentas-cobrar/components/cuentas-cobrar/cuentas-cobrar.component';
import { ResultadoExamenAdmisionNoexpedienteComponent } from '../resultado-examen-admision/components/resultado-examen-admision-noexpediente/resultado-examen-admision-noexpediente.component';

const childRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'carreraTecnica', component: CarreraTecnicaComponent},
  {path: 'jornada', component: JornadaComponent},
  {path: 'examenAdmision', component: ExamenAdmisionComponent},
  {path: 'update-identification/form', component: FormUpdateIdentificationIdComponent, canActivate: [AuthGuard, RoleGuard], data: {role: ['ROLE_USER', 'ROLE_CANDIDATE']}},
  {path: 'aspirante', component: AspiranteComponent, canActivate: [AuthGuard, RoleGuard], data: {role: ['ROLE_ADMIN']}},
  {path: 'resultadoExamenAdmision', component: ResultadoExamenAdmisionComponent, canActivate: [AuthGuard, RoleGuard], data: {role: ['ROLE_STUDENT', 'ROLE_ADMIN']}},
  {path: 'cuentas-cobrar', component: CuentasCobrarComponent, canActivate: [AuthGuard, RoleGuard], data: {role: ['ROLE_STUDENT']}},
  {path: 'resultadoExamenAdmisionnoexpediente', component: ResultadoExamenAdmisionNoexpedienteComponent, canActivate: [AuthGuard, RoleGuard], data: {role: ['ROLE_CANDIDATE']}}
  //AQUI SE DEBE CREAR UNA DIRECCIÓN PARA EL ROL DE REGISTRAR ALUMNO
]

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
})
export class RouterChildModule { }
