import { FiGithub } from "react-icons/fi";
import "./styleNavBar.css";
import Button from "../../components/button";

export default function Navbar() {
  return (
    <nav>
        <h1>The holy quran</h1>
        
        <div>
          <Button name="Reciters" />
          <div className="git-icon">
              <FiGithub />
          </div>
        </div>


    </nav>
  )
}
