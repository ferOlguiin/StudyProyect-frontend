import { BsTrash } from "react-icons/bs";
import { useQuestions } from "../context/context";
import { VscEdit } from "react-icons/vsc";
import { toast } from "react-hot-toast";
import { Help } from "./Help";

export const Questions = () => {
  const { items, setQuestionForEditing, setInsertForm, deleteQuestion, help } =
    useQuestions();

  const handleEdit = (item) => {
    setQuestionForEditing(item);
    setInsertForm(true);
  };

  const handleDelete = (item) => {
    toast(
      (t) => (
        <div className="container-fluid background">
          <p className="text-light fs-6">
            ¿Quieres eliminar la pregunta "{item.title}" ?
          </p>
          <p className="text-light letra-pequeña">
            Una vez eliminada, no podrás recuperarla 
            <b className="text-warning"> ⚠</b>
          </p>
          <div>
            <button
              className="btn-red me-1"
              onClick={() => deletingQuestion(item._id, t.id)}
            >
              Borrar
            </button>
            <button
              className="btn-white"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancelar
            </button>
          </div>
        </div>
      ),
      {
        style: {
          border: "2px solid black",
          background: "#202534",
        },
      }
    );
  };

  const deletingQuestion = async (id, id2) => {
    toast.promise(
      deleteQuestion(id),
      {
        loading: "Borrando...",
        success: "Pregunta eliminada!",
        error:"No se puedo borrar la pregunta, vuelve a intentarlo.",
      },
      {
        style: {
          border: "2px solid black",
          background: "#202534",
          color: "white",
        },
      }
    );
    toast.dismiss(id2);
  };

  return (
    <>
      {items.length > 0 ? (
        items.map((item) => (
          <div
            key={item._id}
            className="d-flex justify-content-center align-items-center flex-column p-2 text-white mx-5 my-2 rounded"
          >
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="fw-bold m-0">{item.title}</h2>
              <div className="d-flex">
                <span
                  type="button"
                  onClick={() => handleEdit(item)}
                  className="vscEdit text-decoration-none ms-4 me-1"
                >
                  <VscEdit className="fs-3 edit p-1 bg-black rounded-circle border border-2 border-success" />
                </span>
                <span
                  type="button"
                  onClick={() => handleDelete(item)}
                  className="vscTrash text-decoration-none"
                >
                  <BsTrash className="fs-3 delete bg-black rounded-circle border border-2 border-danger p-1" />
                </span>
              </div>
            </div>
            <p className="text-center">{item.description}</p>
          </div>
        ))
      ) : (
        <h3 className="text-white text-center">No se encontraron preguntas</h3>
      )}

      {help === true ? <Help /> : ""}
    </>
  );
};
