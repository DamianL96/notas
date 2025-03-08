import { inject, Injectable } from '@angular/core';
import { collection, doc, Firestore, getDoc, setDoc } from 'firebase/firestore';

export interface User {
  id:string;
  name:string;
}


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _firestore = inject(Firestore);
 

  getUsuario( userId: string){
    const userRef = doc(this._firestore, `users/${userId}`);
    return getDoc(userRef);
  }

  addUsuario( newUser:User){
    const userRef = doc(this._firestore, `users/${newUser.id}`);
    return setDoc(userRef, newUser);
  }
  
}
