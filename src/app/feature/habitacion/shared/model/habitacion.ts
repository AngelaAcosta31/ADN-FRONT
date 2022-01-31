export class Habitacion{
    id: number;
    numeroHabitacion: string;
    tipo: string;
    noCamas: number;
    noBannos: number;
    descripcion: string;
    precio: number;
    piso: string;
    estado: string;

    constructor( numeroHabitacion: string, tipo: string, noCamas: number, noBannos: number, 
                 descripcion: string, precio: number, piso: string, estado: string){
        this.numeroHabitacion = numeroHabitacion;
        this.tipo = tipo;
        this.noCamas = noCamas;
        this.noBannos = noBannos;
        this.descripcion = descripcion;
        this.precio = precio;
        this.piso = piso;
        this.estado = estado;
    
    }

}
