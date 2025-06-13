import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button
} from '@material-tailwind/react'
import Image from 'next/image'

export default function CustomInfoCard(props) {
  return (
    <Card className="max-w-[22rem] overflow-hidden">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 rounded-none"
      >
        <Image height={512} width={512} src={props.imgUrl} alt="card-image" />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {props.title}
        </Typography>
        <Typography>{props.content}</Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Link href={props.contentUrl}>
          <Button>Read More</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
