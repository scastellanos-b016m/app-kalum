import { JornadaService } from 'src/app/modules/shared/services/jornada.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-form-jornada',
  templateUrl: './form-jornada.component.html',
  styleUrls: ['./form-jornada.component.css']
})
export class FormJornadaComponent {
  public jornadaForm: FormGroup;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<FormJornadaComponent>,
    private jornadaService: JornadaService) {

    this.jornadaForm = this.fb.group({
      nombreCorto: ['', Validators.required],
      descripcion: ['', Validators.required]
    })
  }

  onSave() {
    let data = {
      nombreCorto: this.jornadaForm.get('nombreCorto')?.value,
      descripcion: this.jornadaForm.get('descripcion')?.value
    }

    console.log(data);

    if (data != null) {
      this.jornadaService.saveJornada(data).subscribe(response => {
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
  // public jornadaForm: FormGroup;

  // constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<FormJornadaComponent>,
  //   private jornadaService: JornadaService) {

  //     this.jornadaForm = this.fb.group({
  //       jornada: ['', Validators.required]
  //     })
  //   }

  //   onSave() {
  //     let data = {
  //       nombreCorto: this.jornadaForm.get('nombreCorto')?.value,
  //       descripcion: this.jornadaForm.get('descripcion')?.value
  //     }

  //     if (data != null) {
  //       this.jornadaService.saveJornada(data).subscribe(response => {
  //         console.log(response);
  //         this.dialogRef.close(1);
  //       }, (error) => {
  //         console.log(error);
  //         this.dialogRef.close(2);
  //       })
  //     }
  //   }

  //   onCancel() {
  //     this.dialogRef.close(3);
  //   }
}
