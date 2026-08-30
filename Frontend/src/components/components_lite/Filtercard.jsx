import React from 'react'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
const filterData = [
  {
    filterType: "Location",
    array: [
      "New York",
      "London",
      "Paris",
      "Tokyo",
      "Gurgaon",
      "Chandigarh",
      "Kochi",
      "Indore",
      "Bhopal",
      "Patna",
      "Surat",
      "Nagpur",
      "Varanasi",
      "Remote"
    ],
  }, {
    filterType: "Industry",
    array: ["IT", "Finance", "Marketing", "Healthcare", "Education", "Manufacturing"],
  },
  {
    filterType: "Experience",
    array: [
      "0-3 years", "3-5 years", "5-7 years", "7+ years"
    ]
  },
  {
    filterType: "Salary",
    array: ["0-50k", "50k-100k", "100k-200k", "200k+"]
  }

]
const Filter = () => {
  return (
    <div className='w-full'>
      <h1 className='font-bold text-lg'> Filter Jobs</h1>
      <hr className='mt-3' />
      <RadioGroup>
        {
          filterData.map((data, i) => {
            return (<div key={i}>
              <h2 className='font-bold text-lg '>{data.filterType}</h2>
              {
                data.array.map((item, j) => {
                  return (
                    <div className='flex items-center space-x-2 my-2'>
                      <RadioGroupItem value={item}>
                      </RadioGroupItem>
                      <label >{item}</label>
                    </div>
                  )
                })
              }
            </div>)
          })
        }
      </RadioGroup>

    </div>
  )
}

export default Filter