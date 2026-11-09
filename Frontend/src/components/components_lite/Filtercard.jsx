import React from 'react'
import { Label } from '../ui/label'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedFilters, clearAllFilters } from '@/redux/jobSlice'
import { X } from 'lucide-react'

const filterData = [
  {
    filterType: "Location",
    array: [
      "New York", "London", "Paris", "Tokyo",
      "Gurgaon", "Chandigarh", "Kochi", "Indore",
      "Bhopal", "Patna", "Surat", "Nagpur",
      "Varanasi", "Remote"
    ],
  },
  {
    filterType: "Industry",
    array: ["IT", "Finance", "Marketing", "Healthcare", "Education", "Manufacturing"],
  },
  {
    filterType: "Experience",
    array: ["0-3 years", "3-5 years", "5-7 years", "7+ years"]
  },
  {
    filterType: "Salary",
    array: ["0-50k", "50k-100k", "100k-200k", "200k+"]
  }
]

const Filtercard = () => {
  const dispatch = useDispatch();
  const selectedFilters = useSelector((store) => store.job.selectedFilters) || {
    Location: [],
    Industry: [],
    Experience: [],
    Salary: []
  };

  // Toggle a single checkbox value in a category
  const handleCheckboxChange = (filterType, item) => {
    const currentList = selectedFilters[filterType] || [];
    const isAlreadySelected = currentList.includes(item);

    const updatedList = isAlreadySelected
      ? currentList.filter((val) => val !== item)
      : [...currentList, item];

    dispatch(
      setSelectedFilters({
        ...selectedFilters,
        [filterType]: updatedList
      })
    );
  };

  // Total active filter count
  const totalCount = Object.values(selectedFilters).reduce(
    (acc, curr) => acc + (Array.isArray(curr) ? curr.length : 0),
    0
  );

  return (
    <div className='w-full bg-white p-4 rounded-2xl border border-gray-200 shadow-sm'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <h1 className='font-bold text-base text-gray-800'>Filter Jobs</h1>
          {totalCount > 0 && (
            <span className='bg-purple-100 text-purple-700 text-xs font-semibold px-2 py-0.5 rounded-full'>
              {totalCount}
            </span>
          )}
        </div>
        {totalCount > 0 && (
          <button
            onClick={() => dispatch(clearAllFilters())}
            className='text-xs text-red-500 font-medium hover:underline cursor-pointer'
          >
            Clear all
          </button>
        )}
      </div>

      {/* Active Filter Chips */}
      {totalCount > 0 && (
        <div className='flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-gray-100'>
          {Object.entries(selectedFilters).map(([category, items]) =>
            items.map((item) => (
              <span
                key={`${category}-${item}`}
                className='inline-flex items-center gap-1 text-xs bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded-full'
              >
                {item}
                <X
                  size={12}
                  className='cursor-pointer hover:text-purple-900'
                  onClick={() => handleCheckboxChange(category, item)}
                />
              </span>
            ))
          )}
        </div>
      )}

      <hr className='mt-3 mb-2 border-gray-100' />

      {/* Categories with multi-select checkboxes */}
      <div className='space-y-4 max-h-[75vh] overflow-y-auto pr-1'>
        {filterData.map((data, i) => {
          const categoryCount = selectedFilters[data.filterType]?.length || 0;
          return (
            <div key={i} className='mt-3'>
              <div className='flex items-center justify-between mb-2'>
                <h2 className='font-semibold text-sm text-gray-700'>{data.filterType}</h2>
                {categoryCount > 0 && (
                  <span className='text-[11px] text-purple-600 font-medium'>
                    {categoryCount} selected
                  </span>
                )}
              </div>
              <div className='space-y-1.5 max-h-40 overflow-y-auto pr-1'>
                {data.array.map((item, j) => {
                  const id = `filter-${i}-${j}`;
                  const isChecked = selectedFilters[data.filterType]?.includes(item);
                  return (
                    <div key={id} className='flex items-center space-x-2'>
                      <input
                        type="checkbox"
                        id={id}
                        checked={isChecked || false}
                        onChange={() => handleCheckboxChange(data.filterType, item)}
                        className='w-4 h-4 rounded text-purple-600 accent-[#7209b7] focus:ring-purple-400 cursor-pointer'
                      />
                      <Label
                        htmlFor={id}
                        className={`cursor-pointer text-sm font-normal transition-colors ${
                          isChecked ? 'text-purple-700 font-medium' : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        {item}
                      </Label>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Filtercard;