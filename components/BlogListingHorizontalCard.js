import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button
} from '@material-tailwind/react'
import Image from 'next/image'

export function BlogListingHorizontalCard(props) {
  return (
    <Card className="w-full my-4 flex-col md:flex md:flex-row md:max-w-[48rem] hover:drop-shadow-2xl ">
      <CardHeader className="m-0 md:w-2/5 md:shrink-0 md:rounded-r-none">
        <Image
          src={props.data.imgUrl}
          width={372}
          height={270}
          alt="card-image"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody>
        {/* Category */}
        {/* <Typography variant="h6" color="gray" className="mb-4 uppercase">
          startups
        </Typography> */}
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
      </CardBody>
    </Card>
  )
}

const SeperatorDot = () => {
  return (
    <div className="w-[8px] h-[8px] bg-gray-700 rounded my-auto mx-2"></div>
  )
}
