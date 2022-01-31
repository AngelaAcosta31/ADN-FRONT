import { by, element } from 'protractor';

export class NavbarPage {
    linkHome = element(by.xpath('/html/body/app-root/app-navbar/mat-toolbar/mat-button[1]'));
    linkClientes = element(by.xpath('/html/body/app-root/app-navbar/mat-toolbar/mat-button[2]'));
    linkReservas = element(by.xpath('/html/body/app-root/app-navbar/mat-toolbar/mat-button[3]'));
    linkHabitaciones = element(by.xpath('/html/body/app-root/app-navbar/mat-toolbar/mat-button[4]'));

    async clickBotonHome(){
        await this.linkHome.click();
    }    
    async clickBotonClientes() {
        await this.linkClientes.click();
    }
    async clickBotonReservas(){
        await this.linkReservas.click();
    }
    async clickBotonHabitaciones(){
        await this.linkHabitaciones.click();
    }
}
