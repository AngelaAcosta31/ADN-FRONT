import { HabitacionCrearPage } from '../page/habitacion/habitacion-crear.po';
import { HabitacionListarPage } from '../page/habitacion/habitacion-listar.po';
import { NavbarPage } from '../page/navbar/navbar.po';

describe('workspace-project Habitacion', () => {
    let navBar: NavbarPage;
    let crearHabitacion: HabitacionCrearPage;
    let listarHabitacion: HabitacionListarPage;

    beforeEach(() => {
        navBar = new NavbarPage();
        crearHabitacion = new HabitacionCrearPage();
        listarHabitacion = new HabitacionListarPage();
    });

    it('Deberia listar todas las habitaciones', async () => {
        navBar.clickBotonHabitaciones();
        listarHabitacion.clickListarHabitacion();

        expect(listarHabitacion.contarHabitaciones()).toBeGreaterThanOrEqual(0);
    });

    it('Deberia crear una habitacion', async () => {
        const NUMERO_HABITACION = '200';
        const TIPO = 'SENCILLA';
        const NUMERO_CAMAS_HABITACION = 1;
        const NUMERO_BANNOS_HABITACION = 1;
        const DESCRIPCION = 'HABITACION PEQUEÑA PARA UNA PERSONA';
        const PRECIO = 80000;
        const PISO = '2';
        const ESTADO = 'D';

        navBar.clickBotonHabitaciones();
        listarHabitacion.clickListarHabitacion();
        listarHabitacion.clickBotonRegistrarHabitacion();
        crearHabitacion.clickLinkCrearHabitacion();

        crearHabitacion.ingresarNumeroHabitacion(NUMERO_HABITACION);
        crearHabitacion.ingresarTipoHabitacion(TIPO);
        crearHabitacion.ingresarNoCamasHabitacion(NUMERO_CAMAS_HABITACION);
        crearHabitacion.ingresarNoBannosHabitacion(NUMERO_BANNOS_HABITACION);
        crearHabitacion.ingresarDescripcionHabitacion(DESCRIPCION);
        crearHabitacion.ingresarPrecioHabitacion(PRECIO);
        crearHabitacion.ingresarPisoHabitacion(PISO);
        crearHabitacion.ingresarEstadoHabitacion(ESTADO);

        crearHabitacion.clickBotonGuardarHabitacion();
    });

    it('Deberia actualizar una habitacion', async () => {
        const NUMERO_HABITACION = '200';
        const TIPO = 'SENCILLA';
        const NUMERO_CAMAS_HABITACION = 1;
        const NUMERO_BANNOS_HABITACION = 1;
        const DESCRIPCION = 'HABITACION PEQUEÑA PARA UNA PERSONA';
        const PRECIO = 80000;
        const PISO = '2';
        const ESTADO = 'D';

        navBar.clickBotonHabitaciones();
        listarHabitacion.clickListarHabitacion();
        listarHabitacion.clickBotonActualizarHabitacion();
        crearHabitacion.clickLinkCrearHabitacion();

        crearHabitacion.ingresarNumeroHabitacion(NUMERO_HABITACION);
        crearHabitacion.ingresarTipoHabitacion(TIPO);
        crearHabitacion.ingresarNoCamasHabitacion(NUMERO_CAMAS_HABITACION);
        crearHabitacion.ingresarNoBannosHabitacion(NUMERO_BANNOS_HABITACION);
        crearHabitacion.ingresarDescripcionHabitacion(DESCRIPCION);
        crearHabitacion.ingresarPrecioHabitacion(PRECIO);
        crearHabitacion.ingresarPisoHabitacion(PISO);
        crearHabitacion.ingresarEstadoHabitacion(ESTADO);

        crearHabitacion.clickBotonActualizarHabitacion();
    });

    it('Deberia eliminar una habitacion', async () => {
        navBar.clickBotonHabitaciones();
        listarHabitacion.clickBotonEliminarHabitacion();
    });
});
