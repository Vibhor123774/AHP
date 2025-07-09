import { Carousel } from '@material-tailwind/react'
import Image from 'next/image'

export function TestimonialWithPictures(props) {
  return (
    <div className="flex flex-col items-center">
      <h2 className="m-4 px-2 text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:px-8 lg:text-3xl lg:leading-tight xl:text-3xl xl:leading-tight">
        Hear from the users
      </h2>
      <Carousel
        className="lg:w-1/2 h-1/1"
        autoplay
        autoplayDelay={4000}
        loop
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
            {new Array(length).fill('').map((_, i) => (
              <span
                key={i}
                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                  activeIndex === i ? 'w-8 bg-gray' : 'w-4 bg-gray/50'
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}
      >
       {props.data.map((testimonial, index) => {
  return (
    <Image
      key={index}
      src={testimonial.imgUrl}
      height="300"
      width="250"
      alt={testimonial.alt}
      className="mx-auto"
    />
  )
})}

      </Carousel>
    </div>
  )
}
