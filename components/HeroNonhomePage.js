import Container from './container'
import ContactForm from './ContactForm'
import Image from 'next/image'
import { Button } from '@material-tailwind/react'

const HeroNonhomePage = (props) => {
  return (
    <>
      <Container className="flex flex-wrap items-center text-center">
        <div className="flex flex-col w-full items-center h-screen md:h-full lg:w-1/2 ">
          <div className="animate-hero-fade-down">
            <h1 className="mt-4 px-2 pt-4 text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:px-8 lg:text-2xl lg:leading-tight ">
              {props.title}
            </h1>
            <h2 className="py-4 text-xl font-bold leading-snug tracking-tight text-gray-600 lg:px-8 lg:text-xl lg:leading-tight">
              {props.tagLine}
            </h2>
            <Button
              onClick={handleScroll}
              color="indigo"
              className="w-1/2 my-4 lg:hidden"
            >
              Enquire Us
            </Button>
          </div>
          <Image
            src={props.mainImage}
            width={500}
            height={500}
            alt="Assignment Help Provider"
            className="mt-20 lg:mt-2"
          />
          {/* <HeroImage /> */}
          {/* <h1 className="mt-4 px-2 pt-4 text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:px-8 lg:text-2xl lg:leading-tight xl:text-3xl xl:leading-tight">
            Crack Academic Success with Our Expert Assignment Assistance!
          </h1> */}
        </div>
        <div
          id="contact-form-div"
          className="flex flex-col items-center w-full mb-4 lg:w-1/2 lg:order-2"
        >
          <h2 className="text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:mt-8 lg:px-8 lg:text-2xl lg:leading-tight xl:text-3xl xl:leading-tight">
            Enquire Now
          </h2>
          {props.defaultService ? (
            <ContactForm defaultService={props.defaultService} />
          ) : (
            <ContactForm defaultSubject={props.defaultSubject} />
          )}
        </div>
      </Container>
    </>
  )
}

const handleScroll = () => {
  window.scrollTo({
    top: document.getElementById('contact-form-div').offsetTop - 90,
    behavior: 'smooth'
  })
}

export default HeroNonhomePage
