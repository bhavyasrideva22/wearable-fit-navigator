interface ProgressBarProps {
  current: number;
  total: number;
  sectionName: string;
}

export const ProgressBar = ({ current, total, sectionName }: ProgressBarProps) => {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-muted-foreground">
          {sectionName}
        </span>
        <span className="text-sm text-muted-foreground">
          {current} of {total}
        </span>
      </div>
      <div className="w-full bg-secondary rounded-full h-2">
        <div
          className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};