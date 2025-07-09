import Head from 'next/head'
import Navbar from '../../components/navbar'
import ServiceBodyTemplate from '../../components/ServiceBodyTemplate'
import Footer from '../../components/footer'
import { researchPaperDataV2 } from '../../components/data/servicesData'
import { getFaqJsonLd, getReviewJsonLd } from '../../utilities/jsonLdCreator'
import CustomBreadcrumbs from '../../components/CustomBreadcrumbs'

export default function researchPaper() {
  return (
    <>
      <Head>
        <title>Professional Research Paper Writing Service 2025 | AHP</title>
        <meta
          name="description"
          content="Looking for a reliable research paper writing service? Get professional help with research, writing, and formatting to achieve academic excellence."
        />
        <meta name="robots" content="index,follow" />
        <link rel="icon" href="/favicon.png" />
        <link
          rel="canonical"
          href="https://www.assignmentshelpprovider.com/services/research-paper-writing"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={getFaqJsonLd('services', 'researchPaper')}
          key="faq-jsonld"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={getReviewJsonLd(researchPaperDataV2)}
          key="review-jsonld"
        />
      </Head>
      <Navbar />
      <div className="mx-8">
        <CustomBreadcrumbs />
      </div>
      <ServiceBodyTemplate data={researchPaperDataV2} />
      <Footer />
    </>
  )
}
