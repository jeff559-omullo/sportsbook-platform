export default function AdminHeader() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-800 bg-slate-950 px-8">
      <div>
        <h2 className="text-2xl font-bold">
          Sportsbook Admin
        </h2>

        <p className="text-sm text-slate-400">
          Manage matches, bets and users
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="font-semibold">
            Administrator
          </p>

          <p className="text-sm text-slate-400">
            Online
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-600 text-lg font-bold">
          A
        </div>
      </div>
    </header>
  );
}