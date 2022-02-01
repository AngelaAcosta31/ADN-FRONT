import { NavbarPage } from '../page/navbar/navbar.po';
import { ReservaCrearPage } from '../page/reserva/reserva-crear.po';
import { ReservaListarPage } from '../page/reserva/reserva-listar.po';

describe('workspace-project  Reserva', () => {
    let navBar: NavbarPage;
    let crearReserva: ReservaCrearPage;
    let listarReserva: ReservaListarPage;

    beforeEach(() => {
        navBar = new NavbarPage();
        crearReserva = new ReservaCrearPage();
        listarReserva = new ReservaListarPage();
    });

    it('Deberia listar todas las reservas', async () => {
        navBar.clickBotonReservas();
        listarReserva.clickLinkListarReserva();

        expect(listarReserva.contarReservas()).toBeGreaterThanOrEqual(0);
    });

    it('Deberia crear una reserva', async () => {

        const FECHA_ENTRADA = '2022-02-01';
        const FECHA_SALIDA = '2022-02-10';
        const ID_HABITACION = 1;
        const ID_CLIENTE = 1;

        navBar.clickBotonReservas();
        listarReserva.clickLinkListarReserva();
        listarReserva.clickBotonRegistrarReserva();
        crearReserva.clickLinkCrearReserva();

        crearReserva.ingresarFechaEntradaReserva(FECHA_ENTRADA);
        crearReserva.ingresarFechaSalidaReserva(FECHA_SALIDA);
        crearReserva.ingresarIdHabitacionReserva(ID_HABITACION);
        crearReserva.ingresarIdClienteReserva(ID_CLIENTE);

        crearReserva.clickBotonGuardarReserva();
    });
});
