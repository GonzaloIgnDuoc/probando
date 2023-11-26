import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { APIService } from 'src/app/services/api.service';
import { BaseDatosService } from 'src/app/services/base-datos.service';
import { lastValueFrom } from 'rxjs';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  mdl_usuario: string = '';
  mdl_contrasena: string = '';

  v_labelusuario: string = '';
  v_visible2= false;

  constructor(private router: Router, private db: BaseDatosService,private api:APIService,private loadingCtrl: LoadingController) { }

  ngOnInit() {
    console.log('Usuario en login: '+ this.mdl_usuario)
  }
  navegarRegistro(){
    this.router.navigate(['registrar-persona'])
  }

  login(){
    let extras: NavigationExtras = {
      replaceUrl: true,
      state:{
        usuario: this.mdl_usuario,
        contrasena: this.mdl_contrasena
      }
    }

    this.db.loginUsuario(this.mdl_usuario,this.mdl_contrasena)
      .then(data =>{
        if(data == 1){
          this.db.almacenarSesion(this.mdl_usuario,this.mdl_contrasena)
          console.log('CAGL: credenciales validas')
          this.router.navigate(['principal'],extras);
        }else{
          this.showLoading()
          
          this.v_labelusuario='Credenciales invalidas'
          console.log('CAGL: credenciales invalidas')
        }this.personaLoginApi()
      }).catch(e =>{(console.log(e))})
    
  }

  async personaLoginApi(){
    try {
      let data = this.api.personaLogin(
      this.mdl_usuario,
      this.mdl_contrasena);
      let respuesta = await lastValueFrom(data);

      let jsonTexto = JSON.stringify(respuesta);
        console.log('CAGL: API LOGIN ' + jsonTexto)
        // Aquí puedes manejar la respuesta según sea necesario
      } catch (error) {
        console.error('CAGL: Error en personaLogin:', error);
          // Aquí puedes manejar el error
        }
  }
  mostrarMensaje() {
    this.v_visible2 = true;
    setTimeout(() => {
      this.v_visible2 = false;
      
    }, 4000); // 2000 milisegundos = 2 segundos
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Validando credenciales...',
      duration: 3000,
      spinner: 'circles'
    });

    loading.present();
    loading.onDidDismiss().then(() => {
      this.mostrarMensaje();
    });
  }
}
