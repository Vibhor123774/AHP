import Head from 'next/head'
import Navbar from '../../components/navbar'
import Footer from '../../components/footer'
import { SampleListingCard } from '../../components/SampleListingCard'
import { sampleList } from '../../components/data'
import CustomBreadcrumbs from '../../components/CustomBreadcrumbs'

const law = () => {
  return (
    <>
      <Head>
        <title>Law Assignment Sample 2025: Expert Examples & Guidance | AHP</title>
        <meta
          name="description"
          content="Explore a law assignment sample covering case studies, legal analysis, and research examples. Perfect for students seeking guidance and quality insights in legal studies."
        />
        <meta name="robots" content="index,follow" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Navbar />

      {/* BODY */}
      <div className="container mx-auto w-4/5 ">
        <CustomBreadcrumbs />
        <h2 className="px-2 pt-2 text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:text-2xl lg:leading-tight xl:text-3xl xl:leading-tight">
          Law Sample
        </h2>
        {sampleList
          .find((item) => item.name === 'Law')
          ['children'].map((child, index) => (
            <SampleListingCard
              title={child.childName}
              documentUrl={child.docUrl}
              key={index}
            >
              {child.content}
            </SampleListingCard>
          ))}
      </div>

      <Footer />
    </>
  )
}
export default law
