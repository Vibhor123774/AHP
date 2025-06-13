import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
  Tooltip,
  Button
} from '@material-tailwind/react'
import Image from 'next/image'

export function BlogListingCard(props) {
  return (
    <Card className="max-w-[24rem] overflow-hidden hover:drop-shadow-2xl">
      <CardHeader color="transparent" className="m-0 h-80 rounded-none">
        <img
          src={props.data.imgUrl}
          alt="card-image"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h2" color="blue-gray" className="text-2xl">
          {props.data.title}
        </Typography>
        <Typography color="gray" className="mt-3">
          {props.data.cardDescription}
        </Typography>
        {/* Meta Data */}
        <div className="flex">
          <Typography color="gray" className="my-4 font-normal">
            {props.data.author}
          </Typography>
          <SeperatorDot />
          <Typography color="gray" className="my-4 font-normal">
            {props.data.lastUpdateOn}
          </Typography>
          <SeperatorDot />
          <Typography color="gray" className="my-4 font-normal">
            {props.data.readTime} minutes
          </Typography>
        </div>
      </CardBody>
      <CardFooter className="p-2 flex items-center justify-between">
        <a href={props.data.contentPageUrl} className="inline-block">
          <Button variant="text" className="flex items-center gap-2">
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
      </CardFooter>
    </Card>
  )
}

const SeperatorDot = () => {
  return (
    <div className="w-[8px] h-[8px] bg-gray-700 rounded my-auto mx-2"></div>
  )
}
