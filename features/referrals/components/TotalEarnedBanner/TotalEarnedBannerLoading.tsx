export function TotalEarnedBannerLoading() {
  return (
    <div className="mb-8 bg-white rounded-lg shadow-md p-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
          <div className="h-10 bg-gray-200 rounded w-48 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-32"></div>
        </div>
        <div className="hidden md:block">
          <div className="w-16 h-16 rounded-full bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
}

