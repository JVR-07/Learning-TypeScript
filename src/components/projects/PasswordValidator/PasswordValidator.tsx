import { useState } from "react";
import {
  Eye,
  EyeSlash,
  CheckCircle,
  WarningCircle,
} from "@phosphor-icons/react";
import { ProjectNavbar } from "../../ProjectNavbar";
import "./PasswordValidator.css";

export const PasswordValidator = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const patterns = {
    length: (pwd: string) => pwd.length >= 8,
    number: (pwd: string) => /\d/.test(pwd),
    upper: (pwd: string) => /[A-Z]/.test(pwd),
    special: (pwd: string) => /[!@#$%^&*(),.?":{}|<>_\-]/.test(pwd),
  };

  const validations = {
    length: patterns.length(password),
    number: patterns.number(password),
    upper: patterns.upper(password),
    special: patterns.special(password),
  };

  const isAllValid = Object.values(validations).every(Boolean);

  return (
    <div className="layout-container-1">
      <ProjectNavbar
        moduleTitle="Módulo 01"
        badgeText="Fácil"
        badgeColor="easy"
        nextLink="/project-2"
      />
      <div className="project-container-1">
        <div className="card validator-card">
          <header className="card-header">
            <h2>Validador de Seguridad</h2>
            <p className="subtitle">
              Escribe una contraseña para analizar su fortaleza en tiempo real.
            </p>
          </header>

          <div className="input-group">
            <div className="input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password-input"
                placeholder="Ingresa tu contraseña..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  borderColor: isAllValid ? "#2ea043" : "#30363d",
                }}
              />
              <button
                className="eye-btn"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeSlash /> : <Eye />}
              </button>
            </div>
          </div>

          <div className="rules-section">
            <h3>Requisitos:</h3>
            <ul className="rules-list">
              <li className={`rule-item ${validations.length ? "valid" : ""}`}>
                <span className="icon">○</span> Mínimo 8 caracteres
              </li>
              <li className={`rule-item ${validations.number ? "valid" : ""}`}>
                <span className="icon">○</span> Al menos un número
              </li>
              <li className={`rule-item ${validations.upper ? "valid" : ""}`}>
                <span className="icon">○</span> Al menos una mayúscula
              </li>
              <li className={`rule-item ${validations.special ? "valid" : ""}`}>
                <span className="icon">○</span> Al menos un carácter especial
              </li>
            </ul>
          </div>

          {isAllValid && (
            <div className="success-message">
              <CheckCircle size={24} style={{ marginRight: 8 }} />
              ¡Contraseña Segura!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
