import "./Footer.css";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <p>
        Luke Loecher{" "}
        <a
          href="https://www.linkedin.com/in/luke-loecher-86582810b/"
          rel="noreferrer"
          target="_blank">
          <FaLinkedin />
        </a>{" "}
        <a
          href="https://github.com/lloecher5/book-marked"
          rel="noreferrer"
          target="_blank">
          <FaGithub />
        </a>
      </p>
    </div>
  );
};

export default Footer;
