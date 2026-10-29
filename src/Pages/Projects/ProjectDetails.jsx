import { useEffect, useRef, useState } from "react";
import AOS from "aos";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCalendarAlt,
  FaCheckCircle,
  FaChevronLeft,
  FaChevronRight,
  FaClock,
  FaExternalLinkAlt,
  FaTimes,
  FaUserTie,
} from "react-icons/fa";
import { Link, useParams } from "react-router";
import {
  categoryMeta,
  getProjectBySlug,
  projects,
} from "../../data/projects.data";
import { categoryIconMap, getTechIcon } from "./projectIcons";
import ProjectImage from "./ProjectImage";

const padNumber = (value) => String(value).padStart(2, "0");

const formatPreviewUrl = (liveUrl) => {
  if (!liveUrl || liveUrl === "#") return "preview.abdullah.dev";

  return liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");
};

const ProjectShowcase = ({ project }) => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isContentTaller, setIsContentTaller] = useState(false);
  const viewportRef = useRef(null);

  useEffect(() => {
    setHasScrolled(false);
    setIsContentTaller(false);

    const viewport = viewportRef.current;
    if (viewport) viewport.scrollTop = 0;

    const image = viewport?.querySelector("img");
    if (!viewport || !image || typeof ResizeObserver === "undefined") return;

    const updateContentHeight = () => {
      setIsContentTaller(
        image.getBoundingClientRect().height > viewport.clientHeight
      );
    };
    const resizeObserver = new ResizeObserver(updateContentHeight);
    resizeObserver.observe(viewport);
    resizeObserver.observe(image);

    return () => resizeObserver.disconnect();
  }, [project.slug]);

  const handleImageLoad = (event) => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    setIsContentTaller(
      event.currentTarget.getBoundingClientRect().height > viewport.clientHeight
    );
    setHasScrolled(false);
    viewport.scrollTop = 0;
  };

  const handleScroll = (event) => {
    if (!hasScrolled && event.currentTarget.scrollTop > 8) {
      setHasScrolled(true);
    }
  };

  return (
    <div
      className="project-detail-showcase"
      data-aos="fade-up"
      data-aos-duration="1200"
    >
      <div className="project-detail-browser">
        <div className="project-detail-browser-bar">
          <span className="project-detail-browser-dots" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </span>
          <span className="project-detail-browser-address">
            {formatPreviewUrl(project.liveUrl)}
          </span>
          <span className="project-detail-browser-badge">Live preview</span>
        </div>

        <div
          ref={viewportRef}
          className="project-detail-browser-viewport"
          onScroll={handleScroll}
        >
          <ProjectImage
            src={project.image}
            alt={`${project.title} full page preview`}
            className="project-detail-showcase-image"
            fallbackLabel="Full page preview"
            onLoad={handleImageLoad}
          />
        </div>

        {isContentTaller && !hasScrolled ? (
          <span className="project-detail-scroll-hint">
            <span className="project-detail-scroll-dot" aria-hidden="true"></span>
            Scroll to explore
          </span>
        ) : null}
      </div>
    </div>
  );
};

const ProjectDetails = () => {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);
  const projectIndex = project
    ? projects.findIndex((item) => item.slug === project.slug)
    : -1;
  const previousProject =
    project && projects.length > 1
      ? projects[(projectIndex - 1 + projects.length) % projects.length]
      : null;
  const nextProject =
    project && projects.length > 1
      ? projects[(projectIndex + 1) % projects.length]
      : null;

  const [activeChapter, setActiveChapter] = useState("overview");
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const closeButtonRef = useRef(null);

  const gallery = project?.gallery ?? [];
  const isLightboxOpen = lightboxIndex !== null;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    setLightboxIndex(null);
    setActiveChapter("overview");

    if (project) {
      document.title = `${project.title} | Abdullah`;
    } else {
      document.title = "Project not found | Abdullah";
    }

    AOS.refreshHard();
  }, [slug, project]);

  useEffect(() => {
    if (!project) return;

    const chapterElements = Array.from(
      document.querySelectorAll("[data-project-chapter]")
    );

    if (!chapterElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveChapter(entry.target.dataset.projectChapter);
          }
        });
      },
      { rootMargin: "-24% 0px -58% 0px", threshold: 0 }
    );

    chapterElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [project]);

  useEffect(() => {
    if (!isLightboxOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isLightboxOpen]);

  useEffect(() => {
    if (!isLightboxOpen || gallery.length === 0) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setLightboxIndex(null);
      } else if (event.key === "ArrowRight") {
        setLightboxIndex((current) => (current + 1) % gallery.length);
      } else if (event.key === "ArrowLeft") {
        setLightboxIndex(
          (current) => (current - 1 + gallery.length) % gallery.length
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, gallery.length]);

  if (!project) {
    return (
      <main className="project-detail-page project-detail-notfound">
        <div className="project-detail-container">
          <div className="project-detail-notfound-card">
            <span className="project-detail-eyebrow">404 / Project</span>
            <h1 className="project-detail-notfound-title rajdhani-bold">
              Project not found
            </h1>
            <p className="project-detail-notfound-copy">
              The case study you are looking for does not exist or has moved.
            </p>
            <Link to="/#projects" className="project-detail-btn is-primary">
              <FaArrowLeft size={14} aria-hidden="true" />
              Back to projects
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const meta = categoryMeta[project.category];
  const CategoryIcon = categoryIconMap[project.category];
  const titleWords = project.title.trim().split(/\s+/);
  const accentWord = titleWords.pop();
  const titleLead = titleWords.join(" ");

  const quickFacts = [
    { label: "Client", value: project.client, Icon: FaUserTie },
    { label: "Duration", value: project.duration, Icon: FaClock },
    { label: "Year", value: project.year, Icon: FaCalendarAlt },
  ].filter((fact) => fact.value?.trim());

  const chapters = [
    ...(project.overview?.trim()
      ? [
          {
            id: "overview",
            label: "Overview",
            title: "Overview",
            text: project.overview,
          },
        ]
      : []),
    ...(project.role?.trim()
      ? [
          {
            id: "role",
            label: "My Role",
            title: "My Role",
            text: project.role,
          },
        ]
      : []),
    ...(project.challenges?.trim()
      ? [
          {
            id: "challenge",
            label: "Challenge",
            title: "The Challenge",
            text: project.challenges,
          },
        ]
      : []),
    ...(project.solution?.trim()
      ? [
          {
            id: "solution",
            label: "Solution",
            title: "The Solution",
            text: project.solution,
          },
        ]
      : []),
    ...(project.results?.length
      ? [
          {
            id: "results",
            label: "Results",
            title: "The Results",
            results: project.results,
          },
        ]
      : []),
  ].map((chapter, index) => ({
    ...chapter,
    number: padNumber(index + 1),
  }));
  const isOverviewAndRoleOnly =
    chapters.length === 2 &&
    chapters[0].id === "overview" &&
    chapters[1].id === "role";
  const showChapterIndex = chapters.length >= 2 && !isOverviewAndRoleOnly;

  const handleChapterClick = (event, chapterId) => {
    event.preventDefault();
    const target = document.getElementById(`project-chapter-${chapterId}`);

    if (!target) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    target.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
    setActiveChapter(chapterId);
  };

  const showPreviousImage = () => {
    setLightboxIndex(
      (current) => (current - 1 + gallery.length) % gallery.length
    );
  };

  const showNextImage = () => {
    setLightboxIndex((current) => (current + 1) % gallery.length);
  };

  return (
    <main className="project-detail-page">
      <div className="project-detail-pattern" aria-hidden="true"></div>
      <div className="project-detail-glow" aria-hidden="true"></div>

      <div className="project-detail-container">
        <div className="project-detail-topbar">
          <Link to="/#projects" className="project-detail-back">
            <FaArrowLeft size={13} aria-hidden="true" />
            All projects
          </Link>
          <span className="project-detail-counter">
            {padNumber(projectIndex + 1)}
            <span> / {padNumber(projects.length)}</span>
          </span>
        </div>

        <header className="project-detail-hero">
          <span className="project-detail-watermark" aria-hidden="true">
            {meta.label}
          </span>

          <div
            className="project-detail-hero-content"
            data-aos="fade-up"
            data-aos-duration="1200"
          >
            <div className="project-detail-meta">
              <span className="project-detail-meta-pill is-category">
                {CategoryIcon ? (
                  <CategoryIcon size={14} aria-hidden="true" />
                ) : null}
                {meta.label}
              </span>
              {project.year ? (
                <span className="project-detail-meta-pill">{project.year}</span>
              ) : null}
              {project.duration ? (
                <span className="project-detail-meta-pill">
                  {project.duration}
                </span>
              ) : null}
            </div>

            <h1 className="project-detail-title rajdhani-bold">
              {titleLead ? `${titleLead} ` : ""}
              <span>{accentWord}</span>
            </h1>

            <p className="project-detail-tagline">{project.tagline}</p>

            <div className="project-detail-actions">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-detail-btn is-primary"
              >
                Visit Live Site
                <FaExternalLinkAlt size={13} aria-hidden="true" />
              </a>
              {nextProject ? (
                <Link
                  to={`/projects/${nextProject.slug}`}
                  className="project-detail-btn is-ghost"
                >
                  Next Project
                  <FaArrowRight size={13} aria-hidden="true" />
                </Link>
              ) : null}
            </div>
          </div>
        </header>

        <ProjectShowcase project={project} />

        {quickFacts.length > 0 ? (
          <section
            className="project-detail-facts"
            aria-label="Project quick facts"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            {quickFacts.map((fact) => {
              const FactIcon = fact.Icon;

              return (
                <div key={fact.label} className="project-detail-fact">
                  <span className="project-detail-fact-icon" aria-hidden="true">
                    <FactIcon size={16} />
                  </span>
                  <span className="project-detail-fact-copy">
                    <span>{fact.label}</span>
                    <strong>{fact.value}</strong>
                  </span>
                </div>
              );
            })}
          </section>
        ) : null}

        {chapters.length > 0 ? (
          <section
            className="project-detail-chapters"
            aria-label="Project story"
          >
            <div
              className={`project-detail-chapters-layout${
                showChapterIndex ? "" : " has-no-index"
              }`}
            >
              {showChapterIndex ? (
                <nav
                  className="project-detail-index"
                  aria-label="Case study chapters"
                >
                  <span className="project-detail-index-title">Case study</span>
                  {chapters.map((chapter) => (
                    <a
                      key={chapter.id}
                      href={`#project-chapter-${chapter.id}`}
                      className={`project-detail-index-link${
                        activeChapter === chapter.id ? " is-active" : ""
                      }`}
                      aria-current={
                        activeChapter === chapter.id ? "true" : undefined
                      }
                      onClick={(event) => handleChapterClick(event, chapter.id)}
                    >
                      <span className="project-detail-index-number">
                        {chapter.number}
                      </span>
                      <span>{chapter.label}</span>
                    </a>
                  ))}
                </nav>
              ) : null}

              <div className="project-detail-chapter-list">
                {chapters.map((chapter) => (
                  <section
                    key={chapter.id}
                    id={`project-chapter-${chapter.id}`}
                    data-project-chapter={chapter.id}
                    className="project-detail-chapter"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                  >
                    {showChapterIndex ? (
                      <span
                        className="project-detail-chapter-ghost"
                        aria-hidden="true"
                      >
                        {chapter.number}
                      </span>
                    ) : null}
                    <div className="project-detail-chapter-content">
                      {showChapterIndex ? (
                        <span className="project-detail-eyebrow">
                          Chapter {chapter.number}
                        </span>
                      ) : null}
                      <h2 className="project-detail-chapter-title rajdhani-bold">
                        {chapter.title}
                      </h2>

                      {chapter.results?.length ? (
                        <ul className="project-detail-results">
                          {chapter.results.map((result) => (
                            <li key={result}>
                              <FaCheckCircle size={17} aria-hidden="true" />
                              <span>{result}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="project-detail-chapter-text">
                          {chapter.text}
                        </p>
                      )}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {project.techStack?.length > 0 ? (
          <section
            className="project-detail-panel project-detail-stack"
            aria-labelledby="project-detail-stack-title"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <div className="project-detail-panel-heading">
              <span className="project-detail-eyebrow">
                Tools &amp; Technologies
              </span>
              <h2
                id="project-detail-stack-title"
                className="project-detail-panel-title rajdhani-bold"
              >
                What powered the build
              </h2>
            </div>

            <div className="project-detail-stack-grid">
              {project.techStack.map((tech) => {
                const TechIcon = getTechIcon(tech);

                return (
                  <span key={tech} className="project-detail-tech-chip">
                    {TechIcon ? (
                      <TechIcon size={15} aria-hidden="true" />
                    ) : null}
                    <span>{tech}</span>
                  </span>
                );
              })}
            </div>
          </section>
        ) : null}

        {project.features?.length > 0 ? (
          <section
            className="project-detail-panel project-detail-features"
            aria-labelledby="project-detail-features-title"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <div className="project-detail-panel-heading">
              <span className="project-detail-eyebrow">Key Features</span>
              <h2
                id="project-detail-features-title"
                className="project-detail-panel-title rajdhani-bold"
              >
                Built for the way it is used
              </h2>
            </div>

            <div className="project-detail-feature-grid">
              {project.features.map((feature, index) => (
                <article key={feature} className="project-detail-feature">
                  <span
                    className="project-detail-feature-number"
                    aria-hidden="true"
                  >
                    {padNumber(index + 1)}
                  </span>
                  <p>{feature}</p>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {gallery.length > 0 ? (
          <section
            className="project-detail-panel project-detail-gallery"
            aria-labelledby="project-detail-gallery-title"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <div className="project-detail-panel-heading">
              <span className="project-detail-eyebrow">Gallery</span>
              <h2
                id="project-detail-gallery-title"
                className="project-detail-panel-title rajdhani-bold"
              >
                A closer look
              </h2>
            </div>

            <div className="project-detail-gallery-grid">
              {gallery.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  className="project-detail-gallery-item"
                  onClick={() => setLightboxIndex(index)}
                  aria-label={`Open gallery image ${index + 1} of ${
                    gallery.length
                  }`}
                >
                  <ProjectImage
                    src={image}
                    alt={`${project.title} gallery image ${index + 1}`}
                    className="project-detail-gallery-image"
                    fallbackLabel="Gallery preview"
                  />
                  <span className="project-detail-gallery-index" aria-hidden="true">
                    {padNumber(index + 1)}
                  </span>
                </button>
              ))}
            </div>
          </section>
        ) : null}

        <nav className="project-detail-nav" aria-label="More projects">
          {previousProject ? (
            <Link
              to={`/projects/${previousProject.slug}`}
              className="project-detail-nav-card is-previous"
            >
              <span className="project-detail-nav-media">
                <ProjectImage
                  src={previousProject.image}
                  alt=""
                  className="project-detail-nav-image"
                  decorative
                  fallbackLabel="Previous project"
                />
              </span>
              <span className="project-detail-nav-shade" aria-hidden="true"></span>
              <span className="project-detail-nav-content">
                <span className="project-detail-nav-label">
                  <FaArrowLeft size={12} aria-hidden="true" />
                  Previous project
                </span>
                <span className="project-detail-nav-title rajdhani-bold">
                  {previousProject.title}
                </span>
              </span>
            </Link>
          ) : null}

          {nextProject ? (
            <Link
              to={`/projects/${nextProject.slug}`}
              className="project-detail-nav-card is-next"
            >
              <span className="project-detail-nav-media">
                <ProjectImage
                  src={nextProject.image}
                  alt=""
                  className="project-detail-nav-image"
                  decorative
                  fallbackLabel="Next project"
                />
              </span>
              <span className="project-detail-nav-shade" aria-hidden="true"></span>
              <span className="project-detail-nav-content">
                <span className="project-detail-nav-label">
                  Next project
                  <FaArrowRight size={12} aria-hidden="true" />
                </span>
                <span className="project-detail-nav-title rajdhani-bold">
                  {nextProject.title}
                </span>
              </span>
            </Link>
          ) : null}
        </nav>

        <section
          className="project-detail-cta"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <div>
            <span className="project-detail-eyebrow">Next step</span>
            <h2 className="project-detail-cta-title rajdhani-bold">
              Have a project in mind?
            </h2>
            <p className="project-detail-cta-copy">
              Tell me what you are building, where it is stuck, and what success
              should look like.
            </p>
          </div>
          <Link to="/#contact" className="project-detail-btn is-primary">
            Start a conversation
            <FaArrowRight size={13} aria-hidden="true" />
          </Link>
        </section>
      </div>

      {lightboxIndex !== null && gallery[lightboxIndex] ? (
        <div
          className="project-detail-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} gallery`}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setLightboxIndex(null);
            }
          }}
        >
          <button
            ref={closeButtonRef}
            type="button"
            className="project-detail-lightbox-close"
            onClick={() => setLightboxIndex(null)}
            aria-label="Close gallery"
          >
            <FaTimes size={18} aria-hidden="true" />
          </button>

          <button
            type="button"
            className="project-detail-lightbox-nav is-previous"
            onClick={showPreviousImage}
            aria-label="Previous gallery image"
          >
            <FaChevronLeft size={18} aria-hidden="true" />
          </button>

          <div className="project-detail-lightbox-stage">
            <ProjectImage
              src={gallery[lightboxIndex]}
              alt={`${project.title} gallery image ${lightboxIndex + 1}`}
              className="project-detail-lightbox-image"
              loading="eager"
              fallbackLabel="Gallery preview"
            />
            <span className="project-detail-lightbox-counter">
              {padNumber(lightboxIndex + 1)} / {padNumber(gallery.length)}
            </span>
          </div>

          <button
            type="button"
            className="project-detail-lightbox-nav is-next"
            onClick={showNextImage}
            aria-label="Next gallery image"
          >
            <FaChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      ) : null}
    </main>
  );
};

export default ProjectDetails;
