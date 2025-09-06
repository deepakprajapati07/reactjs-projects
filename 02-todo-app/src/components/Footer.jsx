import styles from "./Footer.module.css"
import { FaLinkedin, FaGithub, FaGlobe } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.footer}>
        <div >
          &copy; DKP 2025
        </div>
        <div className={styles.socialLinks}>
          <a href="https://www.linkedin.com/in/deepakprajapati07" target="_blank" rel="noreferrer">
            <FaLinkedin size={24} />
          </a>
          <a href="https://github.com/deepakprajapati07" target="_blank" rel="noreferrer">
            <FaGithub size={24} />
          </a>
          <a href="/" target="_blank" rel="noreferrer">
            <FaGlobe size={24} />
          </a>
        </div>
      </footer>
  )
}

export default Footer