import { Typography, Button } from '@material-tailwind/react'
// import DownloadIcon from '@mui/icons-material/Download'
import { useState } from 'react'
import Head from 'next/head'
import Navbar from '../../components/navbar'
import Footer from '../../components/footer'
import Link from 'next/link'
const business_plan = () => {
  return (
    <>
      <Head>
        <title>AHP - Assignments Help Provider</title>
        <meta
          name="description"
          content="Avail Assignment helper in affordable prices. Get online assignment help on dissertation, thesis helper,  research paper assistance & more on a wide range of subjects."
        />
        <meta name="robots" content="index,follow" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Navbar />
      {/* BODY */}
      <div className="container mx-auto w-4/5 ">
        <h2 className="px-2 pt-2 text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:text-2xl lg:leading-tight xl:text-3xl xl:leading-tight">
          Business Plan
        </h2>
        {/* SUBTITLE */}
        <div className="flex justify-between mx-2 my-2">
          <div className="flex">
            <Typography variant="paragraph" color="black">
              Words:
            </Typography>
            <Typography variant="h6" color="black" className="px-2">
              1314
            </Typography>
          </div>
          <div>
            <Button variant="outlined" color="indigo" size="sm">
              Download
            </Button>
          </div>
        </div>
        {/* CONTENT */}
        <div>
          <Typography variant="paragraph" color="black" className="mx-2">
            Carnival Row Tech Consulting Limited is a technology and consulting
            company that is created and managed by an entrepreneur who has
            experienced in the same field. The whole ownership of the company is
            bear by Mr John that is an entrepreneur and have a similar type of
            consulting businesses. MR. John is an MBA from the Massachusetts
            Institute of Technology (MIT). He has experience of more than five
            years in the field of consultation and technology management.
            Moreover, he also owns one tech firm in Silicon Valley.
          </Typography>

          <Typography variant="paragraph" className="mx-2 mt-4">
            The total start-up expenses will be $22000, which includes legal
            fees, marketing expenses, lease payments, insurance, trademark,
            registration fees, stationery, software development charges,
            internet expenses and other miscellaneous expenses. Additionally,
            the total start-up assets cost will be $78000, which includes
            furniture and fittings, computer and appliances, equipment, light
            fitting and air conditioning. The company will acquire funding from
            external sources like debt and equity. The details are reflected in
            the below-mentioned table. Table: Start-up cost
          </Typography>
        </div>
      </div>

      <Footer />
    </>
  )
}
export default business_plan
