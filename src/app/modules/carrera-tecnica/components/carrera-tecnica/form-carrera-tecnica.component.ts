import { CarreraTecnicaService } from './../../../shared/services/carrera-tecnica.service';
import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-carrera-tecnica',
  templateUrl: './form-carrera-tecnica.component.html',
  styleUrls: ['./form-carrera-tecnica.component.css']
})
export class FormCarreraTecnicaComponent {
  public carreraTecnicaForm: FormGroup;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<FormCarreraTecnicaComponent>,
    private carreraTecnicaService: CarreraTecnicaService) {

    this.carreraTecnicaForm = this.fb.group({
      carreraTecnica: ['', Validators.required]
    })
  }

  onSave() {
    let data = {
      nombre: this.carreraTecnicaForm.get('carreraTecnica')?.value
    }

    if (data != null) {
      this.carreraTecnicaService.saveCarreraTecnica(data).subscribe(response => {
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
