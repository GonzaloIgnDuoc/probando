import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { APIService } from 'src/app/services/api.service';
import { BaseDatosService } from 'src/app/services/base-datos.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.page.html',
  styleUrls: ['./cambiar-contrasena.page.scss'],
})
export class CambiarContrasenaPage implements OnInit {
  usuario: string = '';
  contrasena: string = '';

  mdl_actual: string = '';
  mdl_nueva: string = '';
  mdl_confirmacion: string = '';

  v_visible = false;
  v_mensaje: string = '';

  constructor(private router: Router, private db: BaseDatosService, private api:APIService) {}

  ngOnInit() {
    let extras = this.router.getCurrentNavigation();

    if (extras?.extras.state) {
      this.usuario = extras?.extras.state['usuario'];
      this.contrasena = extras?.extras.state['contrasena'];
    }
  }

  cambiarContrasena() {
    this.db.loginUsuario(this.usuario, this.mdl_actual).then((data) => {
      this.modificarApi()
      if (data == 0) {
        this.v_visible = true;
        this.v_mensaje = 'La contraseña actual incorrecta';
      } else {
        if (this.mdl_nueva != this.mdl_confirmacion) {
          this.v_visible = true;
          this.v_mensaje = 'Las contraseñas no son iguales';
        } else {
          this.db.cambiarContrasena(
            this.usuario,
            this.contrasena,
            this.mdl_nueva
          );
          this.db.cerrarSesion()
          let extras: NavigationExtras = {
            replaceUrl: true,
          };
          this.router.navigate(['login'], extras);
        }
      }
    });
  }

  async modificarApi() {
    try {
      let data = this.api.personaModificarContrasena(
        this.usuario,
        this.mdl_nueva,
        this.contrasena
      );
      let respuesta = await lastValueFrom(data);

      let jsonTexto = JSON.stringify(respuesta);
      console.log('CAGL: MODIFICAR CONTRASEÑA: ' + jsonTexto);
      // Aquí puedes manejar la respuesta según sea necesario
    } catch (error) {
      console.error('CAGL: ERROR MODIFICAR CONTRASEÑA', error);
      // Aquí puedes manejar el error
    }
  }
}
