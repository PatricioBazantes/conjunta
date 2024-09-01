import React from 'react';
import { useQuery, gql } from '@apollo/client';

// Consulta GraphQL para obtener tareas
const OBTENER_TAREAS = gql`
  query {
    obtenerTareas {
      id
      titulo
      descripcion
      proyecto {
        id
        nombre
      }
      empleados {
        id
        nombre
      }
    }
  }
`;

const Tareas = () => {
  const { loading, error, data } = useQuery(OBTENER_TAREAS);

  if (loading) return <p>Cargando tareas...</p>;
  if (error) return <p>Error al cargar las tareas: {error.message}</p>;

  return (
    <div>
      <h2>Tareas</h2>
      {data.obtenerTareas.length === 0 ? (
        <p>No hay tareas disponibles.</p>
      ) : (
        <ul>
          {data.obtenerTareas.map(tarea => (
            <li key={tarea.id} style={{ marginBottom: '1em' }}>
              <div>
                <strong>Título:</strong> {tarea.titulo}
              </div>
              <div>
                <strong>Descripción:</strong> {tarea.descripcion || 'Descripción no disponible'}
              </div>
              <div>
                <strong>Proyecto:</strong> {tarea.proyecto ? tarea.proyecto.nombre : 'Nombre del proyecto no disponible'}
              </div>
              <div>
                <strong>Empleados:</strong> {tarea.empleados && tarea.empleados.length > 0 ? tarea.empleados.map(emp => emp.nombre).join(', ') : 'No asignado'}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Tareas;
