import Head from 'next/head'
import Navbar from '../../components/navbar'
import ServiceBodyTemplate from '../../components/ServiceBodyTemplate'
import Footer from '../../components/footer'
import { thesisData } from '../../components/data/servicesData'
import { getFaqJsonLd, getReviewJsonLd } from '../../utilities/jsonLdCreator'
import CustomBreadcrumbs from '../../components/CustomBreadcrumbs'

export default function theseWriting() {
  return (
    <>
      <Head>
        <title>Expert Thesis Writing Services In 2025 | AHP</title>
        <meta
          name="description"
          content="Need professional thesis writing services? Get expert assistance with research, writing, and editing to craft a compelling and well-structured thesis."
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
      <div className="mx-8">
        <CustomBreadcrumbs />
      </div>
      <ServiceBodyTemplate data={thesisData} />
      <Footer />
    </>
  )
}
