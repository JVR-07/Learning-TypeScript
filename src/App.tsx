import { Hero } from "./components/Hero";
import { ProjectCard } from "./components/ProjectCard";
import { Footer } from "./components/Footer";

function App() {
  const projects = [
    {
      title: "Password Validator",
      difficulty: "Fácil" as const,
      description:
        "Analizador de contraseñas interactivo. Manipulación del DOM, lógica condicional y validaciones con Regex.",
      link: "/projects/01-simple/index.html",
    },
    {
      title: "TO-DO Basic App",
      difficulty: "Intermedio" as const,
      description:
        "Gestor de tareas con tipado estructural, manipulación inmutable de arreglos y lógica de fechas.",
      link: "/projects/02-intermediate/index.html",
    },
    {
      title: "E-commerce Dashboard",
      difficulty: "Difícil" as const,
      description:
        "Gestión de estado global, patrones de diseño, clases avanzadas y Typescript en modo estricto.",
      link: "#",
    },
  ];

  return (
    <>
      <Hero />

      <main className="projects-section">
        <div className="container">
          <h2 className="section-title">Mis Proyectos</h2>

          <div className="grid">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                difficulty={project.difficulty}
                description={project.description}
                link={project.link}
              />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;
