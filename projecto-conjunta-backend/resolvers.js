const { Proyecto, Empleado, Tarea, TareaEmpleado } = require('./db');

const root = {
  // Queries
  obtenerProyectos: () => Proyecto.findAll(),
  obtenerEmpleados: () => Empleado.findAll(),
  obtenerTareas: async () => {
    const tareas = await Tarea.findAll({
      include: [
        { model: Proyecto, as: 'proyecto' },
        { model: Empleado, as: 'empleados' }
      ]
    });
    console.log('Tareas con datos relacionados:', JSON.stringify(tareas, null, 2));
    return tareas;
  },

  // Mutations
  crearProyecto: ({ nombre }) => Proyecto.create({ nombre }),
  crearEmpleado: ({ nombre }) => Empleado.create({ nombre }),
  crearTarea: ({ titulo, descripcion, proyectoId }) => Tarea.create({ titulo, descripcion, proyectoId }),
  asignarEmpleadoATarea: async ({ tareaId, empleadoId }) => {
    const tarea = await Tarea.findByPk(tareaId);
    const empleado = await Empleado.findByPk(empleadoId);
    await tarea.addEmpleado(empleado);
    return tarea;
  },

  // Update Mutations
  actualizarProyecto: async ({ id, nombre }) => {
    const proyecto = await Proyecto.findByPk(id);
    if (!proyecto) throw new Error('Proyecto no encontrado');
    proyecto.nombre = nombre;
    await proyecto.save();
    return proyecto;
  },
  
  actualizarEmpleado: async ({ id, nombre }) => {
    const empleado = await Empleado.findByPk(id);
    if (!empleado) throw new Error('Empleado no encontrado');
    empleado.nombre = nombre;
    await empleado.save();
    return empleado;
  },

  actualizarTarea: async ({ id, titulo, descripcion }) => {
    const tarea = await Tarea.findByPk(id);
    if (!tarea) throw new Error('Tarea no encontrada');
    tarea.titulo = titulo;
    tarea.descripcion = descripcion;
    await tarea.save();
    return tarea;
  },

  // Delete Mutations
  eliminarProyecto: async ({ id }) => {
    const proyecto = await Proyecto.findByPk(id);
    if (!proyecto) throw new Error('Proyecto no encontrado');
    await proyecto.destroy();
    return true;
  },

  eliminarEmpleado: async ({ id }) => {
    const empleado = await Empleado.findByPk(id);
    if (!empleado) throw new Error('Empleado no encontrado');
    await empleado.destroy();
    return true;
  },

  eliminarTarea: async ({ id }) => {
    const tarea = await Tarea.findByPk(id);
    if (!tarea) throw new Error('Tarea no encontrada');
    await tarea.destroy();
    return true;
  }
};

module.exports = root;
