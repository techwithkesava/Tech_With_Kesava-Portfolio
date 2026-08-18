export default function EmptyState({
  title,
  message,
  action,
}: {
  title: string;
  message: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/10 px-6 py-16 text-center">
      <p className="text-sm font-semibold text-white">{title}</p>
      <p className="mt-1 max-w-sm text-sm text-[#6b7280]">{message}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
