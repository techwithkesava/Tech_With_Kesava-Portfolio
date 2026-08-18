import { CheckCircle2, AlertCircle, Info } from "lucide-react";
import type { ReactNode } from "react";

const styles = {
  success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  error: "border-rose-500/30 bg-rose-500/10 text-rose-400",
  info: "border-blue-500/30 bg-blue-500/10 text-blue-400",
} as const;

const icons = {
  success: <CheckCircle2 className="h-4 w-4 flex-shrink-0" />,
  error: <AlertCircle className="h-4 w-4 flex-shrink-0" />,
  info: <Info className="h-4 w-4 flex-shrink-0" />,
} as const;

export default function StatusMessage({
  type,
  children,
}: {
  type: keyof typeof styles;
  children: ReactNode;
}) {
  return (
    <div
      className={`flex items-start gap-2.5 rounded-lg border px-4 py-3 text-sm ${styles[type]}`}
    >
      {icons[type]}
      <span>{children}</span>
    </div>
  );
}
