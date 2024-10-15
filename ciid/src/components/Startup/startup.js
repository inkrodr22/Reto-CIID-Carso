import "./startup.scss";
import { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import StartupForm from "./startupCreate";
import StartupTable from "./startupTable";
import logo from "../../img/startup.jpg";
import { getStartups, deleteStartup } from "../../api/startups";

const Startup = () => {
  const [visible, setVisible] = useState(false);
  const [startups, setStartups] = useState([]);
  const [selectedStartups, setSelectedStartups] = useState([]);

  useEffect(() => {
    fetchStartups();
  }, []);

  const fetchStartups = async () => {
    try {
      const data = await getStartups();
      setStartups(data);
    } catch (error) {
      console.error("Error al obtener las startups:", error);
    }
  };

  const onDelete = async (id) => {
    try {
      await deleteStartup(id);
      setStartups((prevStartups) =>
        prevStartups.filter((startup) => startup._id !== id)
      );
    } catch (error) {
      console.error("Error al eliminar la startup:", error);
    }
  };

  return (
    <div className="startup-container">
        <Card className="card-custom shadow-2"> 
            <div className="p-4 md:p-6">
            <header className="startup-header">
                <div className="startup-info">
                <img src={logo} alt="Startup Logo" className="startup-logo" />
                <div>
                    <h1>Startup</h1>
                    <p className="startup-description">
                    Una startup es una empresa emergente que busca desarrollar un
                    producto o servicio innovador y escalable, generalmente en el
                    ámbito tecnológico. Estas empresas suelen estar en sus
                    primeras etapas de desarrollo y buscan financiamiento para
                    crecer rápidamente en un mercado competitivo.
                    </p>
                </div>
                </div>

            <Button
              label="Crear Startup"
              icon="pi pi-plus"
              className="button p-button-primary create-startup-button"
              onClick={() => setVisible(true)}
            />
          </header>

          <Dialog
            visible={visible}
            header="Crear Startup"
            style={{ width: "500px" }}
            onHide={() => setVisible(false)}
          >
            <StartupForm 
              onSuccess={fetchStartups}
              onHide={() => setVisible(false)}

            />
          </Dialog>

          <div>
            <section className="startup-table-section">
              <StartupTable
                startups={startups}
                selectedStartups={selectedStartups}
                setSelectedStartups={setSelectedStartups}
                onDelete={onDelete}
                onEditSuccess={fetchStartups} 
              />
            </section>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Startup;
