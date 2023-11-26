import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarPersonaPageRoutingModule } from './registrar-persona-routing.module';

import { RegistrarPersonaPage } from './registrar-persona.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrarPersonaPageRoutingModule
  ],
  declarations: [RegistrarPersonaPage]
})
export class RegistrarPersonaPageModule {}
