import Head from 'next/head'
import Footer from '../components/footer'
import ContactForm from '../components/ContactForm'
import Navbar from '../components/navbar'

const contact = () => {
  return (
    <>
      <Head>
        <title>Contact Us | Get in Touch for Assistance</title>
        <meta
          name="description"
          content="Have questions or need help? Contact us today! We're here to assist with all your inquiries and provide the support you need promptly."
        />
        <meta name="robots" content="index,follow" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Navbar />
      <div
        id="contact-form-div"
        className="flex flex-col items-center w-full mb-4"
      >
        <h1 className="text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:mt-8 lg:px-8 lg:text-3xl lg:leading-tight">
          Enquire Now
        </h1>
        <ContactForm />
      </div>
      <Footer />
    </>
  )
}
export default contact
