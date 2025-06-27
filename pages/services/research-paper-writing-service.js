import Head from 'next/head'
import Navbar from '../../components/navbar'
import ServiceBodyTemplate from '../../components/ServiceBodyTemplate'
import Footer from '../../components/footer'
import { researchPaperData } from '../../components/data/servicesData'
import { getFaqJsonLd, getReviewJsonLd } from '../../utilities/jsonLdCreator'

// Not in Use
export default function researchPaper() {
  return (
    <>
      <Head>
        <title>
          Best Research Paper Writing Service | Assignment Help Provider
        </title>
        <meta
          name="description"
          content="Need help writing research papers? Assignments Help Provider offers expert research paper writing services to university students globally at affordable prices."
        />
        <meta name="robots" content="index,follow" />
        <link rel="icon" href="/favicon.png" />
        <link
          rel="canonical"
          href="https://www.assignmentshelpprovider.com/services/research-paper-writing-service"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={getFaqJsonLd('services', 'researchPaper')}
          key="faq-jsonld"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={getReviewJsonLd(researchPaperData)}
          key="review-jsonld"
        />
      </Head>
      <Navbar />
      <ServiceBodyTemplate data={researchPaperData} />
      <Footer />
    </>
  )
}
