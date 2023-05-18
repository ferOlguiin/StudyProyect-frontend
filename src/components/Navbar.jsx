import { VscGithub } from "react-icons/vsc";
import { BsLinkedin } from "react-icons/bs";

export const Navbar = () => {
  return (
    <nav className="d-flex justify-content-between align-items-center shadow-navbar text-green py-3 px-4">
      <h1 className="m-0 text-green title-navbar fw-bold">RePasadoAndoRepasando</h1>
      <div className="d-flex justify-content-center align-items-center text-green">
        <a
          href="https://github.com/ferOlguiin?tab=repositories"
          target="_blank"
          rel="noreferrer"
          className="text-decoration-none px-2 fs-3 "
        >
          <VscGithub className="text-dark bg-light rounded-circle border border-2 border-light" />
        </a>
        <a
          href="https://www.linkedin.com/in/fernando-olguin-5a63a9236/"
          target="_blank"
          rel="noreferrer"
          className="text-decoration-none fs-3 "
        >
          <BsLinkedin className="text-primary bg-light rounded-circle border border-2 border-light" />
        </a>
      </div>
    </nav>
  );
};
