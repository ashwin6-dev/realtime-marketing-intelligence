export default function DemographicsModal({ open, onClose, campaignName, data }) {
  if (!open) return null;

  // Helper to sort entries descending by value
  const sortDescending = (obj) =>
    Object.entries(obj || {})
      .sort((a, b) => b[1] - a[1]);

  // Helper to render a horizontal progress bar
  const ProgressBar = ({ value, max = 100, color = "#3b82f6" }) => (
    <div className="w-full h-2 bg-gray-200 rounded">
      <div
        className="h-2 rounded"
        style={{
          width: `${Math.min((value / max) * 100, 100)}%`,
          background: color,
          transition: "width 0.3s"
        }}
      />
    </div>
  );

  // Pick a color for each gender (optional)
  const genderColors = {
    male: "#3b82f6",
    female: "#ec4899"
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 min-w-[320px] shadow-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
          onClick={onClose}
        >✕</button>
        <h4 className="text-lg font-bold mb-2">
          Sentiment Demographics for {campaignName}
        </h4>
        {data?.byAgeGroup ? (
          <>
            <h5 className="font-semibold mb-2">By Age Group</h5>
            <ul className="mb-4 space-y-2">
              {sortDescending(data.byAgeGroup).map(([age, value]) => (
                <li key={age}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700">{age}</span>
                    <span className="font-medium">{value.toFixed(2)}</span>
                  </div>
                  <ProgressBar value={value} />
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="text-gray-500">No age group data available.</p>
        )}
        {data?.byGender && (
          <>
            <h5 className="font-semibold mb-2">By Gender</h5>
            <ul className="space-y-2">
              {sortDescending(data.byGender).map(([gender, value]) => (
                <li key={gender}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="capitalize text-gray-700">{gender}</span>
                    <span className="font-medium">{value.toFixed(2)}</span>
                  </div>
                  <ProgressBar
                    value={value}
                    color={genderColors[gender.toLowerCase()] || "#6366f1"}
                  />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}