import { inject, Injectable } from '@angular/core';
import { collection, collectionData, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { map, Observable, shareReplay } from 'rxjs';

export interface Id{
  last_user:string;
  last_sala:string;
  id?:string;
}

@Injectable({
  providedIn: 'root'
})
export class IdService {

  private _firestore:Firestore = inject(Firestore);
  private _collection = collection(this._firestore,'last_id');

  private cachedIdUser$: Observable<Id> | null = null;
  
  getIdUser(): Observable<Id> {
    this.cachedIdUser$ ??= (collectionData(this._collection, { idField: 'id' }) as Observable<Id[]>).pipe(
      map(data => {
        if (data.length === 0) {
          throw new Error('No se encontró el documento de ID en Firestore');

        }
        return data[0];
      }),

      shareReplay(1)
    );
    
    return this.cachedIdUser$;
  }


  async setNewIdUser(nuevoId:string):Promise<void>{
    const docRef = doc(this._firestore, 'last_id','#i0001');

    try{
      await updateDoc( docRef, {last_user:nuevoId} );
      console.log('Nuevo Id User agregado correctamente en Id Service');
      this.cachedIdUser$ = null;

    }catch( error){
      console.log('Error al actualizar el Id User en Id Service:',error);
      throw error;
    }
  }


}
