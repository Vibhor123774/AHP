import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button
} from '@material-tailwind/react'
import Link from 'next/link'
import { shortenText } from '../utilities/utility'

export function SampleListingCard(props) {
  return (
    <Card className="mt-6">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {props.title}
        </Typography>
        {props.children && (
          <Typography>{shortenText(props.children, 300) + '...'}</Typography>
        )}
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          color="indigo"
          size="sm"
          // onClick={() => {
          //   props.handleOnClick(props.documentUrl)
          // }}
          onClick={() => {
            window.open(props.documentUrl, '_blank').focus()
          }}
          className="mx-2"
        >
          Preview
        </Button>
        <Link href={props.documentUrl} download="sample" target="_blank">
          <Button variant="outlined" color="indigo" size="sm">
            Download
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
