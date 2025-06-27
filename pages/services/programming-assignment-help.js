import Head from 'next/head'
import Navbar from '../../components/navbar'
import ServiceBodyTemplate from '../../components/ServiceBodyTemplate'
import Footer from '../../components/footer'
import { programmingData } from '../../components/data/servicesData'
import { getFaqJsonLd, getReviewJsonLd } from '../../utilities/jsonLdCreator'

//  Not in Use
export default function programming() {
  return (
    <>
      <Head>
        <title>Expert Programming Assignment Help | Python Homework Help</title>
        <meta
          name="description"
          content="Need programming assignment help? Get expert coding and Python homework assistance. Pay for coding assignments and get help from programming experts."
        />
        <meta name="robots" content="index,follow" />
        <link rel="icon" href="/favicon.png" />
        <link
          rel="canonical"
          href="https://www.assignmentshelpprovider.com/services/programming-assignment-help"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={getFaqJsonLd('services', 'programming')}
          key="faq-jsonld"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={getReviewJsonLd(programmingData)}
          key="review-jsonld"
        />
      </Head>
      <Navbar />
      <ServiceBodyTemplate data={programmingData} />
      <Footer />
    </>
  )
}
