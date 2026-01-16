interface ProjectCardProps {
  title: string;
  description: string;
  difficulty: "Fácil" | "Intermedio" | "Difícil";
  link: string;
}

export const ProjectCard = ({
  title,
  description,
  difficulty,
  link,
}: ProjectCardProps) => {
  const badgeClassMap = {
    Fácil: "easy",
    Intermedio: "medium",
    Difícil: "hard",
  };

  return (
    <article className="card">
      <div className="card-header">
        <span className={`badge ${badgeClassMap[difficulty]}`}>
          {difficulty}
        </span>
        <h3>{title}</h3>
      </div>
      <p className="card-desc">{description}</p>
      <a href={link} className="btn">
        Ver Proyecto &#10140;
      </a>
    </article>
  );
};
