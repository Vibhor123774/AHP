import { Typography } from '@material-tailwind/react'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import { ServiceCard } from '../components/ServiceCard'
import {
  dissertationData,
  dissertationDataV2,
  programmingData,
  programmingDataV2,
  researchPaperData,
  researchPaperDataV2,
  thesisData,
  thesisDataV2
} from '../components/data/servicesData'
import CustomBreadcrumbs from '../components/CustomBreadcrumbs'

const samples = () => {
  const serviceList = [
    dissertationDataV2,
    programmingDataV2,
    researchPaperDataV2,
    thesisDataV2
  ]
  return (
    <>
      <Head>
        <title>
          AHP Services | Thesis, Research, Programming & Dissertation Writing
        </title>
        <meta
          name="description"
          content="Explore our professional services, including thesis writing, research projects, programming assistance, and dissertation writing. Get expert support for academic success."
        />
        <meta name="robots" content="index,follow" />
        <link rel="icon" href="/favicon.png" />
        <link
          rel="canonical"
          href="https://www.assignmentshelpprovider.com/services"
        />
      </Head>
      <Navbar />
      <div className="mx-8">
        <CustomBreadcrumbs />
      </div>
      <div className="flex mx-4 md:mx-8 flex-col items-center">
        <Typography variant="h1" className="text-gray-800 mb-4">
          Services
        </Typography>
        <div className="grid m-auto grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2 lg:grid-cols-4">
          {serviceList.map((data, index) => (
            <ServiceCard data={data} key={index} />
          ))}
        </div>
      </div>

      <Footer />
    </>
  )
}
export default samples
