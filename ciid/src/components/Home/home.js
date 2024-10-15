import React from 'react';
import './home.scss';

const home = () => {
    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Bienvenido a CRUD de Startups y Tecnologías</h1>
            </header>

            <main className="card">
                <section className="home-welcome">
                    <h2>¡Bienvenido!</h2>
                    <p className="home-welcome-message">
                        Esta aplicación te permite gestionar información sobre startups y tecnologías innovadoras. 
                        Puedes crear, leer, actualizar y eliminar datos fácilmente.
                    </p>
                </section>

                <section className="home-info">
                    <h2>¿Qué puedes hacer?</h2>
                    <p className="home-description">
                        Explora las secciones para comenzar a gestionar tu información sobre startups y tecnologías.
                    </p>
                </section>

                <section className="home-table-section">
                    <h2>Funcionalidades</h2>
                    <ul>
                        <li><strong>Crear:</strong> Agrega nuevas startups y tecnologías a la base de datos.</li>
                        <li><strong>Leer:</strong> Consulta la lista de startups y tecnologías almacenadas.</li>
                        <li><strong>Actualizar:</strong> Modifica la información de las startups y tecnologías existentes.</li>
                        <li><strong>Eliminar:</strong> Elimina startups y tecnologías que ya no sean necesarias.</li>
                    </ul>
                </section>
            </main>
        </div>
    );
};

export default home;
