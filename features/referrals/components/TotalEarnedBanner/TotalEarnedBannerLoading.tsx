export function TotalEarnedBannerLoading() {
  return (
    <div className="mb-8 animate-pulse rounded-lg bg-gradient-to-br from-[#ffdb3a]/20 to-[#ffdb3a]/10 p-6 border border-[#ffdb3a]/30">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="h-6 bg-[#ffdb3a]/30 rounded w-32 mb-2"></div>
          <div className="h-10 bg-[#ffdb3a]/30 rounded w-48 mb-4"></div>
          <div className="h-4 bg-[#ffdb3a]/30 rounded w-32 mb-2"></div>
          <div className="h-4 bg-[#ffdb3a]/30 rounded w-32"></div>
        </div>
        <div className="hidden md:block">
          <div className="w-16 h-16 rounded-full bg-[#ffdb3a]/30"></div>
        </div>
      </div>
    </div>
  );
}

