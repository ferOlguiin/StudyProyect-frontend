import { VscClose, VscEdit, VscTrash } from "react-icons/vsc";
import { useQuestions } from "../context/context";

export const Help = () => {
  const { setHelp } = useQuestions();

  return (
    <div className="d-flex justify-content-center align-items-center flex-column position-absolute min-vh-100 vw-100 overlapping position-fixed top-50 start-50 translate-middle text-light p-4">
      <div
        className="background rounded d-flex flex-column overflow-auto px-3 py-1"
        style={{ width: 900, height: 600, borderWidth: 1, borderColor: "black", borderStyle: "solid" }}
      >
        <div className="mt-2 mb-4 d-flex justify-content-between align-items-center">
          <h1 className="text-light">Sección de ayuda</h1>
          <span
            type="button"
            onClick={() => setHelp(false)}
            className="btn-red rounded-circle fs-4 px-2 py-0 mb-1"
          >
            <VscClose className="mb-1 p-0" />
          </span>
        </div>
        <h3 className="text-decoration-underline">
          ¿Para que sirven los iconos que están a la derecha de cada pregunta?
        </h3>
        <p>
          El icono <VscEdit className="edit"/> sirve para corregir la pregunta,
          ya sea por faltas de ortografia, error de tipeo, información erronea o
          cualquier motivo que amerite una corrección en dicha pregunta. El
          icono <VscTrash className="delete"/> sirve para eliminar la pregunta
          junto con su respuesta, primero se te pedirá una confirmación y luego
          si confirmas se eliminará, en caso que no confirmes la pregunta y su
          respuesta permanerán en la base de datos y en el sitio.
        </p>
        <h3 className="text-decoration-underline">
          Edición/modificación de preguntas
        </h3>
        <p>
          Al clickear el icono de edición, se te mostrará un formulario en donde
          se te va a permitir modificar los campos como el titulo, la respuesta
          y la categoria de la pregunta. Podés modificar los campos que quieras
          y sólo el que modifiques se guardará en la base de datos, por lo que
          no es necesario modificar todos los campos para que la información se
          guarde.
        </p>
        <h3 className="text-decoration-underline">Eliminación de preguntas</h3>
        <p>
          Una vez eliminada una pregunta, ésta ya no estará disponible y no
          habrá forma de recuperar dicha información ya no hay una copia que
          respalde esa pregunta para su recuperación en caso de ser eliminada.
        </p>
        <h3 className="text-decoration-underline">
          ¿Encontraste preguntas con respuestas erroneas?
        </h3>
        <p>
          Corregilas mediante el metodo de edición o eliminalas y crea una nueva
          con la información correcta. El aporte de todos es valioso para que la
          información sea valiosa.
        </p>
        <h3 className="text-decoration-underline">¿Hay filtros?</h3>
        <p>
          No hay ningún tipo de filtros, la información es completamente
          administrada por los usuarios de la web. No hay filtro de vocabulario
          ni hay correcciones para errores gramaticales, por lo que si te
          encontras con alguno de esos errores es importante y beneficioso que
          lo corrijas.
        </p>
      </div>
    </div>
  );
};
