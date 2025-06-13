import { Typography, Button } from '@material-tailwind/react'
// import DownloadIcon from '@mui/icons-material/Download'
import { useState } from 'react'
import Head from 'next/head'
import Navbar from '../../components/navbar'
import Footer from '../../components/footer'
import Link from 'next/link'
const management_capstone_project = () => {
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
          Examining Factors Affecting Screening Behaviour of Prostate Cancer
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
            Prostate cancer is one of the most commonly diagnosed non-skin
            cancers among men. The screening process for prostate cancer is
            worldwide accepted, the main concern about the screening process is
            the harm outweighs the advantages of screening. African American men
            have the highest rate of prostate cancer and mortality across the
            world. In comparison to African American, Asian men have a lower
            rate of prostate cancer. The main purpose of this study is to
            determine possible factors that affect screening behaviours among
            Asian, black, and ethnic minority men.
          </Typography>

          <Typography variant="paragraph" color="black" className="mx-2 mt-4">
            Thematic analysis and systematic review of different qualitative
            studies on the perspective of black, Asian, and ethnicity minor
            group’s men prostate cancer screening has been collected. In order
            to conduct this study, electronic databases and reference lists were
            critically searched until February 2023.
          </Typography>
          <Typography variant="paragraph" color="black" className="mx-2 mt-4">
            A total of 10 studies were included in this review among these
            studies 8 were from the US, 2 were from the UK, and 3 were from
            Asian countries. Results have shown that African American males more
            than 50 years old have increased positive health values. These
            individuals were more likely to achieve prostate cancer screening.
            It has been also found that less than a 40% uptake rate of prostate
            cancer screening among Asian Ethnic minorities. Language issues,
            health literacy, limited access to health data as well as screening
            services, and cultural issues were the primary barriers to the
            utilization of cancer screening.
          </Typography>
          <Typography variant="paragraph" color="black" className="mx-2 mt-4">
            It has been seen that men are interested in participating in the
            screening process for prostate cancer in order to prevent cancer if
            they are promoted through their social networks. The findings of
            this study have revealed crucial information for both health
            professionals and policymakers in order to properly understand the
            needs of Asian ethnic minorities. The findings of this study have
            provided the significance of health values, education, and screening
            intervention for “younger African American men''.
          </Typography>
        </div>
      </div>

      <Footer />
    </>
  )
}
export default management_capstone_project
