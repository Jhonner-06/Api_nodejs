import React, { useState, useEffect } from 'react';

function App() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [nuevo, setNuevo] = useState({ nombre: '', apellido: '', edad: '', rol: 'false' });
  const url = "http://localhost/api/estudiantes";

  // Mostrar estudiantes
  const getEstudiantes = async () => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setEstudiantes(data);
    } catch (err) { console.error("API apagada o error de CORS", err); }
  };

  useEffect(() => { getEstudiantes(); }, []);

  // Crea estudiante
  const guardar = async (e) => {
    e.preventDefault();
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevo)
    });
    getEstudiantes(); 
    setNuevo({ nombre: '', apellido: '', edad: '', rol: 'false' });
  };
  //Elimina estudiantes
  const eliminar = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este estudiante?")) {
      try {
        await fetch(`${url}/${id}`, {
          method: 'DELETE'
        });
        getEstudiantes(); // Recargar la lista después de borrar
      } catch (err) {
        console.error("Error al eliminar", err);
      }
    }
  };
  return (
    <div className="container" style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Estudiantes</h1>
      
      <form className="estudiante" onSubmit={guardar} style={{ marginBottom: '20px' }}>
        <input placeholder="Nombre" value={nuevo.nombre} onChange={e => setNuevo({...nuevo, nombre: e.target.value})} required />
        <input placeholder="Apellido" value={nuevo.apellido} onChange={e => setNuevo({...nuevo, apellido: e.target.value})} required />
        <input placeholder="Edad" value={nuevo.edad} onChange={e => setNuevo({...nuevo, edad: e.target.value})} required />
       
        <button type="submit" className='btn-agregar'>Agregar</button>
      </form>

      <table className='table-container' border="1" width="100%" style={{ textAlign: 'left' }}>
        <thead>
          <tr><th>ID</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Edad</th></tr>
        </thead>
        <tbody>
          {estudiantes.map(est => (
            <tr key={est.id}>
              <td>{est.id}</td>
              <td>{est.nombre || est.name}</td>
              <td>{est.apellido}</td>
              <td>{est.edad}</td>
              <button className='btn-eliminar'
              onClick={
                () => eliminar(est.id)
              }>eliminar</button>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;