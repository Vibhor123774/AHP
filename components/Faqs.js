import React from 'react'
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Typography
} from '@material-tailwind/react'
// import { faqData } from './data'

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? 'rotate-180' : ''
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  )
}

export function Faqs(props) {
  const [open, setOpen] = React.useState(-1)

  const handleOpen = (value) => setOpen(open === value ? -1 : value)

  return (
    <div className="mx-auto w-4/5 my-2 ">
      {props.data.map((item, index) => {
        return (
          <Accordion
            open={open === index}
            icon={<Icon id={index} open={open} />}
            key={index}
          >
            <AccordionHeader onClick={() => handleOpen(index)}>
              <Typography variant="h3" className="text-xl">
                {item.questionText}
              </Typography>
            </AccordionHeader>
            <AccordionBody className="text-base">
              {htmlGenerator(item.answerText)}
            </AccordionBody>
          </Accordion>
        )
      })}
    </div>
  )
}

const htmlGenerator = (inputString) => {
  const lis = inputString.split('\n')
  var firstItemInList = 1
  if (lis[0][0] === '•') {
    firstItemInList = 0
  }
  return (
    <>
      {lis[0][0] != '•' ? lis[0] : <></>}
      <ul>
        {lis.slice(firstItemInList).map((li) => {
          return <li>{li.trim()[0] === '•' ? li : <></>}</li>
        })}
      </ul>
    </>
  )
}
