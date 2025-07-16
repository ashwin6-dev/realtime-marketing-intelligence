export default function DemographicsModal({ open, onClose, campaignName, data }) {
  if (!open) return null;
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
            <ul className="mb-4">
              {Object.entries(data.byAgeGroup).map(([age, value]) => (
                <li key={age} className="flex justify-between text-sm py-1">
                  <span className="text-gray-700">{age}</span>
                  <span className="font-medium">{value.toFixed(2)}</span>
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
            <ul>
              {Object.entries(data.byGender).map(([gender, value]) => (
                <li key={gender} className="flex justify-between text-sm py-1">
                  <span className="capitalize text-gray-700">{gender}</span>
                  <span className="font-medium">{value.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}