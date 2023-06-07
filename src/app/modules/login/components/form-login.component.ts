import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent implements OnInit {
  public loginForm: FormGroup;

  ngOnInit(): void {
  }

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<FormLoginComponent>){
    this.loginForm = formBuilder.group({
      username: ['sergiocastellanos2', Validators.required],
      password: ['Inicio.2022', Validators.required]
    });
  }

  onCancel(){
    this.dialogRef.close(2);
  }

  onLogin(){

  }

}
