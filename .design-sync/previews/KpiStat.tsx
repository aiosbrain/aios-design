import { KpiStat } from "@aios-alpha/ui";

export const Single = () => (
  <div className="max-w-xs">
    <KpiStat
      label="Items synced"
      value="1,284"
      delta="+12%"
      deltaTone="up"
      accent="#10b981"
      spark={[0.3, 0.5, 0.45, 0.6, 0.55, 0.8, 0.7, 1]}
    />
  </div>
);

export const Grid = () => (
  <div className="grid max-w-2xl gap-4 sm:grid-cols-2">
    <KpiStat
      label="Queries"
      value="237"
      delta="+31%"
      deltaTone="up"
      accent="#8b5cf6"
      spark={[0.2, 0.35, 0.3, 0.5, 0.6, 0.75, 0.85, 1]}
    />
    <KpiStat
      label="Tasks done"
      value="91"
      delta="−4%"
      deltaTone="down"
      accent="#84cc16"
      spark={[0.8, 0.75, 0.85, 0.7, 0.65, 0.6, 0.55, 0.5]}
    />
  </div>
);
