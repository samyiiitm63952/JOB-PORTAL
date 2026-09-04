import React, { useState } from 'react'
import { Label } from '../ui/label'

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

const Filter = () => {
  const [selected, setSelected] = useState("")

  return (
    <div className='w-full'>
      <h1 className='font-bold text-lg'>Filter Jobs</h1>
      <hr className='mt-3' />

      <div>
        {filterData.map((data, i) => (
          <div key={i} className='mb-4 mt-3'>
            <h2 className='font-bold text-base mb-2'>{data.filterType}</h2>
            {data.array.map((item, j) => {
              const id = `filter-${i}-${j}`
              return (
                <div key={id} className='flex items-center space-x-2 my-1.5'>
                  <input
                    type="radio"
                    id={id}
                    name="jobFilter"
                    value={item}
                    checked={selected === item}
                    onChange={() => setSelected(item)}
                    className='w-4 h-4 accent-black cursor-pointer'
                  />
                  <Label htmlFor={id} className='cursor-pointer font-normal text-sm'>
                    {item}
                  </Label>
                </div>
              )
            })}
          </div>
        ))}

        {selected && (
          <button
            onClick={() => setSelected("")}
            className='text-xs text-red-500 underline mt-2 cursor-pointer'
          >
            Clear filter
          </button>
        )}
      </div>
    </div>
  )
}

export default Filter