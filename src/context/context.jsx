import { createContext, useContext, useEffect, useState } from "react";
import { createQuestionRequest, deleteQuestionRequest, editQuestionRequest, getQuestionsRequest } from "../api/backendConnection";

const questionsContext = createContext();

export const useQuestions = () => {
    const context = useContext(questionsContext);
    return context;
}

export const QuestionContext = ({children}) => {

    const [questions, setQuestions] = useState([]);
    const [items, setItems] = useState([]);
    const [insertForm, setInsertForm] = useState(false);
    const [questionForEditing, setQuestionForEditing] = useState();
    const [help, setHelp] = useState(false);


    //console.log(questions[0].description.replace(/[a-zA-Zá-úÁ-Ú0-9]/g, "*"))

    const getQuestions = async () => {
        const res = await getQuestionsRequest();
        setQuestions(res.data);
        setItems(res.data);
      };
    
      useEffect(() => {
        getQuestions();
      }, []);

    const createQuestion = async (fields) => {
      const res = await createQuestionRequest(fields);
      setQuestions([...questions, res.data]);
      setItems([...items, res.data]);
    };

    const editQuestion = async (id, newFields) => {
      const res = await editQuestionRequest(id, newFields);
      setQuestions(questions.map(item => item._id === id ? res.data : item));
      setItems(items.map(item => item._id === id ? res.data : item));
    };

    const deleteQuestion = async(id) => {
      await deleteQuestionRequest(id);
      setQuestions(questions.filter(item => item._id !== id));
      setItems(items.filter(item => item._id !== id));
    }


  return (
    <questionsContext.Provider value={{questions, setQuestions, getQuestions, items, setItems, insertForm, help, setHelp, setInsertForm, questionForEditing, setQuestionForEditing, createQuestion, editQuestion, deleteQuestion}}>
        {
          questions.length === 0 ? <div className="vw-100 vh-100 d-flex flex-column justify-content-center align-items-center bg-black">
            <h5 className="text-light mb-4">Conectando con la base de datos, esto podría demorar unos segundos debido a que el hosting es gratuito y la velocidad no es su fuerte 😅</h5>
            <div className="spinner-border text-green" role="status">
          <span className="visually-hidden text-green">Loading...</span>
        </div></div> : children
        }
    </questionsContext.Provider>
  )
};

