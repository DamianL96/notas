import { inject, Injectable } from '@angular/core';
import { doc, Firestore, getDoc, setDoc } from 'firebase/firestore';
import { User } from '../interfaces/user';
import { IdService } from './id.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private _firestore = inject(Firestore);
  private _id = inject(IdService);

  getUsuario(userId: string) {
    const userRef = doc(this._firestore, `users/${userId}`);
    return getDoc(userRef);
  }

  addUsuario(newUser: User) {
    const userRef = doc(this._firestore, `users/${newUser.id_user}`);
    return setDoc(userRef, newUser);
  }

  obtenerId() {
    this._id.getIdUser().subscribe((data) => {
      console.log(data[0].last_user);
    });
  }

  generarId() {
    let usuario = this.obtenerId();
    console.log(usuario);
  }
}
