import type { ReactNode } from 'react'

export type Step = { title: string; desc: ReactNode; extra?: ReactNode }

/** Vertical progress timeline used by order / return status screens */
export function Timeline({ steps, done }: { steps: Step[]; done: number }) {
  const pct = steps.length > 1 ? Math.min(1, Math.max(0, (done - 1) / (steps.length - 1))) : 0
  return (
    <div className="tl">
      <div className="tl-line"><i style={{ height: `calc(${pct * 100}% )` }} /></div>
      {steps.map((s, i) => (
        <div className={'tl-step' + (i < done ? ' done' : '')} key={i}>
          <span className="tl-dot" />
          <div className="tl-card">
            <b>{s.title}</b>
            <div className="tl-desc">{s.desc}</div>
            {s.extra}
          </div>
        </div>
      ))}
    </div>
  )
}
