import { inject, Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Id{
  last_user:string;
  last_sala:string;
}

@Injectable({
  providedIn: 'root'
})
export class IdService {

  private _firestore:Firestore = inject(Firestore);
  private _collection = collection(this._firestore,'last_id');
  
  getIdUser():Observable<Id[]>{
    return collectionData(this._collection,{ idField:'#i0001'})as Observable<Id[]>;
  }

}
