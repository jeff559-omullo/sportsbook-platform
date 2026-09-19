import {
  Trophy,
  Volleyball,
  Goal,
  Dumbbell,
} from "lucide-react";

const sports = [
  {
    name: "Football",
    icon: Goal,
  },
  {
    name: "Basketball",
    icon: Trophy,
  },
  {
    name: "Tennis",
    icon: Dumbbell,
  },
  {
    name: "Volleyball",
    icon: Volleyball,
  },
];

export default function SportsNav() {
  return (
    <div className="mb-6 flex gap-4 overflow-auto">
      {sports.map((sport) => {
        const Icon = sport.icon;

        return (
          <button
            key={sport.name}
            className="flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-3 hover:bg-green-600 transition"
          >
            <Icon size={18} />

            {sport.name}
          </button>
        );
      })}
    </div>
  );
}