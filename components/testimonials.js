import React from 'react'
import { Carousel } from '@material-tailwind/react'
import TestimonialCard from './TestimonialCard'
import { testimonialList } from './data'

const Testimonials = () => {
  return (
    <div className="flex justify-center">
      <Carousel
        className="rounded-xl lg:w-1/2 h-1/1"
        autoplay
        autoplayDelay={4000}
        loop
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
            {new Array(length).fill('').map((_, i) => (
              <span
                key={i}
                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                  activeIndex === i ? 'w-8 bg-white' : 'w-4 bg-white/50'
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}
      >
        {testimonialList.map((testimonial, index) => (
          <TestimonialCard
            personName={testimonial.personName}
            personPic={testimonial.personPic}
            message={testimonial.message}
            numberOfStars={testimonial.numberOfStars}
            index={index}
          />
        ))}
      </Carousel>
    </div>
  )
}

export default Testimonials
