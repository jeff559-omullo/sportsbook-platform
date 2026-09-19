interface StatusBadgeProps {
  status: string;
}

const statusStyles: Record<string, string> = {
  UPCOMING: "bg-blue-600 text-white",
  LIVE: "bg-green-600 text-white",
  FINISHED: "bg-slate-600 text-white",
  CANCELLED: "bg-red-600 text-white",
  SUSPENDED: "bg-yellow-500 text-black",
};

export default function StatusBadge({
  status,
}: StatusBadgeProps) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        statusStyles[status] ??
        "bg-slate-700 text-white"
      }`}
    >
      {status}
    </span>
  );
}