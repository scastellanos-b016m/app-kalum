import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormLoginComponent } from 'src/app/modules/login/components/form-login.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  mobileQuery: MediaQueryList;

  menuNav = [
    {name: 'Home', route: 'home', icon: 'home'},
    {name: 'Carreras', route: 'carreraTecnica', icon: 'category'},
    {name: 'Examenes', route: 'examenAdmision', icon: 'calendar_today'},
    {name: 'Jornadas', route: 'jornada', icon: 'description'}
  ];

  ngOnInit(): void {
  }

  constructor(media: MediaMatcher, public dialog: MatDialog) {
    this.mobileQuery = media.matchMedia('(max-witdth: 600px)');
  }

  openFormLogin(){
    const dialogRef = this.dialog.open(FormLoginComponent, {width: '450px'});
  }

}
