import { NavbarPage } from '../page/navbar/navbar.po';
import { ClienteListarPage } from '../page/cliente/cliente-listar.po';
import { ClienteCrearPage } from '../page/cliente/cliente-crear.po';

describe('workspace-project Cliente', () => {
    let navBar: NavbarPage;
    let cliente: ClienteListarPage;
    let crearCliente: ClienteCrearPage;

    beforeEach(() => {
        navBar = new NavbarPage();
        cliente = new ClienteListarPage();
        crearCliente = new ClienteCrearPage();
    });

    it('Deberia listar todos los clientes', async () => {
        navBar.clickBotonClientes();
        cliente.clickLinkListarCliente();

        expect(cliente.contarClientes()).toBeGreaterThanOrEqual(0);
    });

    it('Deberia crear un cliente', async () => {
        const NOMBRE = 'angela';
        const APELLIDO = 'prueba';
        const NUMERO_IDENTIFICACION = '54892';
        const TELEFONO = '45892';
        const CORREO = 'angelaPrueba@gmail.com';
        const GENERO = 'F';
        const FECHA_NACIMIENTO = '2000-07-20';
        const DIRECCION = 'cali';

        navBar.clickBotonClientes();
        cliente.clickLinkListarCliente();
        cliente.clickBotonRegistarCliente();
        crearCliente.clickLinkCrearCliente();

        crearCliente.ingresarNombreCliente(NOMBRE);
        crearCliente.ingresarApellidoCliente(APELLIDO);
        crearCliente.ingresarNumeroIdentificacionCliente(NUMERO_IDENTIFICACION);
        crearCliente.ingresarTelefonoCliente(TELEFONO);
        crearCliente.ingresarCorreoCliente(CORREO);
        crearCliente.ingresarSexoCliente(GENERO);
        crearCliente.ingresarFechaNacimientoCliente(FECHA_NACIMIENTO);
        crearCliente.ingresarDireccionCliente(DIRECCION);

        crearCliente.clickBotonGuardarCliente();
    });

    it('Deberia actualizar un cliente', async () => {
        const NOMBRE = 'angela';
        const APELLIDO = 'prueba';
        const NUMERO_IDENTIFICACION = '54892';
        const TELEFONO = '45892';
        const CORREO = 'angelaPrueba@gmail.com';
        const GENERO = 'F';
        const FECHA_NACIMIENTO = '2000-07-20';
        const DIRECCION = 'cali';

        navBar.clickBotonClientes();
        cliente.clickLinkListarCliente();
        cliente.clickBotonActualizar();
        crearCliente.clickLinkCrearCliente();

        crearCliente.ingresarNombreCliente(NOMBRE);
        crearCliente.ingresarApellidoCliente(APELLIDO);
        crearCliente.ingresarNumeroIdentificacionCliente(NUMERO_IDENTIFICACION);
        crearCliente.ingresarTelefonoCliente(TELEFONO);
        crearCliente.ingresarCorreoCliente(CORREO);
        crearCliente.ingresarSexoCliente(GENERO);
        crearCliente.ingresarFechaNacimientoCliente(FECHA_NACIMIENTO);
        crearCliente.ingresarDireccionCliente(DIRECCION);

        crearCliente.clickBotonEditarCliente();
    });

    it('Deberia eliminar un cliente', async () => {

        navBar.clickBotonClientes();
        cliente.eliminarCliente();

    });
});
