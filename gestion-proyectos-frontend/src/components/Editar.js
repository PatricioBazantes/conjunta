import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

// GraphQL Queries and Mutations
const OBTENER_PROYECTOS = gql`
  query {
    obtenerProyectos {
      id
      nombre
    }
  }
`;

const OBTENER_EMPLEADOS = gql`
  query {
    obtenerEmpleados {
      id
      nombre
    }
  }
`;

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

const ACTUALIZAR_PROYECTO = gql`
  mutation ActualizarProyecto($id: ID!, $nombre: String!) {
    actualizarProyecto(id: $id, nombre: $nombre) {
      id
      nombre
    }
  }
`;

const ELIMINAR_PROYECTO = gql`
  mutation EliminarProyecto($id: ID!) {
    eliminarProyecto(id: $id)
  }
`;

const ACTUALIZAR_EMPLEADO = gql`
  mutation ActualizarEmpleado($id: ID!, $nombre: String!) {
    actualizarEmpleado(id: $id, nombre: $nombre) {
      id
      nombre
    }
  }
`;

const ELIMINAR_EMPLEADO = gql`
  mutation EliminarEmpleado($id: ID!) {
    eliminarEmpleado(id: $id)
  }
`;

const ACTUALIZAR_TAREA = gql`
  mutation ActualizarTarea($id: ID!, $titulo: String!, $descripcion: String) {
    actualizarTarea(id: $id, titulo: $titulo, descripcion: $descripcion) {
      id
      titulo
      descripcion
    }
  }
`;

const ELIMINAR_TAREA = gql`
  mutation EliminarTarea($id: ID!) {
    eliminarTarea(id: $id)
  }
`;

const Editar = () => {
  const { loading: loadingProyectos, data: dataProyectos } = useQuery(OBTENER_PROYECTOS);
  const { loading: loadingEmpleados, data: dataEmpleados } = useQuery(OBTENER_EMPLEADOS);
  const { loading: loadingTareas, data: dataTareas } = useQuery(OBTENER_TAREAS);

  const [actualizarProyecto] = useMutation(ACTUALIZAR_PROYECTO);
  const [eliminarProyecto] = useMutation(ELIMINAR_PROYECTO);
  const [actualizarEmpleado] = useMutation(ACTUALIZAR_EMPLEADO);
  const [eliminarEmpleado] = useMutation(ELIMINAR_EMPLEADO);
  const [actualizarTarea] = useMutation(ACTUALIZAR_TAREA);
  const [eliminarTarea] = useMutation(ELIMINAR_TAREA);

  const [editingProyecto, setEditingProyecto] = useState(null);
  const [editingEmpleado, setEditingEmpleado] = useState(null);
  const [editingTarea, setEditingTarea] = useState(null);

  const handleUpdate = async (id, newData, updateFunction) => {
    await updateFunction({ variables: { id, ...newData } });
    setEditingProyecto(null);
    setEditingEmpleado(null);
    setEditingTarea(null);
  };

  const handleDelete = async (id, deleteFunction) => {
    await deleteFunction({ variables: { id } });
  };

  if (loadingProyectos || loadingEmpleados || loadingTareas) return <p>Cargando datos...</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Editar y Eliminar Elementos</h2>
      
      {/* Proyectos */}
      <div style={styles.editSection}>
        <h3 style={styles.subheading}>Proyectos</h3>
        <ul style={styles.list}>
          {dataProyectos.obtenerProyectos.map(proyecto => (
            <li key={proyecto.id} style={styles.listItem}>
              {editingProyecto === proyecto.id ? (
                <div style={styles.editContainer}>
                  <input
                    type="text"
                    value={proyecto.nombre}
                    onChange={(e) => handleUpdate(proyecto.id, { nombre: e.target.value }, actualizarProyecto)}
                    style={styles.input}
                  />
                  <button 
                    type="button" 
                    onClick={() => handleUpdate(proyecto.id, { nombre: proyecto.nombre }, actualizarProyecto)}
                    style={styles.button}
                  >
                    Guardar
                  </button>
                </div>
              ) : (
                <div style={styles.itemContainer}>
                  <span style={styles.itemText}>{proyecto.nombre}</span>
                  <button 
                    type="button" 
                    onClick={() => setEditingProyecto(proyecto.id)}
                    style={styles.button}
                  >
                    Editar
                  </button>
                  <button 
                    type="button" 
                    onClick={() => handleDelete(proyecto.id, eliminarProyecto)}
                    style={styles.button}
                  >
                    Eliminar
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      
      {/* Empleados */}
      <div style={styles.editSection}>
        <h3 style={styles.subheading}>Empleados</h3>
        <ul style={styles.list}>
          {dataEmpleados.obtenerEmpleados.map(empleado => (
            <li key={empleado.id} style={styles.listItem}>
              {editingEmpleado === empleado.id ? (
                <div style={styles.editContainer}>
                  <input
                    type="text"
                    value={empleado.nombre}
                    onChange={(e) => handleUpdate(empleado.id, { nombre: e.target.value }, actualizarEmpleado)}
                    style={styles.input}
                  />
                  <button 
                    type="button" 
                    onClick={() => handleUpdate(empleado.id, { nombre: empleado.nombre }, actualizarEmpleado)}
                    style={styles.button}
                  >
                    Guardar
                  </button>
                </div>
              ) : (
                <div style={styles.itemContainer}>
                  <span style={styles.itemText}>{empleado.nombre}</span>
                  <button 
                    type="button" 
                    onClick={() => setEditingEmpleado(empleado.id)}
                    style={styles.button}
                  >
                    Editar
                  </button>
                  <button 
                    type="button" 
                    onClick={() => handleDelete(empleado.id, eliminarEmpleado)}
                    style={styles.button}
                  >
                    Eliminar
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Tareas */}
      <div style={styles.editSection}>
        <h3 style={styles.subheading}>Tareas</h3>
        <ul style={styles.list}>
          {dataTareas.obtenerTareas.map(tarea => (
            <li key={tarea.id} style={styles.listItem}>
              {editingTarea === tarea.id ? (
                <div style={styles.editContainer}>
                  <input
                    type="text"
                    value={tarea.titulo}
                    onChange={(e) => handleUpdate(tarea.id, { titulo: e.target.value }, actualizarTarea)}
                    style={styles.input}
                  />
                  <textarea
                    value={tarea.descripcion}
                    onChange={(e) => handleUpdate(tarea.id, { descripcion: e.target.value }, actualizarTarea)}
                    style={styles.textarea}
                  ></textarea>
                  <button 
                    type="button" 
                    onClick={() => handleUpdate(tarea.id, { titulo: tarea.titulo, descripcion: tarea.descripcion }, actualizarTarea)}
                    style={styles.button}
                  >
                    Guardar
                  </button>
                </div>
              ) : (
                <div style={styles.itemContainer}>
                  <div><strong>Título:</strong> {tarea.titulo}</div>
                  <div><strong>Descripción:</strong> {tarea.descripcion}</div>
                  <button 
                    type="button" 
                    onClick={() => setEditingTarea(tarea.id)}
                    style={styles.button}
                  >
                    Editar
                  </button>
                  <button 
                    type="button" 
                    onClick={() => handleDelete(tarea.id, eliminarTarea)}
                    style={styles.button}
                  >
                    Eliminar
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
  },
  heading: {
    textAlign: 'center',
    color: '#333'
  },
  editSection: {
    marginBottom: '20px'
  },
  subheading: {
    borderBottom: '2px solid #007bff',
    paddingBottom: '10px',
    color: '#007bff'
  },
  list: {
    listStyleType: 'none',
    padding: 0
  },
  listItem: {
    backgroundColor: '#fff',
    padding: '10px',
    borderRadius: '4px',
    marginBottom: '10px',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)'
  },
  itemContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  itemText: {
    flex: 1
  },
  editContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  input: {
    padding: '8px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd'
  },
  textarea: {
    padding: '8px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    height: '80px'
  },
  button: {
    padding: '8px 12px',
    margin: '0 5px',
    border: 'none',
    borderRadius: '4px',
    color: '#fff',
    backgroundColor: '#007bff',
    cursor: 'pointer',
    fontSize: '14px'
  }
};

export default Editar;
