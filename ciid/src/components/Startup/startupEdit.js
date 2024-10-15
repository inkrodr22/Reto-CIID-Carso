import React from "react";
import { Dialog } from "primereact/dialog";
import StartupForm from "./startupCreate";

const EditStartupDialog = ({ visible, onHide, startup, onSuccess }) => {
  const handleSuccess = (updatedData) => {
    onSuccess(updatedData);
    onHide();
  };
  

  return (
    <Dialog
      header="Editar Startup"
      visible={visible}
      onHide={onHide}
      style={{ width: "500px" }}
    >
      <StartupForm
        initialData={startup}
        onSuccess={handleSuccess}
        onHide={onHide}
      />
    </Dialog>
  );
};

export default EditStartupDialog;

