import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class BaseDatosService {

  constructor(private sqlite: SQLite) {
    this.crearTablas();
   }
  
    crearTablas(){
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
        db.executeSql('create table if not exists usuario (usuario varchar(30),contrasena varchar(20), correo varchar(80), nombre varchar(25), apellido varchar(25))', [])
            .then(() => console.log('CAGL: EJECUCION TABLA CORRECTAMENTE'))
            .catch(e => console.log('CAGL: Error crear tabla'+ e));
        })
        .catch(e => console.log('CAGL: Error al crear o abrir DB'+ JSON.stringify(e)));

        this.sqlite.create({
          name: 'data.db',
          location: 'default'
        })
        .then((db: SQLiteObject) => {
          db.executeSql('create table if not exists sesion (usuario varchar(30),contrasena varchar(20))', [])
              .then(() => console.log('CAGL: TABLA SESION CREADA'))
              .catch(e => console.log('CAGL: Error crear tabla SESION'+ e));
          })
          .catch(e => console.log('CAGL: Error al crear o abrir DB'+ JSON.stringify(e)));
    }

   almacenarUsuario(usuario:string , correo:string, nombre:string,apellido:string, contrasena:string){
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
      db.executeSql('insert into usuario values(?, ?, ?, ?, ?)', [usuario,contrasena,correo,nombre,apellido])
          .then(() => console.log('CAGL: Persona registrada ok'))
          .catch(e => console.log('CAGL: Error al registrar persona'+ JSON.stringify(e)));
      })
      .catch(e => console.log('CAGL: Error al crear o abrir DB'+ JSON.stringify(e)));
   }

   almacenarSesion(usuario:string, contrasena:string){
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
      db.executeSql('insert into sesion values(?, ?)', [usuario,contrasena])
          .then(() => console.log('CAGL: Persona almacenada ok'))
          .catch(e => console.log('CAGL: Error al almacenar persona'+ JSON.stringify(e)));
      })
      .catch(e => console.log('CAGL: Error al crear o abrir DB'+ JSON.stringify(e)));
   }

   cerrarSesion(){
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
      db.executeSql('delete from sesion', [])
          .then(() => console.log('CAGL: Sesion cerrada'))
          .catch(e => console.log('CAGL: Error al cerrar sesion'+ JSON.stringify(e)));
      })
      .catch(e => console.log('CAGL: Error al crear o abrir DB'+ JSON.stringify(e)));
   }

   validarSesion(){
    return this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
      return db.executeSql('select count(usuario) as cantidad from sesion', [])
          .then((data) =>{
            console.log('CAGL: Usuarios en sesion encontrados: ' + data.rows.item(0).cantidad)
            return data.rows.item(0).cantidad;
          })
          .catch(e => console.log('CAGL: Error al realizar sesion'+ JSON.stringify(e)));
      })
      .catch(e => console.log('CAGL: Error al crear o abrir DB'+ JSON.stringify(e)));
   }

   loginUsuario(usuario:string, contrasena:string){
    return this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
      return db.executeSql('select count(usuario) as cantidad from usuario where usuario = ? and contrasena= ?', [usuario,contrasena])
          .then((data) =>{
            console.log('CAGL: Usuarios encontrados: ' + data.rows.item(0).cantidad)
            return data.rows.item(0).cantidad;
          })
          .catch(e => console.log('CAGL: Error al logear'+ JSON.stringify(e)));
      })
      .catch(e => console.log('CAGL: Error al crear o abrir DB'+ JSON.stringify(e)));
   }

    //CAPTURAR INFORMACIÓN DEL USUARIO
   infoUsuario(usuario:string, contrasena:string){
    return this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
      return db.executeSql('select  correo, nombre, apellido, contrasena from usuario where usuario = ? and contrasena= ?', [usuario,contrasena])
          .then((data) =>{
            let objeto: any = {};
            objeto.nombre=data.rows.item(0).nombre;
            objeto.correo=data.rows.item(0).correo;
            objeto.apellido=data.rows.item(0).apellido;
            objeto.contrasena=data.rows.item(0).contrasena;
            return objeto;
          })
          .catch(e => console.log('CAGL: Error al mostrar personaa'+ JSON.stringify(e)));
      })
      .catch(e => console.log('CAGL: Error al crear o abrir DB'+ JSON.stringify(e)));
   }

   UsuarioExistente(usuario:string){
    return this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
      return db.executeSql('select count(usuario) as cantidad from usuario where usuario = ? ', [usuario])
          .then((data) =>{
            console.log('CAGL: Usuarios encontrados en bd para registro: ' + data.rows.item(0).cantidad)
            return data.rows.item(0).cantidad;
          })
          .catch(e => console.log('CAGL: Error al buscar usuario'+ JSON.stringify(e)));
      })
      .catch(e => console.log('CAGL: Error al crear o abrir DB'+ JSON.stringify(e)));
   }

   correoExistente(correo:string){
    return this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
      return db.executeSql('select count(correo) as correos from usuario where correo = ? ', [correo])
          .then((data) =>{
            console.log('CAGL: Correos encontrados en bd para registro: ' + data.rows.item(0).correos)
            return data.rows.item(0).correos;
          })
          .catch(e => console.log('CAGL: Error al buscar correo'+ JSON.stringify(e)));
      })
      .catch(e => console.log('CAGL: Error al crear o abrir DB'+ JSON.stringify(e)));
   }

   obtenerSesion(){
    return this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
      return db.executeSql('select  usuario,contrasena from sesion', [])
          .then((data) =>{
            let objeto: any = {};
            objeto.usuario=data.rows.item(0).usuario;
            objeto.contrasena=data.rows.item(0).contrasena;
            return objeto;
          })
          .catch(e => console.log('CAGL: Error al obtener sesion'+ JSON.stringify(e)));
      })
      .catch(e => console.log('CAGL: Error al crear o abrir DB'+ JSON.stringify(e)));
   }

   cambiarContrasena(usuario: string, contrasenaActual:string, contrasenaNueva:string){
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
      db.executeSql('update usuario set contrasena = ? where usuario = ? and contrasena = ?', [contrasenaNueva, usuario, contrasenaActual])
          .then(() => console.log('CAGL: Contraseña Modificada'))
          .catch(e => console.log('CAGL: Contraseña NO SE PUDO ModificaR'+ JSON.stringify(e)));
      })
      .catch(e => console.log('CAGL: Error al crear o abrir DB'+ JSON.stringify(e)));
   }

}
