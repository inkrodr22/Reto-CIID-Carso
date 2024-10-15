import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import DeleteConfirmation from "./startupDelete";
import EditStartupDialog from "./startupEdit";
import { Link } from 'react-router-dom';


const StartupTable = ({ startups, onDelete, onEditSuccess}) => {
  const [startupList, setStartupList] = useState(startups || []);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [startupToEdit, setStartupToEdit] = useState(null);

  useEffect(() => {
    setStartupList(startups);
  }, [startups]);

  const actionBodyTemplate = (rowData) => {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          icon="pi pi-pencil"
          onClick={() => confirmEdit(rowData)}
          className="p-button-text"
        />
        <DeleteConfirmation startup={rowData} onDelete={onDelete} />
      </div>
    );
  };

  const confirmEdit = (startup) => {
    setStartupToEdit(startup);
    setVisibleEdit(true);
  };

  const hideEditDialog = () => {
    setVisibleEdit(false);
    setStartupToEdit(null);
  };

  const handleEditSuccess = (updatedData) => {
    console.log('Datos actualizados recibidos:', updatedData);
    setStartupList((prevList) =>
      prevList.map((startup) =>
        startup._id === updatedData._id ? updatedData : startup
      )
    );
    onEditSuccess();
    hideEditDialog();
  };

  return (
    <div className="table-container">
      <DataTable
        value={startupList}
        paginator
        header="Lista de Startups"
        rows={5}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        rowsPerPageOptions={[5, 10, 15, 20, 25, 50]}
        dataKey="_id"
        emptyMessage="No startups encontradas."
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} startups"
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
              <Link to={`/startup/${rowData._id}`}>{rowData.name}</Link>
            );
          }}
            />
        <Column
          field="foundedDate"
          header="Fecha de Fundación"
          sortable
          body={(rowData) => {
            const date = new Date(rowData.foundedDate);
            return `${date.getDate().toString().padStart(2, "0")}/${(
              date.getMonth() + 1
            )
              .toString()
              .padStart(2, "0")}/${date.getFullYear()}`;
          }}
          style={{ minWidth: "10rem" }}
        />
        <Column
          field="location"
          header="Ubicación"
          sortable
          style={{ minWidth: "10rem" }}
        />
        <Column
          field="category"
          header="Categoria"
          sortable
          style={{ minWidth: "10rem" }}
        />
        <Column field="investmentReceived" header="Inversión" sortable />
        <Column
          field="description"
          header="Descripción"
          sortable
          style={{ minWidth: "14rem" }}
        />
        <Column field="employees" header="Empleados" sortable />
        <Column
          header="Acciones"
          headerStyle={{ width: "5rem", textAlign: "center" }}
          body={actionBodyTemplate}
        />
      </DataTable>
      <EditStartupDialog
        visible={visibleEdit}
        onHide={() => setVisibleEdit(false)}
        startup={startupToEdit}
        onSuccess={handleEditSuccess}
      />
    </div>
  );
};

export default StartupTable;
