import { processSteps } from "@/lib/site-data";

type ProcessTimelineProps = {
  showDescriptions?: boolean;
};

export function ProcessTimeline({ showDescriptions = true }: ProcessTimelineProps) {
  return (
    <ol className={`process-timeline ${showDescriptions ? "" : "process-timeline--compact"}`}>
      {processSteps.map((step, index) => (
        <li key={step.title} className="process-timeline__item" data-reveal style={{ "--delay": `${index * 55}ms` } as React.CSSProperties}>
          <div className="process-timeline__number">{String(index + 1).padStart(2, "0")}</div>
          <h3>{step.title}</h3>
          {showDescriptions ? <p>{step.description}</p> : null}
        </li>
      ))}
    </ol>
  );
}
