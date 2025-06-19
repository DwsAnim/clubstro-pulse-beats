import React, { useState, useEffect } from 'react';
import { getRankings } from '@/services/rankings.service';

function RankingView() {
  const [rankings, setRankings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [frequency, setFrequency] = useState<string>('weekend');
  const [type, setType] = useState<string>('Rap/Hip Hop');
  const [state, setState] = useState<string>('Lagos');
  const [top, setTop] = useState<string>('top-5');

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getRankings({ top, frequency, state, type });
        const data = Array.isArray(response?.data) ? response.data : response;
        setRankings(data);
      } catch (err) {
        setError('Failed to fetch rankings');
      } finally {
        setLoading(false);
      }
    })();
  }, [frequency, state, type, top]);

  if (loading) return <div>Loading rankings...</div>;
  if (error) return <div>{error}</div>;

  const startIdx = (currentPage - 1) * pageSize;
  const pageItems = rankings.slice(startIdx, startIdx + pageSize);
  const totalPages = Math.ceil(rankings.length / pageSize);

  return (
    <div className="p-4 max-w-md mx-auto text-white bg-[#050c1b] min-h-screen">
      <div className="flex flex-wrap gap-2 mb-4">
        <select value={frequency} onChange={(e) => setFrequency(e.target.value)} className="p-2 border rounded text-black">
          <option value="weekend">Weekend</option>
          <option value="weekly">Weekly</option>
          <option value="daily">Daily</option>
        </select>

        <select value={type} onChange={(e) => setType(e.target.value)} className="p-2 border rounded text-black">
          <option value="Rap/Hip Hop">Rap/Hip Hop</option>
          <option value="Pop">Pop</option>
          <option value="R&B">R&B</option>
        </select>

        <input
          aria-label="state"
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          placeholder="State"
          className="p-2 border rounded text-black"
        />

        <select value={top} onChange={(e) => setTop(e.target.value)} className="p-2 border rounded text-black">
          <option value="top-5">Top 5</option>
          <option value="top-10">Top 10</option>
          <option value="top-20">Top 20</option>
        </select>
      </div>

      <ul className="space-y-2">
        {pageItems.map((item, idx) => (
          <li key={idx} className="p-2 border rounded">
            {item?.club_name} — {item?.score}
          </li>
        ))}
      </ul>

      <div className="flex justify-between mt-4">
        <button
          disabled={currentPage <= 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="p-2 border rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span>Page {currentPage} of {totalPages}</span>

        <button
          disabled={currentPage >= totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="p-2 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default RankingView;
