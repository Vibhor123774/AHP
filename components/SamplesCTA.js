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

export function SamplesCTA(props) {
  return (
    <Card className="max-w-[24rem] overflow-hidden drop-shadow-xl">
      <CardHeader color="transparent" className="m-0 rounded-none">
        <Image
          src="/img/blogs/samplescta.jpeg"
          width={372}
          height={270}
          alt="card-image"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h2" color="gray" className="text-2xl">
          Check out the samples written by our experts
        </Typography>
      </CardBody>
      <CardFooter>
        <a href="/samples" className="inline-block w-full">
          <Button color="indigo">Check Samples</Button>
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
