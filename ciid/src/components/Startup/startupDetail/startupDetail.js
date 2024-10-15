import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './startupDetail.scss';
import logo from "../../../img/startup.jpg";

const StartupDetail = () => {
    const { id } = useParams();
    const [startup, setStartup] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStartupDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/startups/read/${id}`);
                setStartup(response.data);
            } catch (error) {
                console.error('Error fetching startup details:', error);
            }
        };

        fetchStartupDetail();
    }, [id]);

    if (!startup) return <div>Cargando...</div>;

    return (
        <div className="startup-detail-container">

            <div className="startup-header-card startup-card">
                <div className="startup-logo">
                    <img src={logo} alt="Startup Logo" className="logo-img" />
                </div>
                <div className="startup-name-container">
                    <h1 className="startup-name-label">Nombre:</h1>
                    <h2 className="startup-name">{startup.name}</h2>
                </div>
                <button 
                    className="back-button" 
                    onClick={() => navigate('/startup')}
                >
                    Regresar
                </button>
            </div>
            <hr className="separator" />

            <div className="startup-info-card startup-card">
                <h2>Información de la Startup</h2>
                <div className="startup-description">
                    <p><strong style={{ color: '#3F51B5' }}>Fecha de Fundación:</strong> {new Date(startup.foundedDate).toLocaleDateString()}</p>
                    <p><strong style={{ color: '#3F51B5' }}>Ubicación:</strong> {startup.location}</p>
                    <p><strong style={{ color: '#3F51B5' }}>Categoría:</strong> {startup.category}</p>
                    <p><strong style={{ color: '#3F51B5' }}>Inversión Recibida:</strong> ${startup.investmentReceived.toLocaleString()}</p>
                    <p><strong style={{ color: '#3F51B5' }}>Descripción:</strong> {startup.description}</p>
                    <p><strong style={{ color: '#3F51B5' }}>Número de Empleados:</strong> {startup.employees}</p>
                </div>
            </div>
        </div>
    );
};

export default StartupDetail;
