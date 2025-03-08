import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotaComponent } from "./components/nota/nota.component";
import { Item, NotaService } from './services/nota.service';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,AsyncPipe,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'notas';

  private nota = inject(NotaService);
  items$= this.nota.getNota();
  newItem: Omit<Item, 'id'> = {producto:''};

  constructor(){
    this.items$ = this.nota.getNota();
  }

  ngOnInit(): void { }


  crearNota() {
    
    this.nota.crearNota(this.newItem)
      .then((documento)=>{
        console.log('Documento creado con id:',documento.id);
        this.newItem = {producto:''};
      })

      .catch((error)=>{
        console.error('Error al crear documento:',error);
      });
  }

  eliminarNota(itemId:string){
    this.nota.deleteNota(itemId)
      .catch((error)=>{
        console.error('Error al eliminar un item',error);
      });
  }

  editarNota(itemId:string, newProduct:Partial<Item>){
    this.nota.updateNota(itemId,newProduct)
      .then( ()=>{
        console.log("Item modificado");
      })
      .catch((error)=>{
        console.error('Error al modificar item:',error);
      })

  }
}
