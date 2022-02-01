import { by, element } from 'protractor';

export class ReservaCrearPage{
    private linkCrearReserva = element(by.id('linkCrearReserva'));
    private inputValorReserva = element(by.id('valor'));
    private inputFechaEntradaReserva = element(by.id('fechaEntrada'));
    private inputFechaSalidaReserva = element(by.id('fechaSalida'));
    private inputIdHabitacionReserva = element(by.id('idHabitacion'));
    private inputIdClienteReserva = element(by.id('idCliente'));
    private botonRegistrarReserva = element(by.id('guardarReserva'));
    private botonActualizarReserva = element(by.id('editarReserva'));

    async clickLinkCrearReserva(){
        await this.linkCrearReserva.click();
    }
    async ingresarValorReserva(valor){
        await this.inputValorReserva.sendKeys(valor);
    }
    async ingresarFechaEntradaReserva(entrada){
        await this.inputFechaEntradaReserva.sendKeys(entrada);
    }
    async ingresarFechaSalidaReserva(salida){
        await this.inputFechaSalidaReserva.sendKeys(salida);
    }
    async ingresarIdHabitacionReserva(idHabitacion){
        await this.inputIdHabitacionReserva.sendKeys(idHabitacion);
    }
    async ingresarIdClienteReserva(idCliente){
        await this.inputIdClienteReserva.sendKeys(idCliente);
    }
    async clickBotonGuardarReserva(){
        await this.botonRegistrarReserva.click();
    }
    async clickBotonActualizarReserva(){
        await this.botonActualizarReserva.click();
    }
}
