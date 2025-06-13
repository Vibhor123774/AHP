import Container from './container'
import ContactFormLanding from './ContactFormLanding'
import Image from 'next/image'
import { Button } from '@material-tailwind/react'

const HeroLanding = () => {
  return (
    <>
      <Container className="flex flex-wrap items-center text-center">
        <div className="flex flex-col h-screen w-full items-center lg:h-full lg:w-1/2">
          <div className="animate-hero-fade-down">
            <h1 className="mt-4 pt-4 text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:px-8 lg:text-3xl lg:leading-tight xl:text-3xl xl:leading-tight">
              Expert Academic Support & Research Guidance
            </h1>
            <h2 className="py-4 text-xl font-bold leading-snug tracking-tight text-gray-600 lg:px-8 lg:text-xl lg:leading-tight">
              Get professional insights, research strategies, and personalised
              learning support to elevate your academic journey.
            </h2>
            <Button
              onClick={handleScroll}
              color="indigo"
              className="w-1/2 my-8 lg:my-4 lg:hidden"
            >
              Book a Academic Consultation
            </Button>
          </div>
          <Image
            src="/img/hero3.svg"
            width={700}
            height={700}
            alt="Assignment Help Provider"
            className="mt-8 md:my-10 lg:my-12"
          />
        </div>
        <div
          id="contact-form-div"
          className="flex flex-col items-center w-full mb-4 lg:w-1/2 lg:order-2"
        >
          <h2 className="text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:mt-8 lg:px-8 lg:text-2xl lg:leading-tight">
            Enquire Now
          </h2>
          <ContactFormLanding />
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

export default HeroLanding
