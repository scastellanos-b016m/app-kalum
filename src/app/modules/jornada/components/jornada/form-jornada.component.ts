import { JornadaService } from 'src/app/modules/shared/services/jornada.service';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form-jornada',
  templateUrl: './form-jornada.component.html',
  styleUrls: ['./form-jornada.component.css']
})
export class FormJornadaComponent {
  public jornadaForm: FormGroup;
  estadoFormulario: string = 'Agregar';

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<FormJornadaComponent>,
    private jornadaService: JornadaService, @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data);

    this.jornadaForm = this.fb.group({
      nombreCorto: ['', Validators.required],
      descripcion: ['', Validators.required]
    })

    if (data != null) {
      this.estadoFormulario = 'Actualizar';
      this.updateForm(data);
    }
  }

  updateForm(data: any) {
    this.jornadaForm = this.fb.group({
      nombreCorto: [data.nombreCorto, Validators.required],
      descripcion: [data.descripcion, Validators.required]
    });
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
