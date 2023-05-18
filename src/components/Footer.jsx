import { BsArrowUp, BsQuestion, BsFillEyeSlashFill, BsFillEyeFill, BsArrowDown } from "react-icons/bs";
import { useQuestions } from "../context/context";
import { useState } from "react";

export const Footer = () => {
  const { setHelp, questions, setItems } = useQuestions();
  const [hidden, setHidden] = useState(false);

  const handleHidden = () => {
    const hiddenAnswers = questions.map((item) => {
      if (item._id) {
        return { ...item, description: item.description.replace(/[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9,.\?!)(ëüäïö+:_-]/g, "*")};
      }
      return item;
    });
    setHidden(true);
    setItems(hiddenAnswers);
  };

  const filtrar = (data) => {
    const result = questions.filter((item) => {
      if (item.title.toString().toLowerCase().includes(data.toLowerCase())) {
        return item;
      }
    });
    setHidden(false);
    setItems(result);
  };

  return (
    <footer className="footer-width d-flex justify-content-end align-items-center">
      <div className="d-flex flex-column justify-content-center align-items-end mb-3 me-3">
        
          {!hidden ? <a type="button" onClick={handleHidden} className="text-decoration-none"><BsFillEyeFill className="border border-2 border-success fs-2 text-light bg-black bg-gradient rounded-circle mb-2 p-1" /></a> : <a type="button" onClick={() => filtrar('')} className="text-decoration-none"><BsFillEyeSlashFill className="border border-2 border-secondary fs-2 text-secondary bg-black bg-gradient rounded-circle mb-2 p-1" /></a>}
          
        <a href="#inicio" className="text-decoration-none">
          <BsArrowUp className="border border-2 border-success fs-2 text-light bg-black bg-gradient rounded-circle mb-2 p-1" />
        </a>
        <a href="#fin" className="text-decoration-none">
          <BsArrowDown className="border border-2 border-success fs-2 text-light bg-black bg-gradient rounded-circle mb-2 p-1" />
        </a>
        <span type="button" onClick={() => setHelp(true)}>
          <BsQuestion className="fs-2 text-light bg-primary bg-gradient rounded-circle border border-2 border-light" />
        </span>
      </div>
    </footer>
  );
};

//ARREGLAR EL FOOTER QUE SE MEZCLA CON LAS PREGUNTAS
