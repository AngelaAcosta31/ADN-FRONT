import { by, element } from 'protractor';

export class HabitacionListarPage{
    private linkListarHabitacion = element(by.id('linkListarHabitacion'));
    private botonRegistrarHabitacion = element(by.id('linkCrearHabitacion'));
    private listaHabitaciones = element.all(by.tagName('dataSource'));
    private botonEliminarHabitacion = element(by.id('eliminarHabitacion'));
    private botonActualizarHabitacion = element(by.id('actualizarHabitacion'));

    async clickListarHabitacion(){
        await this.linkListarHabitacion.click();
    }
    async clickBotonRegistrarHabitacion(){
        await this.botonRegistrarHabitacion.click();
    }
    async clickBotonActualizarHabitacion(){
        await this.botonActualizarHabitacion.click();
    }
    async clickBotonEliminarHabitacion(){
        await this.botonEliminarHabitacion.click();
    }
    async contarHabitaciones(){
        await this.listaHabitaciones.count();
    }
}
