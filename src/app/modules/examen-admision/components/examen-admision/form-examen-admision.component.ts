import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ExamenAdmisionService } from 'src/app/modules/shared/services/examen-admision.service';

@Component({
  selector: 'app-form-examen-admision',
  templateUrl: './form-examen-admision.component.html',
  styleUrls: ['./form-examen-admision.component.css']
})
export class FormExamenAdmisionComponent {
  public examenAdmisionForm: FormGroup;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<FormExamenAdmisionComponent>,
    private examenAdmisionService: ExamenAdmisionService) {

    this.examenAdmisionForm = this.fb.group({
      examenAdmision: ['', Validators.required]
    })
  }

  onSave() {
    let data = {
      fechaExamen: this.examenAdmisionForm.get('examenAdmision')?.value
    }

    if (data != null) {
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
