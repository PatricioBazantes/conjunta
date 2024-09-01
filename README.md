Gestión de Proyectos 

![alt text](/img_readme/image.png)




Este proyecto es una aplicación React que utiliza Apollo Client para interactuar con una API GraphQL. Permite crear y gestionar proyectos, empleados y tareas, así como asignar empleados a tareas específicas. A continuación se describe el funcionamiento y las características principales del proyecto.

Características
Crear Proyectos: Permite crear nuevos proyectos proporcionando un nombre.
Crear Empleados: Permite agregar nuevos empleados con un nombre.
Crear Tareas: Permite crear tareas asociadas a proyectos específicos con un título y una descripción.
Asignar Empleados a Tareas: Permite asignar empleados a tareas creadas previamente.

![alt text](/img_readme/image-1.png)

Instalación
Clonar el repositorio:

bash
Copiar código
git clone <URL del repositorio>
cd <nombre del repositorio>
Instalar dependencias:

npm install
Configurar Apollo Client: Asegúrate de configurar correctamente el cliente Apollo con la URL de tu servidor GraphQL.
Puedes ajustar esta configuración en el archivo src/apolloClient.js.

previo a iniciar el back se debe crear una base de datos Mysql con el nombre 

![alt text](/img_readme/image-12.png)

Para Iniciar el Backend desde la ubicacion de projecto-conjunta-backend>:

se debe ejecutar: node server.js

![alt text](/img_readme/image-14.png)

Iniciar el front desde la ubicacion de gestion-proyectos-frontend:

npm start

![alt text](/img_readme/image-13.png)

Crear Nuevos Proyectos:

Navega a la sección "Nuevo Proyecto".
Ingresa el nombre del proyecto y envía el formulario para crear un nuevo proyecto.

![alt text](/img_readme/image-2.png)

Agregar Nuevos Empleados:

Navega a la sección "Nuevo Empleado".
Ingresa el nombre del empleado y envía el formulario para agregar un nuevo empleado.

![alt text](/img_readme/image-3.png)

Crear Nuevas Tareas:

Navega a la sección "Crear Tarea".
Ingresa el título y la descripción de la tarea, así como el ID del proyecto al que pertenece, y envía el formulario para crear una nueva tarea.

![alt text](/img_readme/image-4.png)

Asignar Empleados a Tareas:

Después de crear una tarea, navega a la sección "Asignar Empleado a Tarea".
Selecciona el empleado y envía el formulario para asignar el empleado a la tarea correspondiente.

Consultas y Mutaciones GraphQL


Consultar Empleados:


query ObtenerEmpleados {
  empleados {
    id
    nombre
  }
}

![alt text](/img_readme/image-6.png)

Mutaciones:

Crear Proyecto:

graphql
Copiar código
mutation CrearProyecto($nombre: String!) {
  crearProyecto(nombre: $nombre) {
    id
    nombre
  }
}
Crear Empleado:

graphql
Copiar código
mutation CrearEmpleado($nombre: String!) {
  crearEmpleado(nombre: $nombre) {
    id
    nombre
  }
}
Crear Tarea:

graphql
Copiar código
mutation CrearTarea($titulo: String!, $descripcion: String, $proyectoId: ID!) {
  crearTarea(titulo: $titulo, descripcion: $descripcion, proyectoId: $proyectoId) {
    id
    titulo
    descripcion
    proyecto {
      id
      nombre
    }
  }
}

Asignar Empleado a Tarea:

graphql
Copiar código
mutation AsignarEmpleadoATarea($tareaId: ID!, $empleadoId: ID!) {
  asignarEmpleadoATarea(tareaId: $tareaId, empleadoId: $empleadoId) {
    id
    titulo
    descripcion
    empleados {
      id
      nombre
    }
  }
}


query ObtenerTareasConDetalles {
  obtenerTareas {
    id
    titulo
    proyecto {
      nombre
    }
    empleados {
      nombre
    }
  }
}

![alt text](/img_readme/image-5.png)

Descripción de la Base de Datos
La base de datos utilizada en este proyecto está diseñada para gestionar la información de proyectos, tareas y empleados en un sistema de gestión de proyectos. A continuación se detalla la estructura y las relaciones principales entre las entidades:

Entidades
Proyecto

ID: Identificador único del proyecto.
Nombre: Nombre del proyecto.
Empleado

![alt text](/img_readme/image-7.png)

ID: Identificador único del empleado.
Nombre: Nombre del empleado.
Tarea

ID: Identificador único de la tarea.
Título: Título de la tarea.
Descripción: Descripción detallada de la tarea (opcional).

![alt text](/img_readme/image-8.png)

Proyecto: Relación con el proyecto al que pertenece la tarea.
Empleados: Lista de empleados asignados a la tarea.

![alt text](/img_readme/image-9.png)


Relaciones
Tareas y Proyectos: Cada tarea está asociada a un proyecto específico. Esta relación permite que cada tarea pertenezca a un proyecto, facilitando la gestión y seguimiento de las tareas dentro de cada proyecto.

![alt text](/img_readme/image-10.png)

Tareas y Empleados: Las tareas pueden ser asignadas a uno o más empleados. La relación entre tareas y empleados permite gestionar la asignación de tareas y ver qué empleados están trabajando en cada tarea.

![alt text](/img_readme/image-11.png)