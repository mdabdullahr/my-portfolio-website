import { useEffect, useState } from "react";

const ProjectImage = ({
  src,
  alt,
  className = "",
  loading = "lazy",
  decorative = false,
  fallbackLabel = "Preview unavailable",
  onLoad,
}) => {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (!src || failed) {
    return (
      <div
        className={`project-image-fallback ${className}`}
        role={decorative ? undefined : "img"}
        aria-label={decorative ? undefined : alt}
        aria-hidden={decorative ? "true" : undefined}
      >
        <span>{fallbackLabel}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={decorative ? "" : alt}
      className={className}
      loading={loading}
      onLoad={onLoad}
      onError={() => setFailed(true)}
    />
  );
};

export default ProjectImage;
