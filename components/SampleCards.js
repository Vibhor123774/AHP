import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button
} from '@material-tailwind/react'
import Image from 'next/image'
import Link from 'next/link'

export function SampleCards(props) {
  return (
    <Card className="mt-6 mx-auto w-80">
      <CardHeader color="blue-gray" className="relative h-50">
        <Image
          width={512}
          height={512}
          src={props.imageUrl}
          alt={props.name}
        ></Image>
      </CardHeader>
      <CardFooter className="pt-2">
        <Link href={props.urlPath}>
          <Button className="w-full" color="indigo">
            {props.name}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
