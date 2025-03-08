import { Component } from '@angular/core';
import { NotaComponent } from "../nota/nota.component";

@Component({
  selector: 'app-sala',
  standalone: true,
  imports: [NotaComponent],
  templateUrl: './sala.component.html',
  styleUrl: './sala.component.css'
})
export class SalaComponent {

}
