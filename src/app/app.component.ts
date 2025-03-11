import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegistroComponent } from './components/auth/registro/registro.component';
import { IdService } from './services/id.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, FormsModule, RegistroComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {


  title = 'notas';
  //private _user = inject(UserService);
  private _id = inject(IdService);



  ngOnInit(): void {
    //this._user.obtenerId();

     this._id.getIdUser().subscribe( (data)=>{
       console.log("sala",data[0].last_sala,"/usuario",data[0].last_user);
     });
  }

}
