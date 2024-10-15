import React from "react";
import { Dialog } from "primereact/dialog";
import TechnologiesForm from "./technologiesCreate";

const EditStartupDialog = ({ visible, onHide, technology, onSuccess }) => {
  const handleSuccess = (updatedData) => {
    onSuccess(updatedData);
    onHide();
  };
  
  return (
    <Dialog
      header="Editar Tecnologia"
      visible={visible}
      onHide={onHide}
      style={{ width: "500px" }}
    >
      <TechnologiesForm
        initialData={technology}
        onSuccess={handleSuccess}
        onHide={onHide}
      />
    </Dialog>
  );
};

export default EditStartupDialog;

