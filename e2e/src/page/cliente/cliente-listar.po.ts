import { by, element } from 'protractor';

export class ClienteListarPage{
    private linkListarCliente = element(by.id('linkListarCliente'));
    private botonRegistarCliente = element(by.id('linkCrearCliente'));
    private listaClientes = element.all(by.tagName('dataSource'));
    private botonEliminar = element(by.id('eliminarCliente'));
    private botonActualizarCliente = element(by.id('editarCliente'));

    async clickLinkListarCliente(){
        await this.linkListarCliente.click();
    }
    async clickBotonRegistarCliente(){
        await this.botonRegistarCliente.click();
    }
    async clickBotonActualizar(){
        await this.botonActualizarCliente.click();
    }  
    async contarClientes(){
        await this.listaClientes.count();
    }
    async eliminarCliente(){
        await this.botonEliminar.click();
    }
}
