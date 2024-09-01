const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Proyecto {
    id: ID!
    nombre: String!
  }

  type Empleado {
    id: ID!
    nombre: String!
  }

  type Tarea {
    id: ID!
    titulo: String!
    descripcion: String
    proyecto: Proyecto
    empleados: [Empleado]
  }

  type Query {
    obtenerProyectos: [Proyecto]
    obtenerEmpleados: [Empleado]
    obtenerTareas: [Tarea]
  }

  type Mutation {
    crearProyecto(nombre: String!): Proyecto
    crearEmpleado(nombre: String!): Empleado
    crearTarea(titulo: String!, descripcion: String, proyectoId: ID!): Tarea
    asignarEmpleadoATarea(tareaId: ID!, empleadoId: ID!): Tarea
    
    actualizarProyecto(id: ID!, nombre: String!): Proyecto
    eliminarProyecto(id: ID!): Boolean
    actualizarEmpleado(id: ID!, nombre: String!): Empleado
    eliminarEmpleado(id: ID!): Boolean
    actualizarTarea(id: ID!, titulo: String!, descripcion: String): Tarea
    eliminarTarea(id: ID!): Boolean
  }
`);

module.exports = schema;
