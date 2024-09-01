import React from 'react';
import { useQuery, gql } from '@apollo/client';

// Consulta GraphQL para obtener proyectos
const OBTENER_PROYECTOS = gql`
  query {
    obtenerProyectos {
      id
      nombre
    }
  }
`;

const Proyectos = () => {
  const { loading, error, data } = useQuery(OBTENER_PROYECTOS);

  if (loading) return <p>Cargando proyectos...</p>;
  if (error) return <p>Error al cargar los proyectos: {error.message}</p>;

  return (
    <div>
      <h2>Proyectos</h2>
      {data.obtenerProyectos.length > 0 ? (
        <ul>
          {data.obtenerProyectos.map(proyecto => (
            <li key={proyecto.id}>{proyecto.nombre}</li>
          ))}
        </ul>
      ) : (
        <p>No hay proyectos disponibles.</p>
      )}
    </div>
  );
};

export default Proyectos;
