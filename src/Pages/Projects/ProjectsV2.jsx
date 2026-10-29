import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  FaArrowRight,
  FaExternalLinkAlt,
  FaMinus,
  FaPlus,
  FaThLarge,
} from "react-icons/fa";
import { Link } from "react-router";
import {
  categoryMeta,
  projects,
} from "../../data/projects.data";
import { categoryIconMap } from "./projectIcons";
import ProjectImage from "./ProjectImage";

const categoryOrder = ["wordpress", "framer", "fullstack"];

const groupedProjects = categoryOrder.reduce((groups, category) => {
  groups[category] = projects.filter(
    (project) => project.category === category
  );
  return groups;
}, {});

const allProjectsBySet = Array.from({
  length: Math.max(
    ...categoryOrder.map((category) => groupedProjects[category].length)
  ),
}).flatMap((_, setIndex) =>
    categoryOrder.map((category) => groupedProjects[category][setIndex])
  )
  .filter(Boolean);
const featuredProjects = allProjectsBySet.slice(0, 3);

const tabs = [
  { id: "all", label: "All", count: projects.length, Icon: FaThLarge },
  ...categoryOrder.map((category) => ({
    id: category,
    label: categoryMeta[category].label,
    count: groupedProjects[category].length,
    Icon: categoryIconMap[category],
  })),
];

const padNumber = (value) => String(value).padStart(2, "0");

const ProjectCard = ({
  project,
  globalIndex,
  isLarge,
  isUniform,
  slotClass,
}) => {
  const [canAutoScroll, setCanAutoScroll] = useState(false);
  const mediaRef = useRef(null);
  const meta = categoryMeta[project.category];
  const CategoryIcon = categoryIconMap[project.category];

  const updateAutoScroll = useCallback(() => {
    const media = mediaRef.current;
    const image = media?.querySelector("img");
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    setCanAutoScroll(
      Boolean(
        image &&
          image.complete &&
          image.naturalHeight > media.clientHeight * 1.6 &&
          !prefersReducedMotion
      )
    );
  }, []);

  useEffect(() => {
    const media = mediaRef.current;
    if (!media) return;

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(updateAutoScroll)
        : null;
    resizeObserver?.observe(media);
    window.addEventListener("resize", updateAutoScroll);
    updateAutoScroll();

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", updateAutoScroll);
    };
  }, [updateAutoScroll]);

  const handleSpotlight = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--projects-v2-spot-x",
      `${event.clientX - bounds.left}px`
    );
    event.currentTarget.style.setProperty(
      "--projects-v2-spot-y",
      `${event.clientY - bounds.top}px`
    );
  };

  return (
    <article
      className={`projects-v2-card projects-v2-card--${
        isUniform ? "uniform" : isLarge ? "large" : "small"
      }${slotClass ? ` ${slotClass}` : ""}${
        canAutoScroll ? " is-scrollable" : ""
      }`}
      style={{ "--projects-v2-delay": `${globalIndex * 70}ms` }}
      onMouseMove={handleSpotlight}
    >
      <div ref={mediaRef} className="projects-v2-card-media">
        <ProjectImage
          src={project.image}
          alt={`${project.title} homepage screenshot`}
          className="projects-v2-card-image"
          fallbackLabel="Project preview"
          onLoad={updateAutoScroll}
        />
        <span className="projects-v2-card-shade" aria-hidden="true"></span>
        <span className="projects-v2-card-spotlight" aria-hidden="true"></span>
      </div>

      <span className="projects-v2-card-index" aria-hidden="true">
        {padNumber(globalIndex + 1)}
      </span>

      <div className="projects-v2-card-overlay">
        <div className="projects-v2-card-info">
          <span className="projects-v2-card-category">
            {CategoryIcon ? (
              <CategoryIcon size={13} aria-hidden="true" />
            ) : null}
            <span>{meta.label}</span>
          </span>
          <h3 className="projects-v2-card-title">
            <Link to={`/projects/${project.slug}`}>{project.title}</Link>
          </h3>
        </div>

        <div className="projects-v2-card-actions">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="projects-v2-card-action projects-v2-card-action--live"
            aria-label={`Open ${project.title} live site in a new tab`}
            title="Open live site"
          >
            <FaExternalLinkAlt size={14} aria-hidden="true" />
            <span className="projects-v2-card-action-label">Live</span>
          </a>
          <Link
            to={`/projects/${project.slug}`}
            className="projects-v2-card-action projects-v2-card-action--details"
            aria-label={`View ${project.title} details`}
            title="View project details"
          >
            <FaArrowRight size={14} aria-hidden="true" />
            <span className="projects-v2-card-action-label">Details</span>
          </Link>
        </div>
      </div>
    </article>
  );
};

const ProjectsV2 = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [expanded, setExpanded] = useState(false);
  const [renderKey, setRenderKey] = useState(0);
  const [indicator, setIndicator] = useState({
    left: 0,
    width: 0,
    ready: false,
  });
  const [gridHeight, setGridHeight] = useState(null);

  const tabRefs = useRef([]);
  const tabListRef = useRef(null);
  const gridRef = useRef(null);

  const activeIndex = tabs.findIndex((tab) => tab.id === activeTab);
  const isUniform = activeTab !== "all";

  const visibleProjects = useMemo(() => {
    if (activeTab === "all") {
      return expanded ? allProjectsBySet : featuredProjects;
    }

    return groupedProjects[activeTab] ?? [];
  }, [activeTab, expanded]);

  const rows = useMemo(
    () =>
      [0, 1, 2]
        .map((rowIndex) => visibleProjects.slice(rowIndex * 3, rowIndex * 3 + 3))
        .filter((row) => row.length > 0),
    [visibleProjects]
  );

  const activateTab = (tabId) => {
    setActiveTab(tabId);
    setExpanded(false);
    setRenderKey((current) => current + 1);
  };

  const handleTabKeyDown = (event, index) => {
    const lastIndex = tabs.length - 1;
    let nextIndex = index;

    if (event.key === "ArrowRight") {
      nextIndex = index === lastIndex ? 0 : index + 1;
    } else if (event.key === "ArrowLeft") {
      nextIndex = index === 0 ? lastIndex : index - 1;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = lastIndex;
    } else {
      return;
    }

    event.preventDefault();
    activateTab(tabs[nextIndex].id);
    window.requestAnimationFrame(() => tabRefs.current[nextIndex]?.focus());
  };

  const toggleExpanded = () => {
    setExpanded((current) => !current);
    setRenderKey((current) => current + 1);
  };

  useEffect(() => {
    const updateIndicator = () => {
      const list = tabListRef.current;
      const activeButton = tabRefs.current[activeIndex];

      if (!list || !activeButton) return;

      const listBounds = list.getBoundingClientRect();
      const buttonBounds = activeButton.getBoundingClientRect();

      setIndicator({
        left: buttonBounds.left - listBounds.left,
        width: buttonBounds.width,
        ready: true,
      });
    };

    updateIndicator();

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(updateIndicator)
        : null;

    if (resizeObserver && tabListRef.current) {
      resizeObserver.observe(tabListRef.current);
      tabRefs.current.forEach((button) => {
        if (button) resizeObserver.observe(button);
      });
    }

    window.addEventListener("resize", updateIndicator);

    if (document.fonts?.ready) {
      document.fonts.ready.then(updateIndicator);
    }

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", updateIndicator);
    };
  }, [activeIndex]);

  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const updateHeight = () => {
      setGridHeight(grid.getBoundingClientRect().height);
    };

    updateHeight();

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(updateHeight)
        : null;

    resizeObserver?.observe(grid);

    return () => resizeObserver?.disconnect();
  }, [activeTab, expanded]);

  return (
    <section
      id="projects"
      className="projects-v2-section scroll-mt-28 relative overflow-hidden"
    >
      <div
        className="projects-v2-pattern absolute inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      ></div>

      <div className="projects-v2-container relative z-10 mt-20 xl:mt-30 max-w-[1320px] mx-auto">
        <div
          className="projects-v2-header"
          data-aos="fade-up"
          data-aos-duration="1200"
        >
          <h2 className="projects-v2-title skills-v2-title rajdhani-bold">
            My <span>Projects</span>
          </h2>
          <p className="projects-v2-header-copy skills-v2-subtitle">
            A selection of websites and web applications I have built for
            clients, from WordPress and Framer sites to full stack products.
          </p>
        </div>

        <div className="projects-v2-tabs-wrap">
          <div
            ref={tabListRef}
            className="projects-v2-tabs"
            role="tablist"
            aria-label="Project categories"
            aria-orientation="horizontal"
          >
            {tabs.map((tab, index) => {
              const isActive = tab.id === activeTab;
              const TabIcon = tab.Icon;

              return (
                <button
                  key={tab.id}
                  ref={(element) => {
                    tabRefs.current[index] = element;
                  }}
                  type="button"
                  role="tab"
                  id={`projects-v2-tab-${tab.id}`}
                  aria-selected={isActive}
                  aria-controls="projects-v2-panel"
                  tabIndex={isActive ? 0 : -1}
                  className={`projects-v2-tab${
                    isActive ? " is-active" : ""
                  }`}
                  onClick={() => activateTab(tab.id)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                >
                  {TabIcon ? (
                    <TabIcon
                      className="projects-v2-tab-icon"
                      size={17}
                      aria-hidden="true"
                    />
                  ) : null}
                  <span className="projects-v2-tab-label">{tab.label}</span>
                  <span className="projects-v2-tab-count">
                    {tab.count}
                  </span>
                </button>
              );
            })}

            <span
              className={`projects-v2-tab-highlight${
                indicator.ready ? " is-ready" : ""
              }`}
              style={{
                width: `${indicator.width}px`,
                transform: `translateX(${indicator.left}px)`,
              }}
              aria-hidden="true"
            ></span>
          </div>
        </div>

        <div
          id="projects-v2-panel"
          role="tabpanel"
          aria-labelledby={`projects-v2-tab-${activeTab}`}
          tabIndex={0}
          className="projects-v2-panel"
        >
          {visibleProjects.length > 0 ? (
            <div
              className="projects-v2-grid-shell"
              style={{
                height: gridHeight === null ? "auto" : `${gridHeight}px`,
              }}
            >
              <div ref={gridRef} className="projects-v2-grid">
                {rows.map((rowProjects, setIndex) => {
                  const isReversed = !isUniform && setIndex % 2 !== 0;
                  const largeIndex = isReversed ? rowProjects.length - 1 : 0;

                  return (
                    <div
                      key={`${activeTab}-${renderKey}-row-${setIndex}`}
                      className={`projects-v2-bento-row${
                        isUniform ? " projects-v2-bento-row--uniform" : ""
                      }${
                        isReversed ? " is-reversed" : ""
                      }${
                        !isUniform && rowProjects.length === 2
                          ? " projects-v2-bento-row--two"
                          : ""
                      }`}
                    >
                      {rowProjects.map((project, itemIndex) => {
                        const isLarge = itemIndex === largeIndex;
                        const smallPosition =
                          itemIndex < largeIndex ? itemIndex : itemIndex - 1;
                        const slotClass = isLarge
                          ? ""
                          : smallPosition === 0
                            ? "projects-v2-card--small-a"
                            : "projects-v2-card--small-b";

                        return (
                          <ProjectCard
                            key={`${activeTab}-${renderKey}-${project.id}`}
                            project={project}
                            globalIndex={setIndex * 3 + itemIndex}
                            isLarge={!isUniform && isLarge}
                            isUniform={isUniform}
                            slotClass={isUniform ? "" : slotClass}
                          />
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <p className="projects-v2-empty-state">Coming soon</p>
          )}

          {activeTab === "all" ? (
            <div className="projects-v2-actions">
              <button
                type="button"
                className="projects-v2-more-btn"
                aria-expanded={expanded}
                aria-controls="projects-v2-panel"
                onClick={toggleExpanded}
              >
                <span>{expanded ? "Show less" : "View more projects"}</span>
                {expanded ? (
                  <FaMinus size={14} aria-hidden="true" />
                ) : (
                  <FaPlus size={14} aria-hidden="true" />
                )}
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default ProjectsV2;
