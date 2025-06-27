import Head from 'next/head'
import Navbar from '../../components/navbar'
import ServiceBodyTemplate from '../../components/ServiceBodyTemplate'
import Footer from '../../components/footer'
import { programmingData } from '../../components/data/servicesData'
import { getFaqJsonLd, getReviewJsonLd } from '../../utilities/jsonLdCreator'
import CustomBreadcrumbs from '../../components/CustomBreadcrumbs'

export default function programming() {
  return (
    <>
      <Head>
        <title>Expert Programming Assignment Help 2025 | AHP</title>
        <meta
          name="description"
          content="Need programming assignment help? Get expert coding assistance for Python, Java, C++, and more. Timely delivery and quality solutions guaranteed!"
        />
        <meta name="robots" content="index,follow" />
        <link rel="icon" href="/favicon.png" />
        <link
          rel="canonical"
          href="https://www.assignmentshelpprovider.com/services/programming-assignment-help-service"
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
      <div className="mx-8">
        <CustomBreadcrumbs />
      </div>
      <ServiceBodyTemplate data={programmingData} />
      <Footer />
    </>
  )
}
