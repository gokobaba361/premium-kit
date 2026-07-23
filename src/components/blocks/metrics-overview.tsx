import { ArrowDown, ArrowUp } from "@phosphor-icons/react/dist/ssr";

export type DashboardMetric = {
  label: string;
  value: string;
  change?: number;
  period?: string;
};

export function MetricsOverview({ metrics }: { metrics: DashboardMetric[] }) {
  return (
    <dl className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.slice(0, 4).map((metric) => {
        const positive = typeof metric.change === "number" && metric.change >= 0;
        return (
          <div
            key={metric.label}
            className="rounded-pk border border-line bg-elevated p-5"
          >
            <dt className="text-sm text-muted">{metric.label}</dt>
            <dd className="mt-3 font-display text-3xl tabular-nums">{metric.value}</dd>
            {typeof metric.change === "number" ? (
              <p className="mt-3 flex items-center gap-1.5 text-xs text-muted">
                {positive ? (
                  <ArrowUp size={13} weight="bold" aria-hidden className="text-accent" />
                ) : (
                  <ArrowDown size={13} weight="bold" aria-hidden />
                )}
                <span className="tabular-nums">{Math.abs(metric.change)}%</span>
                {metric.period ? <span className="text-faint">{metric.period}</span> : null}
              </p>
            ) : null}
          </div>
        );
      })}
    </dl>
  );
}
