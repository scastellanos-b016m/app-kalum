import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExamenAdmisionService } from 'src/app/modules/shared/services/examen-admision.service';

@Component({
  selector: 'app-form-examen-admision',
  templateUrl: './form-examen-admision.component.html',
  styleUrls: ['./form-examen-admision.component.css']
})
export class FormExamenAdmisionComponent {
  public examenAdmisionForm: FormGroup;
  estadoFormulario: string = 'Agregar';

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<FormExamenAdmisionComponent>,
    private examenAdmisionService: ExamenAdmisionService, @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data);

    this.examenAdmisionForm = this.fb.group({
      examenAdmision: ['', Validators.required]
    })

    if (data != null) {
      this.estadoFormulario = 'Actualizar';
      this.updateForm(data);
    }
  }

  updateForm(data: any) {
    this.examenAdmisionForm = this.fb.group({
      examenAdmision: [data.fechaExamen, Validators.required]
    });
  }

  onSave() {
    let data = {
      fechaExamen: this.examenAdmisionForm.get('examenAdmision')?.value
    }

    if (this.estadoFormulario === 'Actualizar') {
      this.examenAdmisionService.updateExamenAdmision(data, this.data.examenId).subscribe({
        next: (data) => this.dialogRef.close(1),
        error: (error) => this.dialogRef.close(2),
        complete: () => console.log('Proceso finalizado')
      });
    } else {
      this.examenAdmisionService.saveExamenAdmision(data).subscribe(response => {
        console.log(response);
        this.dialogRef.close(1);
      }, (error) => {
        console.log(error);
        this.dialogRef.close(2);
      });
    }
  }

  onCancel(){
    this.dialogRef.close(3);
  }
}
