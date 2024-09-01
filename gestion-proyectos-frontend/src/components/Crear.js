import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

// Definir las mutaciones GraphQL
const CREAR_PROYECTO = gql`
  mutation CrearProyecto($nombre: String!) {
    crearProyecto(nombre: $nombre) {
      id
      nombre
    }
  }
`;

const CREAR_EMPLEADO = gql`
  mutation CrearEmpleado($nombre: String!) {
    crearEmpleado(nombre: $nombre) {
      id
      nombre
    }
  }
`;

const CREAR_TAREA = gql`
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
`;

const Crear = () => {
  const [nombreProyecto, setNombreProyecto] = useState('');
  const [nombreEmpleado, setNombreEmpleado] = useState('');
  const [tituloTarea, setTituloTarea] = useState('');
  const [descripcionTarea, setDescripcionTarea] = useState('');
  const [proyectoId, setProyectoId] = useState('');

  const [crearProyecto] = useMutation(CREAR_PROYECTO);
  const [crearEmpleado] = useMutation(CREAR_EMPLEADO);
  const [crearTarea] = useMutation(CREAR_TAREA);

  const handleCrearProyecto = async (e) => {
    e.preventDefault();
    try {
      await crearProyecto({ variables: { nombre: nombreProyecto } });
      setNombreProyecto('');
    } catch (err) {
      console.error('Error al crear proyecto', err);
    }
  };

  const handleCrearEmpleado = async (e) => {
    e.preventDefault();
    try {
      await crearEmpleado({ variables: { nombre: nombreEmpleado } });
      setNombreEmpleado('');
    } catch (err) {
      console.error('Error al crear empleado', err);
    }
  };

  const handleCrearTarea = async (e) => {
    e.preventDefault();
    try {
      await crearTarea({ variables: { titulo: tituloTarea, descripcion: descripcionTarea, proyectoId } });
      setTituloTarea('');
      setDescripcionTarea('');
      setProyectoId('');
    } catch (err) {
      console.error('Error al crear tarea', err);
    }
  };

  return (
    <div className="crear-section" style={styles.container}>
      <h2 style={styles.header}>Crear Nuevos Elementos</h2>
      <div className="crear-element" style={styles.element}>
        <h3 style={styles.subHeader}>Nuevo Proyecto</h3>
        <form onSubmit={handleCrearProyecto} style={styles.form}>
          <label style={styles.label}>Nombre del proyecto</label>
          <input
            type="text"
            placeholder="Nombre del proyecto"
            value={nombreProyecto}
            onChange={(e) => setNombreProyecto(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Crear Proyecto</button>
        </form>
      </div>
      <div className="crear-element" style={styles.element}>
        <h3 style={styles.subHeader}>Nuevo Empleado</h3>
        <form onSubmit={handleCrearEmpleado} style={styles.form}>
          <label style={styles.label}>Nombre del empleado</label>
          <input
            type="text"
            placeholder="Nombre del empleado"
            value={nombreEmpleado}
            onChange={(e) => setNombreEmpleado(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Crear Empleado</button>
        </form>
      </div>
      <div className="crear-element" style={styles.element}>
        <h3 style={styles.subHeader}>Crear Tarea</h3>
        <form onSubmit={handleCrearTarea} style={styles.form}>
          <label style={styles.label}>Título de la tarea</label>
          <input
            type="text"
            placeholder="Título de la tarea"
            value={tituloTarea}
            onChange={(e) => setTituloTarea(e.target.value)}
            style={styles.input}
          />
          <label style={styles.label}>Descripción de la tarea</label>
          <textarea
            placeholder="Descripción de la tarea"
            value={descripcionTarea}
            onChange={(e) => setDescripcionTarea(e.target.value)}
            style={styles.textarea}
          ></textarea>
          <label style={styles.label}>ID del proyecto</label>
          <input
            type="text"
            placeholder="ID del proyecto"
            value={proyectoId}
            onChange={(e) => setProyectoId(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Crear Tarea</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  element: {
    marginBottom: '20px',
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#fff',
  },
  subHeader: {
    marginBottom: '10px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  label: {
    fontWeight: 'bold',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  textarea: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    height: '100px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  }
};

export default Crear;
