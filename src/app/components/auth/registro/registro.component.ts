import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registro.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RegistroComponent {
  
  private _user = inject(UserService);
  private _router = inject(Router);
  
  private isSubmitting = false;


  onSubmit(form: any) {
    console.log('OnSubmit llamado');
    if (!form.valid || this.isSubmitting) return;

    this.isSubmitting = true;

    this._user.addUsuario(form.value.nombre)
    .subscribe({
      next: () => {
        console.log('Usuario agregado correctamente en registro component');
        form.reset();
        this.isSubmitting = false;
      },
      error: (err) => {
        console.error('Error al agregar el usuario en registro component:',err);
        this.isSubmitting = false;
      },
      complete: ()=>{
        //redireccionar
        console.log("redireccionar");
        this._router.navigate(['/home']);
      }
    });
  }



}
