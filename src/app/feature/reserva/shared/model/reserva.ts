export class Reserva{
    id: number;
    valor: number;
    fechaEntrada: string;
    fechaSalida: string;
    idHabitacion: number;
    idCliente: number;

    constructor(valor: number, fechaEntrada: string, fechaSalida: string, idHabitacion: number, idCliente: number){
        this.valor = valor;
        this.fechaEntrada = fechaEntrada;
        this.fechaSalida = fechaSalida;
        this.idHabitacion = idHabitacion;
        this.idCliente = idCliente;
    }

    
}
