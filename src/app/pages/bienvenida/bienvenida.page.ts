import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { BaseDatosService } from 'src/app/services/base-datos.service';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.page.html',
  styleUrls: ['./bienvenida.page.scss'],
})
export class BienvenidaPage implements OnInit {
  constructor(private db: BaseDatosService, private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      this.db.validarSesion().then((data) => {
        if (data == 0) {
          this.router.navigate(['login']);
        } else {
          this.router.navigate(['principal']);
        }
      });
    }, 2000);
  }
}
