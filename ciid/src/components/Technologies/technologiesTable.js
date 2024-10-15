import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import DeleteConfirmation from "./technologyDelete";
import EditStartupDialog from "./technologyEdit";
import { Link } from 'react-router-dom';

const TechnologiesTable = ({ technologies, onDelete, onEditSuccess}) => {
  const [technologiesList, setTechnologiesList] = useState(technologies || []);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [startupToEdit, setStartupToEdit] = useState(null);

  useEffect(() => {
    setTechnologiesList(technologies);
  }, [technologies]);

  const actionBodyTemplate = (rowData) => {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          icon="pi pi-pencil"
          onClick={() => confirmEdit(rowData)}
          className="p-button-text"
        />
        <DeleteConfirmation technology={rowData} onDelete={onDelete} />
      </div>
    );
  };

  const confirmEdit = (technology) => {
    setStartupToEdit(technology);
    setVisibleEdit(true);
  };

  const hideEditDialog = () => {
    setVisibleEdit(false);
    setStartupToEdit(null);
  };

  const handleEditSuccess = (updatedData) => {
    console.log('Datos actualizados recibidos:', updatedData);
    setTechnologiesList((prevList) =>
      prevList.map((technology) =>
        technology._id === updatedData._id ? updatedData : technology
      )
    );
    onEditSuccess();
    hideEditDialog();
  };

  return (
    <div className="table-container">
      <DataTable
        value={technologiesList}
        paginator
        header="Lista de Tecnologías"
        rows={5}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        rowsPerPageOptions={[5, 10, 15, 20, 25, 50]}
        dataKey="_id"
        emptyMessage="No tecnologias encontradas."
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Tecnologías"
      >
        <Column
          field="name"
          header="Nombre"
          sortable
          filter
          filterPlaceholder="Search by name"
          style={{ minWidth: "10rem" }}
          body={(rowData) => {
            return (
              <Link to={`/technology/${rowData._id}`}>{rowData.name}</Link>
            );
          }}
        />
        <Column
          field="sector"
          header="Sector"
          sortable
          style={{ minWidth: "10rem" }}
        />
        <Column
          field="adoptionStatus"
          header="Estado de adopcion "
          sortable
          style={{ minWidth: "10rem" }}
        />
        <Column
          field="createdDate"
          header="Fecha de Creación"
          sortable
          body={(rowData) => {
            const date = new Date(rowData.createdDate);
            return `${date.getDate().toString().padStart(2, "0")}/${(
              date.getMonth() + 1
            )
              .toString()
              .padStart(2, "0")}/${date.getFullYear()}`;
          }}
          style={{ minWidth: "10rem" }}
        />
        <Column
          field="currentUsage"
          header="Uso actual"
          sortable
          style={{ minWidth: "10rem" }}
        />
        <Column field="implementationCost" header="Costo de Implementacion" sortable />
        <Column
          field="description"
          header="Descripción"
          sortable
          style={{ minWidth: "14rem" }}
        />
        <Column field="maturityLevel" header="Nivel de madurez" sortable />
        <Column
          header="Acciones"
          headerStyle={{ width: "5rem", textAlign: "center" }}
          body={actionBodyTemplate}
        />
      </DataTable>
      <EditStartupDialog
        visible={visibleEdit}
        onHide={hideEditDialog}
        technology={startupToEdit}
        onSuccess={handleEditSuccess}
      />
    </div>
  );
};

export default TechnologiesTable;
