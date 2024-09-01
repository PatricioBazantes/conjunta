import React from 'react';
import { useQuery, gql } from '@apollo/client';

// Consulta GraphQL para obtener empleados
const OBTENER_EMPLEADOS = gql`
  query {
    obtenerEmpleados {
      id
      nombre
    }
  }
`;

const Empleados = () => {
  const { loading, error, data } = useQuery(OBTENER_EMPLEADOS);

  if (loading) return <p>Cargando empleados...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Empleados</h2>
      <ul>
        {data.obtenerEmpleados.map(empleado => (
          <li key={empleado.id}>{empleado.nombre}</li>
        ))}
      </ul>
    </div>
  );
};

export default Empleados;
