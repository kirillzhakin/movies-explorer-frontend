import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__project-name">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__container">
        <p className="footer__copyright">&copy; {new Date().getFullYear()}</p>
        <ul className="footer__social-icons">
          <li>
            <a
              href="https://practicum.yandex.ru"
              className="footer__social-icons_link"
              target="blank"
            >
              Яндекс.Практикум
            </a>
          </li>
          <li>
            <a
              href="https://github.com"
              className="footer__social-icons_link"
              target="blank"
            >
              Github
            </a>
          </li>
          <li>
            <a
              href="https://vk.com"
              className="footer__social-icons_link"
              target="blank"
            >
              VK
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
