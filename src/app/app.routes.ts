import { Routes } from '@angular/router';
import RegistroComponent from './components/auth/registro/registro.component';
import HomeComponent from './components/home/home.component';
import NotFoundComponent from './components/not-found/not-found.component';

export const routes: Routes = [
  { path: 'registro', component:RegistroComponent},
  { path: 'home', component: HomeComponent},
  { path: '', redirectTo:'/registro', pathMatch:'full' },
  { path: '**', component: NotFoundComponent},
];
