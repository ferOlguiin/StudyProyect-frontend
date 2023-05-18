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
        {children}
    </questionsContext.Provider>
  )
};

