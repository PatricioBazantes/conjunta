// src/components/Principal.js
import React from 'react';

// Estilos en el mismo archivo
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f8f9fa',
    textAlign: 'center',
  },
  title: {
    fontSize: '3em',
    margin: '0',
    color: '#007bff',
  },
  subtitle: {
    fontSize: '1.5em',
    margin: '10px 0',
    color: '#6c757d',
  },
  text: {
    fontSize: '1.2em',
    color: '#343a40',
  },
};

const Principal = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Bienvenido a la Gestión de Proyectos</h1>
      <h2 style={styles.subtitle}>Sistema de Administración de Proyectos, Empleados y Tareas</h2>
      <p style={styles.text}>
        Aquí podrás gestionar todos tus proyectos, asignar tareas y mantener un control eficiente sobre tus empleados.
      </p>
    </div>
  );
};

export default Principal;
