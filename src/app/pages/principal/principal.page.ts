import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { BaseDatosService } from 'src/app/services/base-datos.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  usuario: string = '';
  contrasena: string = '';
  correo: string ='';
  nombre: string ='';
  apellido: string ='';
  contrasena2: string ='';

  constructor(private router:Router, private db:BaseDatosService) { }

  ngOnInit() {
    let extras= this.router.getCurrentNavigation();
    
    if(extras?.extras.state){
      this.usuario = extras?.extras.state['usuario'];
      this.contrasena = extras?.extras.state['contrasena'];
    }
    this.infoUsuario();
    console.log('CAGL: Usuario en principal: ' + this.usuario)
    console.log('CAGL: Contraseña en principal: ' + this.contrasena)

    if(this.usuario == ''){
      console.log('Vacio');
      this.db.obtenerSesion().then(data =>{
        this.usuario = data.usuario;
        this.contrasena= data.contrasena;
        this.infoUsuario();
      })
    }else{
      this.infoUsuario();
    }
  }

  volverLogin(){
    let extras: NavigationExtras={
      state:{
        usuario: this.usuario,
        contrasena: this.contrasena
      },replaceUrl: true
    } 
    this.router.navigate(['login'],extras)
  }

  infoUsuario(){
    this.db.infoUsuario(this.usuario,this.contrasena).then(data =>{
      this.correo = data.correo;
      this.nombre = data.nombre;
      this.apellido= data.apellido;
      this.contrasena2 = data.contrasena;
    })
  }
  navegarRestablecer(){
    let extras: NavigationExtras={
      state:{
        usuario: this.usuario,
        contrasena: this.contrasena
      },replaceUrl: true
    } 
    this.router.navigate(['cambiar-contrasena'],extras)
  }
  cerrarSesion(){
    this.db.cerrarSesion();
    let extras: NavigationExtras={
      replaceUrl: true
    }
    this.router.navigate(['login'],extras);
  }
}
