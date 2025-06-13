import {
  Typography,
  Card,
  CardBody,
  List,
  ListItem,
  CardFooter,
  Button
} from '@material-tailwind/react'

import SectionTitle from './sectionTitle'
import { Faqs } from './Faqs'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import Link from 'next/link'
import Testimonials from '../components/testimonials'
import HeroNonhomePage from './HeroNonhomePage'
import { shortenText } from '../utilities/utility'
import { RatingBanner } from '../components/RatingsBanner'

const ServiceBodyTemplate = (props) => {
  return (
    <>
      <HeroNonhomePage
        title={props.data.title}
        tagLine={props.data.tagLine}
        mainImage={props.data.mainImage}
        defaultSubject={props.data.subjectName}
      />
      <RatingBanner />
      <div>
        <SectionTitle
          title={props.data.descriptionTitle}
          shortenContentLength={490}
        >
          {props.data.descriptionContent}
        </SectionTitle>
        {/* Why AHP */}
        <div id="benefit-of-service" className="text-center">
          <h2 className="m-4 px-2 text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:px-8 lg:text-3xl lg:leading-tight xl:text-3xl xl:leading-tight">
            {props.data.whyAHP.title}
          </h2>
          <div className="flex flex-wrap justify-center my-4 mx-2 lg:mx-16 ">
            {props.data.whyAHP.itemList.map((item, index) => (
              <ContentCard
                title={item.title}
                content={item.content}
                key={index}
              />
            ))}
          </div>
        </div>
        {/* Testimonials */}
        <div id="testimonials-section" className="text-center">
          <h2 className="mt-4 px-2 text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:px-8 lg:text-3xl lg:leading-tight xl:text-3xl xl:leading-tight">
            Hear from the users
          </h2>
          <Testimonials />
        </div>
      </div>
      {/* Sample Cards */}
      <div id="sample-cards-section" className="text-center">
        <h2 className="mt-8 px-2 text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:px-8 lg:text-3xl lg:leading-tight xl:text-3xl xl:leading-tight">
          {props.data.subjectName} Samples
        </h2>
        <div className="mx-8">
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            breakpoints={{
              1240: {
                slidesPerView: 4,
                spaceBetween: 20
              }
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false
            }}
            pagination={{
              clickable: true
            }}
            // navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
          >
            {props.data.samples.map((sample, index) => {
              return (
                <SwiperSlide>
                  <SwiperCardForSubjectSample
                    title={sample.title}
                    pageUrl={sample.pageUrl}
                    key={index}
                  />
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
      </div>
      {/* Why you need service */}
      <div id="why-service" className="text-center">
        <h2 className="mt-4 px-2 text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:px-8 lg:text-3xl lg:leading-tight xl:text-3xl xl:leading-tight overflow-x-clip">
          {props.data.whyService.title}
        </h2>
        <div className="flex flex-wrap justify-center my-4 mx-2 lg:mx-16 ">
          <List className="w-full">
            {props.data.whyService.itemList.map((item, index) => {
              return (
                <ListItem className="p-1 py-2" key={index}>
                  <span className="w-2/6 pr-1 text-l font-bold leading-snug tracking-tight text-gray-700 lg:text-xl lg:w-1/6 lg:leading-tight xl:leading-tight">
                    {item.title}:
                  </span>
                  <span className="w-4/6 lg:w-5/6 ml-4">{item.content}</span>
                </ListItem>
              )
            })}
          </List>
        </div>
      </div>
      {/* How Service Works */}
      <div id="why-service" className="text-center">
        <h2 className="mt-4 px-2 text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:px-8 lg:text-3xl lg:leading-tight xl:text-3xl xl:leading-tight overflow-x-clip">
          {props.data.howServiceWorks.title}
        </h2>
        <div className="flex flex-wrap justify-center my-4 ">
          <List className="w-4/5">
            {props.data.howServiceWorks.itemList.map((item, index) => {
              return (
                <ListItem className="p-1 py-2 text-left" key={index}>
                  <li>{item.content}</li>
                </ListItem>
              )
            })}
          </List>
        </div>
      </div>
      {/* FAQ Section */}
      <div id="faq-section" className="text-center">
        <h2 className="m-4 px-2 text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:px-8 lg:text-3xl lg:leading-tight xl:text-3xl xl:leading-tight">
          Frequently Asked Questions
        </h2>
        <Faqs data={props.data.faqList} />
      </div>
    </>
  )
}

function ContentCard(props) {
  return (
    <Card className="m-8 w-80 lg:w-72 lg:h-56">
      <CardBody>
        <Typography variant="h3" className="mb-2 text-xl">
          {props.title}
        </Typography>
        <Typography>{props.content}</Typography>
      </CardBody>
    </Card>
  )
}

function SwiperCardForSubjectSample(props) {
  return (
    <Card className="m-8 w-72 h-40 lg:w-72 lg:h-40 md:py-2">
      <CardBody className="p-2">
        <Typography variant="h3" className="text-base">
          {props.title.length > 80
            ? `${shortenText(props.title, 80)}..`
            : props.title}
        </Typography>
      </CardBody>
      <CardFooter className="mt-auto p-2">
        <Link href={props.pageUrl}>
          <Button color="indigo" className="w-4/5">
            View
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
function SwiperCardForHowService(props) {
  return (
    <Card className="m-8 w-84 lg:w-64 lg:h-72">
      <CardBody>
        <Typography variant="h3" className="mb-2">
          {props.title}
        </Typography>
        <Typography>{props.content}</Typography>
      </CardBody>
    </Card>
  )
}

export default ServiceBodyTemplate
