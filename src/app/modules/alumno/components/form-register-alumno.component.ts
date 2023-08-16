import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { UpdateIdentification } from '../../login/model/update-identification.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Alumno } from '../model/alumno.model';
import { environment } from 'src/environments/environments';
import { AlumnoService } from '../../shared/services/alumno.service';
import Swal from 'sweetalert2';
import { CarreraTecnica } from '../../carrera-tecnica/model/carrera-tecnica.model';
import { CarreraTecnicaService } from '../../shared/services/carrera-tecnica.service';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

const cargoInscripcion = environment.InscripcionCargoId;
const cargoCarne = environment.CarneCargoId;
const cargoMensual = environment.CargoMensualId;

@Component({
  selector: 'app-form-register-alumno',
  templateUrl: './form-register-alumno.component.html',
  styleUrls: ['./form-register-alumno.component.css']
})
export class FormRegisterAlumnoComponent implements OnInit {

  public alumnoFormRegister: FormGroup;
  alumno: Alumno = new Alumno();
  carrerasTecnicas: CarreraTecnica[] = [];
  updateIdentification: UpdateIdentification = new UpdateIdentification();
  meses = [
    {value: '1', valueView: 'Enero'},
    {value: '2', valueView: 'Febrero'},
    {value: '3', valueView: 'Marzo'},
    {value: '4', valueView: 'Abril'},
    {value: '5', valueView: 'Mayo'},
    {value: '6', valueView: 'Junio'},
    {value: '7', valueView: 'Julio'},
    {value: '8', valueView: 'Agosto'},
    {value: '9', valueView: 'Septiembre'},
    {value: '10', valueView: 'Octubre'},
    {value: '11', valueView: 'Noviembre'},
    {value: '12', valueView: 'Diciembre'},
  ];
  dias = [{value: '2', valueView: '2'}, {value: '4', valueView: '4'}, {value: '8', valueView: '8'}];

  constructor(private formBuilder: FormBuilder, private authService: AuthService
    , private dialogRef: MatDialogRef<FormRegisterAlumnoComponent>
    , private alumnoService: AlumnoService
    , private carreraTecnicaService: CarreraTecnicaService
    , @Inject(MAT_DIALOG_DATA) public data: any) {
    const anio = new Date().getFullYear();

    this.updateIdentification.identificationId = this.authService.usuario.identificationId;
    this.alumnoFormRegister = formBuilder.group({
      NoExpediente: [this.updateIdentification.identificationId, Validators.required],
      Ciclo: [anio, Validators.required],
      carreraId: [data != null ? data.carreraId : '', Validators.required],
      MesInicioPago: [this.meses, Validators.required],
      DiaPago: [this.dias, Validators.required]
    });
  }

  ngOnInit(): void {
    this.getCarrerasTecnicas();
  }

  getCarrerasTecnicas() {
    this.carreraTecnicaService.getCarrerasTecnicas().subscribe((data: any) => {
      this.carrerasTecnicas = data;
    }, (error: any) => {
      console.log(error);
    });
  }

  onSave() {
    this.alumno.NoExpediente = this.alumnoFormRegister.get('NoExpediente')?.value;
    this.alumno.Ciclo = this.alumnoFormRegister.get('Ciclo')?.value;
    this.alumno.MesInicioPago = this.alumnoFormRegister.get('MesInicioPago')?.value;
    this.alumno.CarreraId = this.alumnoFormRegister.get('carreraId')?.value;
    this.alumno.InscripcionCargoId = cargoInscripcion;
    this.alumno.CarneCargoId = cargoCarne;
    this.alumno.CargoMensualId = cargoMensual;
    this.alumno.DiaPago = this.alumnoFormRegister.get('DiaPago')?.value;
    this.alumno.Email = this.authService.usuario.email;

    console.log(JSON.stringify(this.alumno));

    this.alumnoService.addAlumno(this.alumno).subscribe((response:any) => {
      if (response.estatus == "OK") {
        Swal.fire({
          icon: 'success',
          title: 'Solicitud de inscripción de alumno',
          text: response.mensaje,
          footer: 'Kalum v1.0.0'
        }).then(result => {
          this.dialogRef.close(1);
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Solicitud de inscripción de alumno',
          text: response.mensaje,
          footer: 'Kalum v1.0.0'
        }).then(result => {
          this.dialogRef.close(3)
        });
      }
    });
  }

  onClose() {
    this.dialogRef.close(2);
  }

}
