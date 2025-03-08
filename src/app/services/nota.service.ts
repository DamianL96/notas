import { inject, Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  deleteDoc,
} from '@angular/fire/firestore';
import { updateDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';

export interface Item {
  id?: string;
  producto: string;
}


@Injectable({
  providedIn: 'root',
})
export class NotaService {
  private _firestore = inject(Firestore);
  private _collection = collection(this._firestore, 'ruta a notas');

  constructor() {}

  crearNota(item: Omit<Item,'id'>) {
    return addDoc(this._collection, item);
  }


  getNota(): Observable<Item[]> {
    return collectionData(this._collection, {idField: 'id',}) as Observable<Item[]>;
  }

  deleteNota(itemId:string){
    const itemDoc = doc( this._firestore, `/${itemId}`);
    return deleteDoc(itemDoc);
  }

  updateNota(itemId:string, newProduct: Partial<Item>){
    const itemDoc = doc(this._firestore, `/${itemId}`);
    return updateDoc(itemDoc, newProduct);
  }
}
