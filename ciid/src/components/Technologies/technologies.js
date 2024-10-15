import "./technologies.scss";
import { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import TechnologiesForm from "./technologiesCreate";
import TechnologiesTable from "./technologiesTable";
import logo from "../../img/technologies.png";
import { getTechnologies, deleteTechnology } from "../../api/technologies";

const Technologies = () => {
  const [visible, setVisible] = useState(false);
  const [technologies, setTechnologies] = useState([]);
  const [selectedTechnology, setSelectedTechnologies] = useState([]);

  useEffect(() => {
    fetchTechnologies();
  }, []);

  const fetchTechnologies = async () => {
    try {
      const data = await getTechnologies();
      setTechnologies(data);
    } catch (error) {
      console.error("Error al obtener las tecnologias:", error);
    }
  };

  const onDelete = async (id) => {
    try {
      await deleteTechnology(id);
      setTechnologies((prevStartups) =>
        prevStartups.filter((technology) => technology._id !== id)
      );
    } catch (error) {
      console.error("Error al eliminar la tecnologia:", error);
    }
  };

  return (
    <div className="technology-container">
      <Card className="card-custom shadow-2">
        <div className="p-4 md:p-6">
          <header className="technology-header">
            <div className="technology-info">
              <img src={logo} alt="technology Logo" className="technology-logo" />
              <div>
                <h1>Tecnologías Emergentes</h1>
                <p className="technology-description">
                  Las tecnologías emergentes son innovaciones o avances
                  tecnológicos que están en las primeras etapas de desarrollo o
                  adopción y que tienen el potencial de transformar industrias,
                  la sociedad o la forma en que las personas interactúan con el
                  mundo. Estas tecnologías aún no están ampliamente integradas o
                  utilizadas en el mercado, pero se espera que tengan un impacto
                  significativo a medida que evolucionan y maduran.
                </p>
              </div>
            </div>

            <Button
              label="Crear Tecnología"
              icon="pi pi-plus"
              className="button p-button-primary create-technology-button"
              onClick={() => setVisible(true)}
            />
          </header>

          <Dialog
            visible={visible}
            header="Crear Tecnología"
            style={{ width: "500px" }}
            onHide={() => setVisible(false)}
          >
            <TechnologiesForm
              onSuccess={fetchTechnologies}
              onHide={() => setVisible(false)}
            />
          </Dialog>

          <div>
            <section className="technology-table-section">
              <TechnologiesTable
                technologies={technologies}
                selectedTechnology={selectedTechnology}
                setSelectedTechnologies={setSelectedTechnologies}
                onDelete={onDelete}
                onEditSuccess={fetchTechnologies}
              />
            </section>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Technologies;
