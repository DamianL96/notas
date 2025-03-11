export interface User {
  id_user:string;
  name:string;
  salas_propietario:string[] | null;
  salas_colaborador:string[] | null;
}
