## Observaciones

El proyecto se divide en dos carpetas, server y test.

En test se encuentra todo el código relacionado al frontend, hecho con React.

El servidor está hecho para servir como proxy, ya que hay un fallo de cors al hacer request a la Api de BitMEX desde el cliente.

### Recomendaciones

- Correr el frontend usando ```yarn``` y el servidor con ```npm```.
- El servidor corre por defecto en el puerto 4000.

### Estructura de carpetas - Frontend (/test)

├───📁 src/ `Directorio del codigo fuente del proyecto`<br />
│ ├───📁 api/ `Manejo de peticiones HTTP` <br />
│ ├───📁 components/ `Classes de la aplicación` <br />
│ │     │───📄 Instruments.tsx `Componente para filtrar los instruments` <br />
│ │     │───📄 OrderBooks.tsx `Componente para filtrar los OrderBooks` <br />
│ ├───📁 context/ `Contexto de la app para manejar los datos de socket`<br />
│ │     │───📄 AppContext.tsx `Definición del contexto` <br />
│ │     │───📄 AppProvider.tsx `Componente proveedor del contexto que contiene toda la lógica` <br />
│ │     │───📄 appReducer.ts `Reducer del contexto que maneja el estado` <br />
│ ├───📁 helpers/ `Carpeta para las funciones genéricas` <br />
│ │     │───📄 filterArray.ts `Función para filtrar por busqueda en array` <br />
│ │     │───📄 orderArray.ts `Función para ordenar un array` <br />
│ ├───📁 interfaces/ `Interfaces y tipos TypeScript` <br />
│ └───📄 App.tsx `Componente principal`<br />
