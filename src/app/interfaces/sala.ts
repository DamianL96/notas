export interface Sala{
  id_sala:string;
  notas:Nota[];
  propietario:string;
  colaboradores:string[];
}

export interface Nota {
  id_nota:string;
  autor:string;
  creacion:string;
  texto:string;
  ultima_modificacion:string;
  ultimo_editor:string;
}
