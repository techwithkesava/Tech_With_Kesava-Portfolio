const palette: Record<string, string> = {
  published: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  draft: "border-[#6b7280]/40 bg-[#6b7280]/10 text-[#9ca3af]",
  featured: "border-amber-500/30 bg-amber-500/10 text-amber-400",
};

export default function Pill({
  kind,
  children,
}: {
  kind: keyof typeof palette;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full border px-2 py-0.5 text-[11px] font-medium ${palette[kind]}`}
    >
      {children}
    </span>
  );
}
