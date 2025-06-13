import {
  Typography,
  Card,
  CardBody,
  List,
  ListItem
} from '@material-tailwind/react'

import SectionTitle from './sectionTitle'
import { Faqs } from './Faqs'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import Testimonials from '../components/testimonials'
import HeroNonhomePage from './HeroNonhomePage'
import { RatingBanner } from '../components/RatingsBanner'

const ServiceBodyTemplate = (props) => {
  return (
    <>
      <HeroNonhomePage
        title={props.data.title}
        tagLine={props.data.tagLine}
        mainImage={props.data.mainImage}
        defaultService={props.data.serviceName}
      />
      <RatingBanner />
      <div>
        <SectionTitle
          title={props.data.descriptionTitle}
          shortenContentLength="490"
        >
          {props.data.descriptionContent}
        </SectionTitle>
        {/* <TestimonialWithPictures data={props.data.testimonials} /> */}
        <div id="testimonials-section" className="text-center">
          <h2 className="m-4 px-2 text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:px-8 lg:text-3xl lg:leading-tight xl:text-3xl xl:leading-tight">
            Hear from the users
          </h2>
          <Testimonials />
        </div>
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
        {/* FAQ Section */}
        <div id="faq-section" className="text-center">
          <h2 className="m-4 px-2 text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:px-8 lg:text-3xl lg:leading-tight xl:text-3xl xl:leading-tight">
            Frequently Asked Questions
          </h2>
          <Faqs data={props.data.faqList} />
        </div>
        <div id="how-service-works" className="text-center">
          <h2 className="mt-4 px-4 pt-4 text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:px-8 lg:text-3xl lg:leading-tight xl:text-3xl xl:leading-tight">
            {props.data.howServiceWorks.title}
          </h2>
          <h2 className="py-4 px-4 text-xl font-bold leading-snug tracking-tight text-gray-600 lg:px-8 lg:text-xl lg:leading-tight xl:text-xl xl:leading-tight">
            {props.data.howServiceWorks.subtitle}
          </h2>
          <div className="flex flex-wrap justify-center my-4 mx-2 lg:mx-16 ">
            <List className="w-full">
              {props.data.howServiceWorks.itemList.map((item, index) => {
                return (
                  <ListItem className="py-2" key={index}>
                    <span className="w-2/6 pr-1 text-l font-bold leading-snug tracking-tight text-gray-700 lg:text-xl lg:w-1/6 lg:leading-tight xl:leading-tight overflow-x-clip">
                      {item.title}:
                    </span>
                    <span className="w-4/6 lg:w-5/6 ml-4">{item.content}</span>
                  </ListItem>
                )
              })}
            </List>
          </div>
        </div>
        <div id="benefit-of-service" className="text-center">
          <h2 className="m-4 px-2 text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:px-8 lg:text-3xl lg:leading-tight xl:text-3xl xl:leading-tight overflow-x-clip">
            {props.data.benefitOfService.title}
          </h2>
          <div className="flex flex-wrap justify-center my-4 mx-2 lg:mx-16 ">
            <List className="w-full">
              {props.data.benefitOfService.itemList.map((item, index) => {
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
export default ServiceBodyTemplate
