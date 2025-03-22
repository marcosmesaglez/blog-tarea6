# BlogTarea6

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.5.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


- Utilizo los iconos de la librería 'bootstrap-icons'
- En la documentación de la API: en el GET pone que la key de los datos es 'data' pero me da la sensación de que es 'results'.
- El id que se envía en las URLs es _id, no id como tal. Sino no funciona. Lo he probado a hacer tal y como lo dice el ejercicio pero no me funciona.
- Tengo una duda en la lista de usuarios, no se si hay que poner el username o el nombre+apellido. Si fue eso último simplemente haría dos cosas:
    - Hacer el método 'get fullUserName()' en la clase User.
    - Juntarlo en el HTML: {{user.first_name}} {{user.last_name}}
- Para la lista de usuarios en el word de la tarea pone que debemos utilizar GRID. Por si las moscas he dejado un código comentado simplemente por si en caso de ser necesario utilizar la librería o si por el contrario fuera sin ella.
- Dejo paginada la petición de los usuarios, creo que no se especifica en la tarea pero lo hago por si acaso.
- He utilizado la librería sweetalert2 para los diálogos.
- En los servicios, para tipar las respuestas he utilizado los 'utility types'. Últimamente no he podido estar siguiendo las clases por lo que no se si es algo que preferís que no se utilice o viceversa.
-Los errores de las request están gestionados, lo único que la app no devuelve un 400 o un 500 cuando hay algún error, sino que devuelve un 200 y un mensaje. Lo dejo gestionado de esta forma.