import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ResultadoExamenAdmisionService } from 'src/app/modules/shared/services/resultado-examen-admision.service';

@Component({
  selector: 'app-formresultado-examen-admision',
  templateUrl: './formresultado-examen-admision.component.html',
  styleUrls: ['./formresultado-examen-admision.component.css']
})
export class FormresultadoExamenAdmisionComponent {
  public resultadoExamenAdmisionForm: FormGroup;
  estadoFormulario: string = 'Agregar';

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<FormresultadoExamenAdmisionComponent>,
    private resultadoExamenAdmisionService: ResultadoExamenAdmisionService, @Inject(MAT_DIALOG_DATA) public data: any) {

    this.resultadoExamenAdmisionForm = this.fb.group({
      NoExpediente: ['', Validators.required],
      Anio: ['', Validators.required],
      Descripcion: ['', Validators.required],
      Nota: ['', Validators.required]
    });
    if (data != null && data.aspiranteResultado == false) {
      this.estadoFormulario = 'Actualizar';
      this.updateForm(data);
    }
    else {
      this.addResultadoAspirante(data);
    }
  }

  updateForm(data: any) {
    console.log(data);
    this.resultadoExamenAdmisionForm = this.fb.group({
      NoExpediente: [data.noExpediente, Validators.required],
      Anio: [data.anio, Validators.required],
      Descripcion: [data.descripcion, Validators.required],
      Nota: [data.nota, Validators.required]
    });
  }

  addResultadoAspirante(data: any) {
    console.log(data);
    this.resultadoExamenAdmisionForm = this.fb.group({
      NoExpediente: [data.noExpediente, Validators.required],
      Anio: [data.anio, Validators.required],
      Descripcion: ['', Validators.required],
      Nota: ['', Validators.required]
    });
  }

  onSave() {
    let data = {
      NoExpediente: this.resultadoExamenAdmisionForm.get('NoExpediente')?.value,
      Anio: this.resultadoExamenAdmisionForm.get('Anio')?.value,
      Descripcion: this.resultadoExamenAdmisionForm.get('Descripcion')?.value,
      Nota: this.resultadoExamenAdmisionForm.get('Nota')?.value
    }

    if (this.estadoFormulario === 'Actualizar') {
      console.log("actualizando");
      console.log(data);
      console.log(this.data.noExpediente);
      console.log(this.data.anio);
      this.resultadoExamenAdmisionService.updateResultadoExamenAdmision(data, this.data.noExpediente, this.data.anio).subscribe({
        next: (data) => this.dialogRef.close(1),
        error: (error) => this.dialogRef.close(2),
        complete: () => console.log('Proceso finalizado')
      });
    } else {
      this.resultadoExamenAdmisionService.saveResultadoExamenAdmision(data).subscribe(response => {
        console.log(response);
        this.dialogRef.close(1);
      }, (error) => {
        console.log(error);
        this.dialogRef.close(2);
      });
    }
  }

  onCancel() {
    this.dialogRef.close(3);
  }

}
