'use client'
import { Typography } from '@material-tailwind/react'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import { sampleList } from '../components/data'
import { SampleCards } from '../components/SampleCards'
import CustomBreadcrumbs from '../components/CustomBreadcrumbs'

const samples = () => {
   const canonicalUrl = `https://www.assignmentshelpprovider.com/samples/`
  return (
    <>
      <Head>
        <title>
          Explore Our Academic Samples | Accounts, Dissertation, Research,
          Finance & More
        </title>
        <meta
          name="description"
          content="Discover our curated academic samples, including accounts, dissertations, research projects, and finance reports. Perfect for insights and guidance in your studies."
        />
        <meta name="robots" content="index,follow" />
         <link rel="canonical" href={canonicalUrl} />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Navbar />
      <div className="mx-8">
        <CustomBreadcrumbs />
      </div>
      <div className="flex mb-4 flex-col items-center">
        <Typography variant="h1" className="text-gray-800">
          Samples
        </Typography>
      </div>

      <div className="grid m-auto grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2 lg:grid-cols-4">
        {sampleList.map((card, index) => (
          <SampleCards
            name={card.name}
            imageUrl={card.imgUrl}
            urlPath={`/samples` + card.path}
            key={index}
          />
        ))}
      </div>
      <Footer />
    </>
  )
}
export default samples
