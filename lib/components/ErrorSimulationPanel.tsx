'use client';

import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useErrorSimulationStore } from '@/lib/store/errorSimulationStore';

export function ErrorSimulationPanel() {
  const { enabled, statusCode, toggle, setStatusCode, reset } =
    useErrorSimulationStore();
  const queryClient = useQueryClient();

  const clearQueries = () => {
    queryClient.invalidateQueries();
    queryClient.refetchQueries({ type: 'active' });
  }

  useEffect(() => {
    if (enabled && statusCode) {
      clearQueries();
    }
  }, [enabled, statusCode, queryClient]);

  return (
    <div className="bg-white/10 p-3">
      <div className="flex items-center justify-between">
        <h3 className="text-md font-semibold text-red-400">Error Simulation</h3>
        <button
          onClick={() => {
            toggle();
            if (!enabled) {
              clearQueries();
            }
          }}
          className={`px-3 py-1 rounded text-xs font-medium ${
            enabled
              ? 'bg-red-500 text-white'
              : 'bg-white/20 text-white'
          }`}
        >
          {enabled ? 'ON' : 'OFF'}
        </button>
      </div>

      {enabled && (
        <div className="space-y-3 mt-3">
          <div>
            <label className="block text-xs font-medium text-white/80 mb-1">
              Status Code
            </label>
            <select
              value={statusCode || ''}
              onChange={(e) => {
                const code = e.target.value ? Number(e.target.value) : null;
                setStatusCode(code);
                if (code) {
                  clearQueries();
                }
              }}
              className="w-full px-2 py-1 text-xs border border-white/20 rounded bg-[#082422] text-white"
            >
              <option value="" className="bg-[#082422]">Select code</option>
              <option value="400" className="bg-[#082422]">400 - Bad Request</option>
              <option value="401" className="bg-[#082422]">401 - Unauthorized</option>
              <option value="403" className="bg-[#082422]">403 - Forbidden</option>
              <option value="404" className="bg-[#082422]">404 - Not Found</option>
              <option value="500" className="bg-[#082422]">500 - Internal Server Error</option>
              <option value="502" className="bg-[#082422]">502 - Bad Gateway</option>
              <option value="503" className="bg-[#082422]">503 - Service Unavailable</option>
            </select>
          </div>

          <button
            onClick={() => {
              reset();
              clearQueries();
            }}
            className="w-full px-3 py-1 bg-white/20 text-white rounded text-xs font-medium hover:bg-white/30"
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
}

