import { by, element } from 'protractor';

export class HabitacionCrearPage{
    private linkCrearHabitacion = element(by.id('linkCrearHabitacion'));
    private inputNumeroHabitacion = element(by.id('numeroHabitacion'));
    private inputTipoHabitacion = element(by.id('tipo'));
    private inputNoCamasHabitacion = element(by.id('noCamas'));
    private inputNoBannosHabitacion = element(by.id('noBannos'));
    private inputDescripcionHabitacion = element(by.id('descripcion'));
    private inputPrecioHabitacion = element(by.id('precio'));
    private inputPisoHabitacion = element(by.id('piso'));
    private inputEstadoHabitacion = element(by.id('estado'));
    private botonRegistrarHabitacion = element(by.id('guardarHabitacion'));
    private botonActualizarHabitacion = element(by.id('actualizarHabitacion'));

    async clickLinkCrearHabitacion(){
        await this.linkCrearHabitacion.click();
    }
    async ingresarNumeroHabitacion(numeroH){
        await this.inputNumeroHabitacion.sendKeys(numeroH);
    }
    async ingresarTipoHabitacion(tipo){
        await this.inputTipoHabitacion.sendKeys(tipo);
    }
    async ingresarNoCamasHabitacion(camas){
        await this.inputNoCamasHabitacion.sendKeys(camas);
    }
    async ingresarNoBannosHabitacion(bannos){
        await this.inputNoBannosHabitacion.sendKeys(bannos);
    }
    async ingresarDescripcionHabitacion(descripcion){
        await this.inputDescripcionHabitacion.sendKeys(descripcion);
    }
    async ingresarPrecioHabitacion(precio){
        await this.inputPrecioHabitacion.sendKeys(precio);
    }
    async ingresarPisoHabitacion(piso){
        await this.inputPisoHabitacion.sendKeys(piso);
    }
    async ingresarEstadoHabitacion(estado){
        await this.inputEstadoHabitacion.sendKeys(estado);
    }
    async clickBotonGuardarHabitacion(){
        await this.botonRegistrarHabitacion.click();
    }
    async clickBotonActualizarHabitacion(){
        await this.botonActualizarHabitacion.click();
    }
}
