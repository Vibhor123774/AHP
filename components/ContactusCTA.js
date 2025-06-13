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

export function ContactUsCTA(props) {
  return (
    <Card className="max-w-[24rem] overflow-hidden drop-shadow-xl">
      <CardHeader color="transparent" className="m-0 rounded-none">
        <Image
          src="/img/blogs/contactuscta.jpg"
          width={372}
          height={270}
          alt="card-image"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h2" color="gray" className="text-2xl">
          Want help with your assignments. Contact Us Today.
        </Typography>
      </CardBody>
      <CardFooter>
        <a href="/contact" className="inline-block w-full">
          <Button color="indigo">Contact Us</Button>
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
