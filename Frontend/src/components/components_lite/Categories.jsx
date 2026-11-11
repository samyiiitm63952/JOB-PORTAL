import React from 'react'
import { Carousel, CarouselContent, CarouselItem,CarouselNext,CarouselPrevious } from '../ui/carousel'
import { Button } from '../ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const Category = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data Scientist",
  "DevOps Engineer",
  "Machine Learning Engineer",
  "Artificial Intelligence Engineer",
  "Cybersecurity Engineer",
  "Product Manager",
  "UX/UI Designer",
  "Graphics Engineer",
  "Video Editor"
];

const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (category) => {
    dispatch(setSearchedQuery(category));
    navigate("/jobs");
  };

  return (
    <div>
      <div>
        <h1 className='text-2xl font-bold text-center text-blue-600'>
          Categories
        </h1>
        <p className='text-center text-gray-600'>
          Explore our extensive job market.
        </p>
      </div>
      <Carousel className="w-full max-w-xl mx-auto my-10">
        <CarouselContent>
          {
            Category.map((category, i) => {
              return (
                <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
                  <Button
                    onClick={() => searchJobHandler(category)}
                    variant="outline"
                    className="cursor-pointer rounded-full border-gray-200 hover:border-purple-300 hover:text-purple-700"
                  >
                    {category}
                  </Button>
                </CarouselItem>
              )
            })
          }

        </CarouselContent>
        <CarouselPrevious/>
        <CarouselNext/>
      </Carousel>
    </div>
  )
}

export default Categories