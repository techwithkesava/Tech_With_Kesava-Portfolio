interface TechBadgeProps {
  name: string;
  className?: string;
}

export default function TechBadge({ name, className = "" }: TechBadgeProps) {
  return (
    <span className={`tech-badge ${className}`}>
      {name}
    </span>
  );
}
