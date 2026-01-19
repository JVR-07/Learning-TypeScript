import { Link } from "react-router-dom";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  HouseIcon,
} from "@phosphor-icons/react";

interface ProjectNavbarProps {
  moduleTitle: string;
  badgeText: string;
  badgeColor: "easy" | "medium" | "hard";
  prevLink?: string;
  nextLink?: string;
}

export const ProjectNavbar = ({
  moduleTitle,
  badgeText,
  badgeColor,
  prevLink = "/",
  nextLink,
}: ProjectNavbarProps) => {
  return (
    <nav className="top-nav">
      <Link to={prevLink} className="nav-btn">
        {prevLink === "/" ? (
          <HouseIcon size={18} />
        ) : (
          <ArrowLeftIcon size={18} />
        )}
        <span>{prevLink === "/" ? " Home" : " Anterior"}</span>
      </Link>

      <div className="nav-title">
        <span>{moduleTitle}:</span>
        <span className={`badge ${badgeColor}`}>{badgeText}</span>
      </div>

      {nextLink ? (
        <Link to={nextLink} className="nav-btn">
          <span>Siguiente</span>
          <ArrowRightIcon size={18} />
        </Link>
      ) : (
        // Mantenemos el espaciador con el mismo ancho aproximado del botón para centrar el título
        <div style={{ width: "100px" }}></div>
      )}
    </nav>
  );
};
