import { Typography } from '@material-tailwind/react'
import { useState } from 'react'
import Head from 'next/head'
import Navbar from '../../components/navbar'
import Footer from '../../components/footer'
import { sampleList } from '../../components/data'
import { SampleCards } from '../../components/SampleCards'
import FilePreviewDrawer from '../../components/FilePreviewDrawer'
import { SampleListingCard } from '../../components/SampleListingCard'
import SectionTitle from '../../components/sectionTitle'
import CustomBreadcrumbs from '../../components/CustomBreadcrumbs'

const management = () => {
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
      <div className="container mx-auto w-4/5 lg:w-3/5">
        <CustomBreadcrumbs />
        <h2 className=" mx-auto pt-2 text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:text-2xl lg:leading-tight xl:text-3xl xl:leading-tight">
          Management Sample
        </h2>
        {/* <SectionTitle title="Accounts Sample"></SectionTitle> */}
        <SampleListingCard
          sampleContentUrl="/samples/management-capstone-project"
          title="Management Capstone Project"
          documentUrl="/documents/management/Management-Capstone-project_watermark.pdf"
        >
          Graybar Inc. is considered the largest distributor and supply chain
          business of various electrical, telecommunication, and industrial
          materials. It distributes items like telephone equipment, optical
          fiber cables, copper cables, various wireless products, etc. The
          company, which was created in 1869 by engineer Elisha Gray and
          businessman Enos Barton, is wholly controlled by its employees. In
          1872, Gray & Barton shifted their focus to Western Electric and moved
          to become the biggest manufacturer of telephones. This is the largest
          and probably the only company of its size employees owns. This study
          will focus on the current situation of the company based on a market
          overview. Graybar provides services to the industrial, corporate,
          governmental, public, utility, and residential industries. Graybar
          offerings help with building projects, capital projects, building
          renovations, servicing, restoration, management, and more. Also, the
          future goals of the company and the methods to be taken up will be
          evaluated. The Torq IT team collaborated with Graybar Canada to
          integrate marketing materials from thousands of goods and various data
          streams into a PIM application. They were enabled to develop a new
          program in collaboration with their data managers that assisted them
          in sorting all of their items into a new classification that is
          suitable for their impending E-commerce system.
        </SampleListingCard>
        <SampleListingCard
          sampleContentUrl="/samples/supply-chain-management"
          title="Supply Chain Management"
          documentUrl="/documents/management/Sample-Supply-Chain-Mgmt_watermark.pdf"
        >
          The transformative procedures that turn resources into completed
          products and services are tied together by operational management. As
          a result, controlling operational processes is critical to an
          organization's success—for example, Woolworths Group Ltd offers fresh
          items for its clients and has used these services as a recurring theme
          in its logo and well-known tagline. 'The Fresh Food People are
          Woolworths.' Throughout the COVID 19 Pandemic, the organisation has
          shown that it has successfully addressed problems that may arise
          during its routine everyday processes. Operational managers are
          supposed to devise strategies for achieving the organization's current
          and future objectives. This entails identifying issues that may
          obstruct the achievement of the objectives and efficiently addressing
          them inside the company. Woolworth's chain management, for example,
          meets and exceeds consumers' wishes and demands in a variety of ways.
          During COVID 19, however, demand and supply became a worldwide
          economic issue, putting tremendous strain on the organization's supply
          chain management.
        </SampleListingCard>
        <SampleListingCard
          title="Sample 3"
          documentUrl="/documents/management/Management-Sample-3_watermark.pdf"
        >
          Tina has chosen White Oaks, London, Ontario as the location for her
          restaurant and has selected Japanese cuisine as the cuisine of her
          choice. More particularly, her restaurant will be a sushi restaurant
          and will be called “Sakura Sushi”. This is primarily done to cater to
          the population of Asians in the area (as stated in the given case) as
          well as to introduce the local population of White Oaks to the world
          of Sushi.
        </SampleListingCard>
      </div>

      <Footer />
    </>
  )
}
export default management
