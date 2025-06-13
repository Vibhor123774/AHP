import Container from './container'
import ContactForm from './ContactForm'
import Image from 'next/image'
import {
  Typography,
  Card,
  CardBody,
  List,
  ListItem
} from '@material-tailwind/react'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const BlogBodyTemplate = (props) => {
  return (
    <div className="flex flex-col mx-4 md:flex-row">
      {/* Main Panel Content */}
      {/* <div className="flex mb-4 flex-col items-center md:w-3/4"> */}
      <div className="flex mb-4 mx-8 flex-col items-center md:mx-16">
        <h1 className="mt-4 px-2 pt-4 text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:px-8 lg:text-3xl lg:leading-tight ">
          {props.data.title}
        </h1>
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
        <Image
          src={props.data.imgUrl}
          width={372}
          height={270}
          alt="blog-image"
          className="rounded"
        />
        <div id="blog content" className="my-2">
          {props.data.contentParagraphs.map((contentObj, index) => (
            <Typography
              variant="paragraph"
              color="black"
              className="mx-2 my-2"
              key={index}
            >
              {contentObj.content}
            </Typography>
          ))}
        </div>
      </div>
      {/* Right Hand Panel Content */}
    </div>
  )
}

function RandomCard(props) {
  return (
    <Card className="m-8 w-84 lg:w-64 lg:h-72">
      {/* <CardHeader color="transparent">

      </CardHeader> */}
      <CardBody>
        <Typography variant="h5" className="mb-2">
          {props.title}
        </Typography>
        <Typography>{props.content}</Typography>
      </CardBody>
    </Card>
  )
}

export default BlogBodyTemplate

const SeperatorDot = () => {
  return (
    <div className="w-[8px] h-[8px] bg-gray-700 rounded my-auto mx-2"></div>
  )
}
