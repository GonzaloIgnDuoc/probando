import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrarPersonaPage } from './registrar-persona.page';

describe('RegistrarPersonaPage', () => {
  let component: RegistrarPersonaPage;
  let fixture: ComponentFixture<RegistrarPersonaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegistrarPersonaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
