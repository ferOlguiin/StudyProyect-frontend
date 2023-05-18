import { useEffect, useState } from "react";
import { useQuestions } from "../context/context";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import { VscDebugRestart } from "react-icons/vsc";

export const SearchBar = () => {
  const {
    questions,
    setItems,
    insertForm,
    setInsertForm,
    createQuestion,
    editQuestion,
    questionForEditing,
    setQuestionForEditing,
  } = useQuestions();
  const [search, setSearch] = useState("");
  const [dataForm, setDataForm] = useState({
    title: "",
    description: "",
    category: "",
  });

  useEffect(() => {
    if (questionForEditing) {
      setDataForm(questionForEditing);
    }
  }, [questionForEditing]);

  const handleRandomQuestion = () => {
    const longitud = questions.length;
    const randomNumber = Math.floor(Math.random() * longitud);
    const result = questions.slice();
    const item = result[randomNumber];
    setItems([item]);
  };

  const handleAddQuestion = async () => {
    setInsertForm(true);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
    filtrar(e.target.value);
  };
  const filtrar = (data) => {
    const result = questions.filter((item) => {
      if (item.title.toString().toLowerCase().includes(data.toLowerCase())) {
        return item;
      }
    });
    setItems(result);
  };

  const handleCancel = () => {
    setInsertForm(false);
    setDataForm({ title: "", description: "", category: "" });
    setQuestionForEditing("");
  };


  return (
    <div className="my-5 d-flex justify-content-center align-items-center">
      <div className="d-flex flex-column justify-content-center align-items-center bg-secondary p-4 rounded bg-opacity-25">
        <h4 className="text-light">¿Qué pregunta estás buscando?</h4>
        <div className="d-flex align-items-center">
          <input
            onChange={handleChange}
            value={search}
            name="search"
            type="text"
            className="padding-input rounded text-green bg-black form-control-plaintext border-green"
            placeholder="Buscá por titulos"
          />
          <span type="button" onClick={() => {filtrar(''); setSearch("")}} className="btn-green mx-1"><VscDebugRestart className="mb-1"/></span>
        </div>
      </div>

      {insertForm === true ? (
        <div className="d-flex justify-content-center align-items-center position-absolute position-fixed top-50 start-50 translate-middle overlapping min-vh-100 vw-100">
        <Formik
          initialValues={dataForm}
          validationSchema={Yup.object({
            title: Yup.string().trim().required("Titulo de pregunta requerido"),
            description: Yup.string().trim().required("Respuesta requerida"),
          })}
          onSubmit={async (values, actions) => {
            if (questionForEditing) {
              toast.promise(
                editQuestion(questionForEditing._id, values),
                {
                  loading: "Editando...",
                  success:
                    "Pregunta editada correctamente, gracias por tu corrección!",
                  error: "No se puedo editar la pregunta, intentalo de nuevo.",
                },
                {
                  style: {
                    border: "2px solid black",
                    background: "#202534",
                    color: "white",
                  },
                  duration: 5000,
                }
              );
              setDataForm({ title: "", description: "", category: "" });
              setQuestionForEditing("");
            } else {
              toast.promise(
                createQuestion(values),
                {
                  loading: "Creando...",
                  success:
                    "Pregunta creada correctamente, gracias por tu aporte!",
                  error: "No se puedo crear la pregunta, intentalo de nuevo.",
                },
                {
                  style: {
                    border: "2px solid black",
                    background: "#202534",
                    color: "white",
                  },
                  duration: 5000,
                }
              );
            }
            actions.setSubmitting(true);
            actions.resetForm();
            setInsertForm(false);
          }}
          enableReinitialize
        >
          {({ handleSubmit, isSubmitting }) => (
            <Form
              onSubmit={handleSubmit}
              className="form-control-sm rounded flex-column d-flex bg-black border border-1 border-secondary px-5 py-3"
            >
              <h2 className="text-break text-green fw-bold text-center mb-3">
                {questionForEditing
                  ? "Editá la pregunta"
                  : "Agregá la nueva pregunta"}
              </h2>

              <label className="form-label text-light m-0 fs-5" htmlFor="t">
                Título de la pregunta
              </label>
              <Field
                className="form-control-plaintext p-2 rounded bg-black text-light border border-light mt-1 mb-3 mx-0"
                placeholder="Inserte titulo de la pregunta"
                name="title"
                id="t"
              />
              <ErrorMessage
                name="title"
                component="p"
                className="text-danger fs-6"
              />

              <label className="form-label text-light m-0 fs-5" htmlFor="d">
                Respuesta de la pregunta
              </label>
              <Field
                as="textarea"
                rows="6"
                className="form-control-plaintext p-2 rounded bg-black text-light border border-light mt-1 mb-3 mx-0"
                placeholder="Inserte respuesta de la pregunta"
                name="description"
                id="d"
                style={{ resize: "none" }}
              />
              <ErrorMessage
                name="description"
                component="p"
                className="text-danger fs-6"
              />

              <label className="form-label text-light m-0 fs-5" htmlFor="c">
                Categoria de la pregunta
              </label>
              <Field
                as="select"
                name="category"
                id="c"
                className="btn btn-secondary text-light bg-black"
              >
                <option value="">
                  Seleccioná una categoria para la pregunta
                </option>
                <option value="ConceptosBasicos">Conceptos básicos</option>
                <option value="IA">IA</option>
                <option value="Ciberseguridad">Ciberseguridad</option>
              </Field>

              <button
                type="submit"
                className="btn btn-dark text-green mt-4 mb-1"
                disabled={isSubmitting}
              >
                {!questionForEditing
                  ? isSubmitting
                    ? "Agregando..."
                    : "Agregar"
                  : !isSubmitting
                  ? "Editar"
                  : "Editando..."}
              </button>
              <button className="btn btn-dark mb-1 text-red" onClick={handleCancel}>
                Cancelar
              </button>
            </Form>
          )}
        </Formik>
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center flex-column mx-3 bg-secondary p-4 rounded bg-opacity-25">
          <h4 className="text-light">¿Querés agregar una pregunta nueva?</h4>
          <button onClick={handleAddQuestion} className="btn-green">
            Aportar
          </button>
        </div>
      )}

      <div className="me-2 d-flex flex-column justify-content-center align-items-center bg-secondary p-4 rounded bg-opacity-25">
        <h4 className="text-light">¿Querés una pregunta aleatoria?</h4>
        <div className="d-flex">
          <button onClick={handleRandomQuestion} className="btn-green me-1">
            Una aleatoria
          </button>
          <button className="btn-green" onClick={() => filtrar("")}>
            Todas las preguntas
          </button>
          
        </div>
      </div>
    </div>
  );
};
