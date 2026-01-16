import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, House } from "@phosphor-icons/react";

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
        {prevLink === "/" ? <House size={18} /> : <ArrowLeft size={18} />}
        {prevLink === "/" ? " Home" : " Anterior"}
      </Link>

      <div className="nav-title">
        {moduleTitle}:<span className={`badge ${badgeColor}`}>{badgeText}</span>
      </div>

      {nextLink ? (
        <Link to={nextLink} className="nav-btn">
          Siguiente <ArrowRight size={18} />
        </Link>
      ) : (
        <div style={{ width: "80px" }}></div>
      )}
    </nav>
  );
};
