import { by, element } from 'protractor';

export class ReservaListarPage{
    private linkListarReserva = element(by.id('linkListarReserva'));
    private botonRegistrarReserva = element(by.id('linkCrearReserva'));
    private listaReservas = element.all(by.tagName('dataSource'));
    private botonActualizarReserva = element(by.id('editarReserva'));
    private botonEliminarReserva = element(by.id('eliminarReserva'));

    async clickLinkListarReserva(){
        await this.linkListarReserva.click();
    }
    async clickBotonRegistrarReserva(){
        await this.botonRegistrarReserva.click();
    }
    async clickBotonActualizarReserva(){
        await this.botonActualizarReserva.click();
    }
    async contarReservas(){
        await this.listaReservas.count();
    }
    async clickBotonEliminarReserva(){
        await this.botonEliminarReserva.click();
    }
}
