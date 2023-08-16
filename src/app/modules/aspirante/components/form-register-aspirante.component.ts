import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Aspirante } from '../model/aspirante.model';
import { CarreraTecnica } from '../../carrera-tecnica/model/carrera-tecnica.model';
import { Jornada } from '../../jornada/model/jornada.model';
import { ExamenAdmision } from '../../examen-admision/model/examen-admision.model';
import { CarreraTecnicaService } from '../../shared/services/carrera-tecnica.service';
import { ExamenAdmisionService } from '../../shared/services/examen-admision.service';
import { JornadaService } from '../../shared/services/jornada.service';
import { AspiranteService } from '../../shared/services/aspirante.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-register-aspirante',
  templateUrl: './form-register-aspirante.component.html',
  styleUrls: ['./form-register-aspirante.component.css']
})
export class FormRegisterAspiranteComponent implements OnInit{

  aspirante: Aspirante = new Aspirante();
  public aspiranteFormRegister: FormGroup;
  carrerasTecnicas: CarreraTecnica[] = [];
  jornadas: Jornada[] = [];
  examenesAdmision: ExamenAdmision[] = [];

  ngOnInit(): void {
    this.getCarrerasTecnicas();
    this.getExamenesAdmision();
    this.getJornadas();
  }

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<FormRegisterAspiranteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private carreraTecnicaService: CarreraTecnicaService,
    private examenAdmisionService: ExamenAdmisionService,
    private jornadaService: JornadaService,
    private aspiranteService: AspiranteService) {
    this.aspiranteFormRegister = this.formBuilder.group({
      apellido: [data != null ? data.apellido : '', Validators.required],
      nombre: [data != null ? data.nombre : '', Validators.required],
      direccion: [data != null ? data.direccion : '', Validators.required],
      telefono: [data != null ? data.telefono : '', Validators.required],
      email: [data != null ? data.email : '', Validators.required],
      carreraId: [data != null ? data.carreraId : '', Validators.required],
      jornadaId: ['', Validators.required],
      examenId: ['', Validators.required],
    });
  }

  getCarrerasTecnicas() {
    this.carreraTecnicaService.getCarrerasTecnicas().subscribe((data: any) => {
      this.carrerasTecnicas = data;
    }, (error: any) => {
      console.log(error);
    });
  }

  getExamenesAdmision() {
    this.examenAdmisionService.getExamenesAdmision().subscribe((data: any) => {
      this.examenesAdmision = data;
    }, (error: any) => {
      console.log(error);
    });
  }

  getJornadas() {
    this.jornadaService.getJornadas().subscribe((data: any) => {
      this.jornadas = data;
    }, (error: any) => {
      console.log(error);
    });
  }

  onSave(){
    this.aspirante.apellido = this.aspiranteFormRegister.get('apellido')?.value;
    this.aspirante.nombre = this.aspiranteFormRegister.get('nombre')?.value;
    this.aspirante.direccion = this.aspiranteFormRegister.get('direccion')?.value;
    this.aspirante.email = this.aspiranteFormRegister.get('email')?.value;
    this.aspirante.telefono = this.aspiranteFormRegister.get('telefono')?.value;
    this.aspirante.carreraId = this.aspiranteFormRegister.get('carreraId')?.value;
    this.aspirante.examenId = this.aspiranteFormRegister.get('examenId')?.value;
    this.aspirante.jornadaId = this.aspiranteFormRegister.get('jornadaId')?.value;
    console.log(JSON.stringify(this.aspirante));
    this.aspiranteService.addAspirante(this.aspirante).subscribe((response:any) => {
      if (response.estatus == "OK") {
        Swal.fire({
          icon: 'success',
          title: 'Solicitud de creción de aspirante',
          text: response.mensaje,
          footer: 'Kalum v1.0.0'
        }).then(result => {
          this.dialogRef.close(1)
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Solicitud de creción de aspirante',
          text: response.mensaje,
          footer: 'Kalum v1.0.0'
        }).then(result => {
          this.dialogRef.close(3)
        });
      }
    });
  }

  onClose(){
    this.dialogRef.close(2);
  }

}
