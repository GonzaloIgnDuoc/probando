import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrarPersonaPage } from './registrar-persona.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrarPersonaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrarPersonaPageRoutingModule {}
