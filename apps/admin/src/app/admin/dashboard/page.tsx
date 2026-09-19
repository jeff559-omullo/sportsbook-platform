export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <p className="text-slate-400">
          Welcome to the Sportsbook Admin.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <div className="rounded-xl bg-slate-800 p-6">
          <p className="text-slate-400">
            Matches
          </p>

          <h2 className="mt-4 text-5xl font-bold">
            0
          </h2>
        </div>

        <div className="rounded-xl bg-slate-800 p-6">
          <p className="text-slate-400">
            Bets
          </p>

          <h2 className="mt-4 text-5xl font-bold">
            0
          </h2>
        </div>

        <div className="rounded-xl bg-slate-800 p-6">
          <p className="text-slate-400">
            Users
          </p>

          <h2 className="mt-4 text-5xl font-bold">
            0
          </h2>
        </div>

        <div className="rounded-xl bg-slate-800 p-6">
          <p className="text-slate-400">
            Revenue
          </p>

          <h2 className="mt-4 text-5xl font-bold">
            KSh 0
          </h2>
        </div>
      </div>
    </div>
  );
}