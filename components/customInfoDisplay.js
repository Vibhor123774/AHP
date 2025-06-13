import Image from 'next/image'
import React from 'react'
import Container from './container'
import { Button } from '@material-tailwind/react'

const customInfoDisplay = (props) => {
  const { data } = props
  return (
    <>
      <Container className="flex flex-wrap mx-4 sm:mx-24 md:gap-10 md:flex-nowrap ">
        <div
          className={`flex items-center justify-center w-full md:w-1/2 ${
            props.imgPos === 'right' ? 'lg:order-1' : ''
          }`}
        >
          <div>
            <Image
              src={data.image}
              width="720"
              height="auto"
              alt="Benefits"
              className={'object-cover'}
              placeholder="blur"
              blurDataURL={data.image.src}
            />
          </div>
        </div>

        <div
          className={`flex flex-wrap items-center w-full md:w-1/2 ${
            data.imgPos === 'right' ? 'lg:justify-end' : ''
          }`}
        >
          <div>
            <div className="flex flex-col w-full mt-4">
              <h3 className="max-w-2xl m-auto lg:m-0 text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl">
                {data.title}
              </h3>
            </div>

            <div className="w-full mt-5">
              {data.bullets.map((item, index) => (
                <Benefit
                  key={index}
                  title={item.title}
                  icon={item.icon}
                  ctaUrl={item.ctaUrl}
                  iconBg = {data.iconBg}
                >
                  {item.desc}
                </Benefit>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

function Benefit(props) {
  return (
    <>
      <div className="flex items-start mt-8 space-x-3">
        <div className={`flex items-center justify-center flex-shrink-0 mt-1 bg-indigo-200 rounded-md w-11 h-11`}>
          {React.cloneElement(props.icon, {
            className: `w-7 h-7 text-indigo-50`
          })}
        </div>
        <div>
          <h4 className="text-xl font-medium text-gray-800">{props.title}</h4>
          <p className="mt-1 text-gray-500">{props.children}</p>
          {props.ctaUrl && (
            <a href={props.ctaUrl} className="inline-block">
              <Button
                variant="outlined"
                className="flex items-center gap-2 mt-2"
              >
                Learn More
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </Button>
            </a>
          )}
        </div>
      </div>
    </>
  )
}
export default customInfoDisplay
