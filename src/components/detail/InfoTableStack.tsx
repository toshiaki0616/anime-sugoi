interface InfoTableRow {
  label: string;
  value: string;
}

interface InfoTableSection {
  title: string;
  accentClass: string;
  rows: InfoTableRow[];
}

interface Props {
  kicker?: string;
  sections: InfoTableSection[];
  sourceHref?: string;
  sourceLabel?: string;
}

export default function InfoTableStack({
  kicker = "REFERENCE",
  sections,
  sourceHref,
  sourceLabel,
}: Props) {
  if (sections.length === 0) {
    return null;
  }

  return (
    <section className="info-table-stack-section" aria-label="Reference info tables">
      <div className="info-table-stack-header">
        <span className="detail-panel-kicker">{kicker}</span>
        {sourceHref && sourceLabel && (
          <a
            className="info-table-stack-source"
            href={sourceHref}
            target="_blank"
            rel="noreferrer"
          >
            {sourceLabel}
          </a>
        )}
      </div>

      <div className="info-table-stack-list">
        {sections.map((section) => (
          <article
            key={`${section.title}-${section.accentClass}`}
            className={`info-table-card ${section.accentClass}`}
          >
            <header className="info-table-card-header">{section.title}</header>
            <div className="info-table-card-body">
              {section.rows.map((row) => (
                <div
                  key={`${section.title}-${row.label}-${row.value}`}
                  className="info-table-row"
                >
                  <div className="info-table-label">{row.label}</div>
                  <div className="info-table-value">{row.value}</div>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
