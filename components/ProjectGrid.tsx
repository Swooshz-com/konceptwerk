"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { ArrowIcon } from "@/components/ArrowIcon";
import { projects, type ProjectCategory } from "@/lib/site-data";

type Filter = "All" | ProjectCategory;

const filters: Filter[] = ["All", "Residential", "Commercial"];

export function ProjectGrid() {
  const [filter, setFilter] = useState<Filter>("All");
  const visibleProjects = useMemo(
    () => (filter === "All" ? projects : projects.filter((project) => project.category === filter)),
    [filter],
  );

  return (
    <>
      <div className="work-filters" role="group" aria-label="Filter selected work">
        {filters.map((item) => (
          <button
            type="button"
            key={item}
            className={filter === item ? "is-active" : ""}
            aria-pressed={filter === item}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="project-grid" aria-live="polite">
        {visibleProjects.map((project, index) => (
          <article className={`project-card project-card--${index % 4}`} key={project.slug} data-reveal="image">
            <Link href={`/work/${project.slug}`} className="project-card__image" aria-label={`View ${project.title}`}>
              <Image
                src={project.cover.src}
                alt={project.cover.alt}
                fill
                sizes="(max-width: 767px) 100vw, (max-width: 1200px) 50vw, 48vw"
                priority={index < 2}
              />
            </Link>
            <Link className="project-card__meta" href={`/work/${project.slug}`}>
              <span>
                <strong>{project.title}</strong>
                <small>{project.category}</small>
              </span>
              <ArrowIcon />
            </Link>
          </article>
        ))}
      </div>
    </>
  );
}
