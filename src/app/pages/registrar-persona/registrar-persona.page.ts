import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Route, Router } from '@angular/router';
import { APIService } from 'src/app/services/api.service';
import { BaseDatosService } from 'src/app/services/base-datos.service';
import { lastValueFrom } from 'rxjs';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-registrar-persona',
  templateUrl: './registrar-persona.page.html',
  styleUrls: ['./registrar-persona.page.scss'],
})
export class RegistrarPersonaPage implements OnInit {
  mdl_usuario: string = '';
  mdl_correo: string = '';
  mdl_nombre: string = '';
  mdl_apellido: string = '';
  mdl_contrasena: string = '';

  v_labelRegistro: string = '';
  v_visible = false;

  showPassword: boolean = false;

  constructor(
    private router: Router,
    private db: BaseDatosService,
    private api: APIService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}
  async almacenarUsuario() {
    const loading = await this.loadingCtrl.create({
      message: 'Validando',
      duration: 1500,
      spinner: 'dots',
    });

    loading.present();
    if (
      !this.mdl_usuario ||
      !this.mdl_correo ||
      !this.mdl_nombre ||
      !this.mdl_apellido ||
      !this.mdl_contrasena
    ) {
      loading.onDidDismiss().then(() => {
        this.mostrarMensaje();
        this.v_labelRegistro='Debes completar todos los campos'
      });
      return;
    }
    const correoFormat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!correoFormat.test(this.mdl_correo)) {
      // Mostrar alerta si el formato de correo electrónico es incorrecto
      loading.onDidDismiss().then(() => {
        this.mostrarMensaje();
        this.v_labelRegistro='Formato Incorrecto de correo'
      });
      return;
    }

    if (this.mdl_contrasena.length < 6) {
      // Mostrar alerta si la contraseña es demasiado corta
      loading.onDidDismiss().then(() => {
        this.mostrarMensaje();
        this.v_labelRegistro='Contraseña de 7+ caracteres'
      });;
      return;
    }


    this.registroApi();
    const correoExistente = await this.db.correoExistente(this.mdl_correo);
    //const correoExiste = await this.db.infoUsuario('', this.nuevoCorreo);
    if (correoExistente) {
      loading.onDidDismiss().then(() => {
        this.mostrarMensaje();
        this.v_labelRegistro='Correo ya se encuentra registrado'
      });;
      return;
    }
    
    this.db.UsuarioExistente(this.mdl_usuario).then((data) => {
      if (data != 0) {
        loading.onDidDismiss().then(() => {
          this.mostrarMensaje();
        });
        this.v_labelRegistro = 'Usuario ya existe';
        this.mdl_usuario = '';
        this.mdl_correo = '';
        this.mdl_nombre = '';
        this.mdl_apellido = '';
        this.mdl_contrasena = '';
        return;
      } else {
        this.db.almacenarUsuario(
          this.mdl_usuario,
          this.mdl_correo,
          this.mdl_nombre,
          this.mdl_apellido,
          this.mdl_contrasena
        );
        this.router.navigate(['login']);
        loading.dismiss();
      }
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  async registroApi() {
    try {
      let data = this.api.almacenarPersonaApi(
        this.mdl_usuario,
        this.mdl_correo,
        this.mdl_nombre,
        this.mdl_apellido,
        this.mdl_contrasena
      );
      let respuesta = await lastValueFrom(data);
      let jsonTexto = JSON.stringify(respuesta);
      console.log('CAGL: cositas api' + jsonTexto);
    } catch (error) {
      console.error('CAGL: Error en personaLogin:', error);
    }
  }

  mostrarMensaje() {
    this.v_visible = true;
    setTimeout(() => {
      this.v_visible = false;
    }, 4000);
  }
}
