import React from 'react';
import Swal from 'sweetalert2';
import { Button } from "primereact/button";


const DeleteConfirmation = ({ startup, onDelete }) => {
  const confirmDeletion = () => {
    Swal.fire({
      title: 'Confirmación de Eliminación',
      text: `¿Estás seguro de que deseas eliminar esta startup: ${startup.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await onDelete(startup._id);
          Swal.fire('Eliminado!', 'La startup ha sido eliminada.', 'success');
        } catch (error) {
          Swal.fire('Error!', 'No se pudo eliminar la startup.', 'error');
        }
      }
    });
  };

  return (
    <Button 
      icon="pi pi-trash" 
      className="p-button-danger p-button-text" 
      onClick={confirmDeletion} 
    />
  );
};

export default DeleteConfirmation;
