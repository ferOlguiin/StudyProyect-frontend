import { Toaster } from "react-hot-toast";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { Questions } from "./components/Questions";
import { SearchBar } from "./components/SearchBar";
import { QuestionContext } from "./context/context";

function App() {
  return (
    <div className="min-vh-100 d-flex flex-column fondo">
      <QuestionContext>
        <div id="inicio"></div>
        <Navbar />
        <SearchBar />
        <Questions />
        <Footer />
        <div id="fin"></div>
        <Toaster position="top-right" reverseOrder={false} />
      </QuestionContext>
    </div>
  );
}

export default App;
