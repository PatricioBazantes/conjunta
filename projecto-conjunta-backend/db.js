const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('prueba', 'root', '123', {
  host: 'localhost',
  dialect: 'mysql',
  logging: console.log // Activa el logging de consultas SQL
});

// Modelos
const Proyecto = sequelize.define('Proyecto', {
  nombre: { type: DataTypes.STRING, allowNull: false }
}, { tableName: 'proyectos' });

const Empleado = sequelize.define('Empleado', {
  nombre: { type: DataTypes.STRING, allowNull: false }
}, { tableName: 'empleados' });

const Tarea = sequelize.define('Tarea', {
  titulo: { type: DataTypes.STRING, allowNull: false },
  descripcion: DataTypes.TEXT
}, { tableName: 'tareas' });

const TareaEmpleado = sequelize.define('TareaEmpleado', {}, { tableName: 'tarea_empleados' });

// Definición de relaciones
Proyecto.hasMany(Tarea, { foreignKey: 'proyectoId', as: 'tareas' });
Tarea.belongsTo(Proyecto, { foreignKey: 'proyectoId', as: 'proyecto' });

Tarea.belongsToMany(Empleado, { through: TareaEmpleado, as: 'empleados', foreignKey: 'tareaId' });
Empleado.belongsToMany(Tarea, { through: TareaEmpleado, as: 'tareas', foreignKey: 'empleadoId' });

module.exports = { sequelize, Proyecto, Empleado, Tarea, TareaEmpleado };
