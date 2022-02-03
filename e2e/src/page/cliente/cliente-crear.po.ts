    import { by, element } from 'protractor';

export class ClienteCrearPage{
    private linkCrearCliente = element(by.id('linkCrearCliente'));
    private inputNombreCliente = element(by.id('nombre'));
    private inputApellidoCliente = element(by.id('apellido'));
    private inputNumeroIdentificacionCliente = element(by.id('numeroIdentificacion'));
    private inputTelefonoCliente = element(by.id('telefono'));
    private inputCorreoCliente = element(by.id('correo'));
    private inputSexoCliente = element(by.id('sexo'));
    private inputFechaNacimientoCliente = element(by.id('fechaNacimiento'));
    private inputDireccionCliente = element(by.id('direccion'));
    private botonGuardarCliente = element(by.id('guardarCliente'));
    private botonActualizarCliente = element(by.id('editar'));

    async clickLinkCrearCliente(){
        await this.linkCrearCliente.click();
    }
    async ingresarNombreCliente(nombre){
        await this.inputNombreCliente.sendKeys(nombre);
    }
    async ingresarApellidoCliente(apellido){
        await this.inputApellidoCliente.sendKeys(apellido);
    }
    async ingresarNumeroIdentificacionCliente(numeroIdentifiacacion){
        await this.inputNumeroIdentificacionCliente.sendKeys(numeroIdentifiacacion);
    }
    async ingresarTelefonoCliente(telefono){
        await this.inputTelefonoCliente.sendKeys(telefono);
    }
    async ingresarCorreoCliente(correo){
        await this.inputCorreoCliente.sendKeys(correo);
    }
    async ingresarSexoCliente(sexo){
        await this.inputSexoCliente.sendKeys(sexo);
    }
    async ingresarFechaNacimientoCliente(fechaNacimiento){
        await this.inputFechaNacimientoCliente.sendKeys(fechaNacimiento);
    }
    async ingresarDireccionCliente(direccion){
        await this.inputDireccionCliente.sendKeys(direccion);
    }
    async clickBotonGuardarCliente(){
        await this.botonGuardarCliente.click();
    }
    async clickBotonEditarCliente(){
        await this.botonActualizarCliente.click();
    }

}
