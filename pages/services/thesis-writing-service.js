import Head from 'next/head'
import Navbar from '../../components/navbar'
import ServiceBodyTemplate from '../../components/ServiceBodyTemplate'
import Footer from '../../components/footer'
import { thesisData } from '../../components/data/servicesData'
import { getFaqJsonLd, getReviewJsonLd } from '../../utilities/jsonLdCreator'

// Not in Use
export default function thesisWritingService() {
  return (
    <>
      <Head>
        <title>
          Professional Thesis Writing Services | Assignment Help Provider
        </title>
        <meta
          name="description"
          content="Need help with your thesis? Assignments Help Provider offers the best thesis writing services and thesis proofreading for students worldwide at affordable rates."
        />
        <meta name="robots" content="index,follow" />
        <link rel="icon" href="/favicon.png" />
        <link
          rel="canonical"
          href="https://www.assignmentshelpprovider.com/services/thesis-writing"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={getFaqJsonLd('services', 'thesis')}
          key="faq-jsonld"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={getReviewJsonLd(thesisData)}
          key="review-jsonld"
        />
      </Head>
      <Navbar />
      <ServiceBodyTemplate data={thesisData} />
      <Footer />
    </>
  )
}
