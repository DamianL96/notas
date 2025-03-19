import { inject, Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { IdService } from './id.service';
import { from, map, Observable, switchMap, take } from 'rxjs';
import { doc, Firestore, getDoc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  private _firestore = inject(Firestore);
  private _id = inject(IdService);
  private lastIdUser = '#u0000';

  private guardarUsuario(nuevoUsuario: User):Observable<void>{
    const nuevoId = nuevoUsuario.id_user;
    const userRef = doc(this._firestore, `users/${nuevoId}`);

    return from(this._id.setNewIdUser(nuevoId)).pipe(
      switchMap( ()=> from(setDoc(userRef, nuevoUsuario)) )
    );
  }
  
  private crearNuevoUsuario(nombre:string, lastId:string):User{
    const nuevoId = this.incrementarId(lastId);
    return{
      id_user: nuevoId,
      name: nombre,
      salas_propietario:[],
      salas_colaborador:[],
    };
  }

  private obtenerId(): Observable<string> {
    return this._id.getIdUser().pipe(
      map((data) => data.last_user)
    );
  }

  private incrementarId(id: string): string {
    const digitos = id.match(/\d+/); //separa 0001
    const prefijo = id.substring(0, 2); //extrae #u

    if (!digitos || digitos.length === 0) {
      throw new Error('No se encontraror numeros en el id');
    }

    const numero = parseInt(digitos[0], 10);
    const nuevoNumero = numero + 1;
    const numeroCuatroDigitos = nuevoNumero.toString().padStart(4, '0');

    const nuevoId = `${prefijo}${numeroCuatroDigitos}`;

    return nuevoId;
  }


  addUsuario(nombre: string): Observable<void> {
    return this.obtenerId().pipe(
      take(1),
      map( lastId => this.crearNuevoUsuario(nombre, lastId)),
      switchMap( nuevoUsuario => this.guardarUsuario(nuevoUsuario) )
    );
  }


}
