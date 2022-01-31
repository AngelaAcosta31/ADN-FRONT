export class Cliente{
    id: number;
    nombre: string;
    apellido: string;
    numeroIdentificacion: string;
    telefono: string;
    correo: string;
    sexo: string;
    fechaNacimiento: string;
    direccion: string;
    constructor( nombre: string, apellido: string, numeroIdentificacion: string, telefono: string, correo: string,
                 sexo: string, fechaNacimiento: string, direccion: string){
        this.nombre = nombre;
        this.apellido = apellido;
        this.numeroIdentificacion = numeroIdentificacion;
        this.telefono = telefono;
        this.correo = correo;
        this.sexo = sexo;
        this.fechaNacimiento = fechaNacimiento;
        this.direccion = direccion;
    }
}
