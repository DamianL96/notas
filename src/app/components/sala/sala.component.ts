import { Component, inject } from '@angular/core';
import { NotaComponent } from "../nota/nota.component";
import { Item, NotaService } from '../../services/nota.service';

@Component({
  selector: 'app-sala',
  standalone: true,
  imports: [NotaComponent],
  templateUrl: './sala.component.html',
})
export class SalaComponent {


  private nota = inject(NotaService);
  items$ = this.nota.getNota();
  newItem: Omit<Item, 'id'> = { producto: '' };
  

  crearNota() {
    this.nota
      .crearNota(this.newItem)
      .then((documento) => {
        console.log('Documento creado con id:', documento.id);
        this.newItem = { producto: '' };
      })

      .catch((error) => {
        console.error('Error al crear documento:', error);
      });
  }



  eliminarNota(itemId: string) {
    this.nota.deleteNota(itemId).catch((error) => {
      console.error('Error al eliminar un item', error);
    });
  }



  editarNota(itemId: string, newProduct: Partial<Item>) {
    this.nota
      .updateNota(itemId, newProduct)
      .then(() => {
        console.log('Item modificado');
      })
      .catch((error) => {
        console.error('Error al modificar item:', error);
      });
  }

}
