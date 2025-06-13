import Head from 'next/head'
import Footer from '../components/footer'
import Image from 'next/image'
import Navbar from '../components/navbar'

const contact = () => {
  return (
    <>
      <Head>
        <title>Join Our Team | Exciting Career Opportunities</title>
        <meta
          name="description"
          content="Explore exciting career opportunities with us! Join a team of passionate professionals and grow your skills in a dynamic and rewarding work environment."
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
          Careers At AHP
        </h1>
        <Image
          src="/img/coming-soon.webp"
          width={500}
          height={500}
          alt="Coming Soon"
        />
      </div>
      <Footer />
    </>
  )
}
export default contact
