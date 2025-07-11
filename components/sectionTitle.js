import React, { useEffect, useState } from 'react'
import Container from './container'
import { Button } from '@material-tailwind/react'
import { shortenText } from '../utilities/utility'

const SectionTitle = (props) => {
  const [isMoreText, setIsMoreText] = useState(false)

  const toggleTextContent = () => {
    setIsMoreText((cur) => !cur)
  }

  return (
    <Container
      className={`flex w-full flex-col mt-4 ${
        props.align === 'left' ? '' : 'items-center justify-center text-center'
      }`}
    >
      {props.pretitle && (
        <div className="text-sm font-bold tracking-wider text-indigo-600 uppercase">
          {props.pretitle}
        </div>
      )}

      {props.title && (
        <h2 className="max-w-4xl mt-3 text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl">
          {props.title}
        </h2>
      )}

      {/* {props.children && (
        <p
          className={`max-w-6xl py-4 text-lg leading-normal text-gray-500 lg:text-xl xl:text-xl overflow-scroll h-${props.contentHeight}`}
        >
          {props.children}
        </p>
      )} */}

      {props.children && isMoreText && (
        <p className="max-w-6xl py-4 text-lg leading-normal text-gray-500 lg:text-xl xl:text-xl">
          {props.children}
          <a
            className="max-w-6xl pl-2 text-lg leading-normal text-indigo-500 lg:text-xl xl:text-xl"
            onClick={toggleTextContent}
          >
            read less...
          </a>
        </p>
      )}
      {props.children && !isMoreText && (
        <>
          <p className="max-w-6xl py-4 text-lg leading-normal text-gray-500 lg:text-xl xl:text-xl">
            {shortenText(props.children, props.shortenContentLength)}
            <a
              className="max-w-6xl pl-2 text-lg leading-normal text-indigo-500 lg:text-xl xl:text-xl"
              onClick={toggleTextContent}
            >
              read more...
            </a>
          </p>
        </>
      )}
    </Container>
  )
}

export default SectionTitle
