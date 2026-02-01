const StandingsTableSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-sm animate-pulse">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-[10px] uppercase tracking-widest text-slate-500 border-b border-white/5 bg-white/[0.02]">
              {Array.from({ length: 8 }).map((_, index) => (
                <th key={index} className="px-4 py-4 font-black">
                  <div className="h-3 w-6 rounded-full bg-slate-700/60" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 8 }).map((_, rowIndex) => (
              <tr key={rowIndex} className="border-b border-white/5 last:border-b-0">
                <td className="px-4 py-4">
                  <div className="h-3 w-4 rounded-full bg-slate-700/60" />
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-slate-700/60" />
                    <div className="h-3 w-24 rounded-full bg-slate-700/60" />
                  </div>
                </td>
                {Array.from({ length: 6 }).map((_, cellIndex) => (
                  <td key={cellIndex} className="px-4 py-4">
                    <div className="h-3 w-6 rounded-full bg-slate-700/60 mx-auto" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default StandingsTableSkeleton
