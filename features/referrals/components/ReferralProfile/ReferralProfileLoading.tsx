export function ReferralProfileLoading() {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 animate-pulse">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto md:mx-0"></div>
        <div className="flex-1 space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
    </div>
  );
}

