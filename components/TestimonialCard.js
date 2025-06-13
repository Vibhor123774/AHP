import React, { useState } from 'react'
import userImg from '../public/img/user.png'
import Image from 'next/image'
import { shortenText } from '../utilities/utility'

export default function TestimonialCard(props) {
  const personName = props.personName
  const message = props.message
  const numberOfStars = props.numberOfStars
  const [isMoreText, setIsMoreText] = useState(false)

  const toggleTextContent = () => {
    setIsMoreText((cur) => !cur)
  }

  return (
    <div
      className="flex flex-col justify-between mx-4 h-full bg-indigo-100 px-14 rounded-2xl py-8 shadow-md"
      key={props.index}
    >
      <RatingStars count={numberOfStars} />
      <Avatar image={userImg} name={personName} />

      {/* <p className="text-l leading-normal h-2/3 ">
        {message.length > 150 ? shortenText(message, 150) : message}
      </p> */}

      {message && isMoreText && (
        <p className="text-l leading-normal h-2/3 ">
          {message}
          <a
            className="text-l leading-normal text-indigo-500"
            onClick={toggleTextContent}
          >
            Read Less..
          </a>
        </p>
      )}
      {message && !isMoreText && (
        <>
          <p className="text-l leading-normal h-2/3 ">
            {shortenText(message, 160)}
            {message.length > 160 && (
              <a
                className="text-l leading-normal text-indigo-500"
                onClick={toggleTextContent}
              >
                Read More...
              </a>
            )}
          </p>
        </>
      )}
    </div>
  )
}

function Avatar(props) {
  return (
    <div className="flex items-center mt-8 space-x-3">
      <div className="flex-shrink-0 overflow-hidden rounded-full">
        <Image
          src={props.image}
          width="40"
          height="40"
          alt="Avatar"
          placeholder="blur"
        />
      </div>
      <div>
        <div className="text-lg font-medium">{props.name}</div>
        <div className="text-gray-600">{props.title}</div>
      </div>
    </div>
  )
}

const RatingStars = (props) => {
  const count = props.count
  const stars = []
  for (let index = 0; index < count; index++) {
    stars.push(
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
        key={index}
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    )
  }

  return (
    <div className="flex justify-center gap-0.5 text-green-500">{stars}</div>
  )
}
