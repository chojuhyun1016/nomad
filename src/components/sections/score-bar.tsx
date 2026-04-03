interface ScoreBarProps {
  icon: string;
  label: string;
  value: number;
  maxValue?: number;
}

export function ScoreBar({ icon, label, value, maxValue = 100 }: ScoreBarProps) {
  const percent = Math.min(Math.round((value / maxValue) * 100), 100);

  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="w-4 text-center">{icon}</span>
      <span className="w-10 font-medium">{label}</span>
      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="w-7 text-right font-semibold tabular-nums">{value}</span>
    </div>
  );
}
