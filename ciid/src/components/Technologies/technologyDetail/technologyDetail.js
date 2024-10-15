import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './technologyDetail.scss';
import logo from "../../../img/technologies.png";

const TechnologyDetail = () => {
    const { id } = useParams();
    const [technology, setTechnology] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTechnologyDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/technologies/read/${id}`);
                setTechnology(response.data);
            } catch (error) {
                console.error('Error fetching technology details:', error);
            }
        };

        fetchTechnologyDetail();
    }, [id]);

    if (!technology) return <div>Cargando...</div>;

    return (
        <div className="technology-detail-container">
            <div className="technology-header-card technology-card">
                <div className="technology-logo">
                    <img src={logo} alt="Technology Logo" className="logo-img" />
                </div>
                <div className="technology-name-container">
                    <h1 className="technology-name-label">Nombre:</h1>
                    <h2 className="technology-name">{technology.name}</h2>
                </div>
                <button 
                    className="back-button" 
                    onClick={() => navigate('/technology')}
                >
                    Regresar
                </button>
            </div>
            <hr className="separator" />

            <div className="technology-info-card technology-card">
                <h2>Información de la Tecnología</h2>
                <div className="technology-description">
                    <p><strong style={{ color: '#3F51B5' }}>Fecha de Creación:</strong> {new Date(technology.createdDate).toLocaleDateString()}</p>
                    <p><strong style={{ color: '#3F51B5' }}>Descripción:</strong> {technology.description}</p>
                    <p><strong style={{ color: '#3F51B5' }}>Sector:</strong> {technology.sector}</p>
                    <p><strong style={{ color: '#3F51B5' }}>Estado de Adopción:</strong> {technology.adoptionStatus}</p>
                    <p><strong style={{ color: '#3F51B5' }}>Uso Actual:</strong> {technology.currentUsage}</p>
                    <p><strong style={{ color: '#3F51B5' }}>Costo de Implementación:</strong> ${technology.implementationCost.toLocaleString()}</p>
                    <p><strong style={{ color: '#3F51B5' }}>Nivel de Madurez:</strong> {technology.maturityLevel}</p>
                </div>
            </div>
        </div>
    );
};

export default TechnologyDetail;
