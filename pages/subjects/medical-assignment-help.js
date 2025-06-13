import Head from 'next/head'
import Navbar from '../../components/navbar'
import SubjectBodyTemplate from '../../components/SubjectBodyTemplate'
import Footer from '../../components/footer'
import { medicalData } from '../../components/data/subjectData'
import { getFaqJsonLd, getReviewJsonLd } from '../../utilities/jsonLdCreator'

export default function medical() {
  return (
    <>
      <Head>
        <title>
          Medical Assignment Help 2025: Expert Guidance & Support | AHP
        </title>
        <meta
          name="description"
          content="Looking for medical assignment help? Get expert assistance with research, case studies, and medical reports. Accurate solutions and timely delivery guaranteed!"
        />
        <meta name="robots" content="index,follow" />
        <link rel="icon" href="/favicon.png" />
        <link
          rel="canonical"
          href="https://assignmentshelpprovider.com/subjects/medical-assignment-help"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={getFaqJsonLd('subjects', 'medical')}
          key="faq-jsonld"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={getReviewJsonLd(medicalData)}
          key="review-jsonld"
        />
      </Head>
      <Navbar />
      <SubjectBodyTemplate data={medicalData} />
      <Footer />
    </>
  )
}
