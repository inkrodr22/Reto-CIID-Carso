import { useEffect, useState, useMemo } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { createTechnology, updateTechnology } from "../../api/technologies";
import Swal from 'sweetalert2';

const TechnologiesForm = ({ initialData, onHide, onSuccess }) => {
  const [name, setName] = useState("");
  const [selectedSector, setSector] = useState(null);
  const [createdDate, setcreatedDate] = useState(null);
  const [adoptionStatus, setadoptionStatus] = useState("");
  const [currentUsage, setCurrentUsage] = useState("");
  const [implementationCost, setimplementionCost] = useState(null);
  const [description, setDescription] = useState("");
  const [maturityLevel, setmaturyLevel] = useState("");

  const sectors = useMemo(
    () => [
      { name: "Telecomunicaciones", code: "Telecomunicaciones" },
      { name: "Tecnología Financiera", code: "Ciencia y Tecnología" },
      { name: "Tecnología de la información", code: "Tecnología de la información" },
      { name: "Entretenimiento", code: "Entretenimiento" },
      { name: "Finanzas", code: "Finanzas" },
    ],
    []
  );

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setcreatedDate(new Date(initialData.createdDate));
      setadoptionStatus(initialData.adoptionStatus);
      setCurrentUsage(initialData.currentUsage);
      setSector(
        sectors.find((cat) => cat.code === initialData.sector)
      );
      setimplementionCost(initialData.implementationCost);
      setDescription(initialData.description);
      setmaturyLevel(initialData.maturityLevel);
    }
  }, [initialData, sectors]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name,
      sector: selectedSector ? selectedSector.code : "",
      createdDate,
      description,
      adoptionStatus,
      currentUsage,
      implementationCost,
      maturityLevel
    };

    try {
      if (initialData) {
        const id = initialData._id;
        await updateTechnology(id, formData);
        console.log("Actualizar la startup:", formData);
        Swal.fire({
          title: 'Éxito!',
          text: 'La startup ha sido actualizada correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        onSuccess(formData);
      } else {
        await createTechnology(formData);
        console.log("Tecnologia creada correctamente");
        Swal.fire({
          title: 'Éxito!',
          text: 'La Tecnologia ha sido creada correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        onSuccess();
        onHide();
      }
    } catch (error) {

      console.error("Error creando o editando la tecnologia:", error);
      onHide();

      const errorMessage = error.response?.data?.message || 'Hubo un problema al crear o actualizar la tecnologia. Por favor, intenta nuevamente.';
      
      Swal.fire({
        title: 'Error!',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="name">Nombre</label>
          <InputText
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ingresa el nombre"
            required
            disabled={!!initialData}
          />
        </div>
        <div className="form-field">
          <label htmlFor="foundedDate">Fecha de Creación</label>
          <Calendar
            id="createdDate"
            value={createdDate}
            onChange={(e) => setcreatedDate(e.value)}
            dateFormat="dd/mm/yy"
            placeholder="Selecciona la fecha"
            showIcon
            required
            disabled={!!initialData}
          />
        </div>
        <div className="form-field">
          <label htmlFor="adoptionStatus">Estado de adopcion</label>
          <InputText
            id="adoptionStatus"
            value={adoptionStatus}
            onChange={(e) => setadoptionStatus(e.target.value)}
            placeholder="Ingresa el tipo de adopcion"
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="sector">Sector</label>
          <Dropdown
            id="sector"
            value={selectedSector}
            options={sectors}
            onChange={(e) => setSector(e.value)}
            optionLabel="name"
            placeholder="Selecciona una categoría"
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="implementationCost">Costo de Implementacion</label>
          <InputNumber
            id="implementationCost"
            value={implementationCost}
            onValueChange={(e) => setimplementionCost(e.value)}
            mode="currency"
            currency="USD"
            placeholder="0.00"
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="maturityLevel">Nivel de madruez</label>
          <InputText
            id="maturityLevel"
            value={maturityLevel}
            onChange={(e) => setmaturyLevel(e.target.value)}
            placeholder="Inserte el nivel de madurez"
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="currentUsage">Uso actual</label>
          <InputText
            id="currentUsage"
            value={currentUsage}
            onChange={(e) => setCurrentUsage(e.target.value)}
            placeholder="inserte el uso actual"
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="description">Descripción</label>
          <InputTextarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            required
          />
        </div>
        <div className="footer">
          <Button type="button" label="Cancelar" onClick={onHide} className="cancel-button" />
          <Button 
            type="submit" 
            className="submit-button"
            label={initialData ? "Actualizar" : "Crear"} 
            disabled={!name || !createdDate || !adoptionStatus || !selectedSector || !implementationCost || !description || maturityLevel < 0}
          />
        </div>
      </form>
    </div>
  );
};

export default TechnologiesForm;
