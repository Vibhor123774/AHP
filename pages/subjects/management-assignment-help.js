import Head from 'next/head'
import Navbar from '../../components/navbar'
import SubjectBodyTemplate from '../../components/SubjectBodyTemplate'
import Footer from '../../components/footer'
import { managementData } from '../../components/data/subjectData'
import { getFaqJsonLd, getReviewJsonLd } from '../../utilities/jsonLdCreator'

export default function management() {
  return (
    <>
      <Head>
        <title>
          Management Assignment Help 2025: Expert Guidance & Support | AHP
        </title>
        <meta
          name="description"
          content="Need management assignment help? Get expert assistance with case studies, business strategies, and management theories. Timely delivery and quality solutions guaranteed!"
        />
        <meta name="robots" content="index,follow" />
        <link rel="icon" href="/favicon.png" />
        <link
          rel="canonical"
          href="https://www.assignmentshelpprovider.com/subjects/management-assignment-help"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={getFaqJsonLd('subjects', 'management')}
          key="faq-jsonld"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={getReviewJsonLd(managementData)}
          key="review-jsonld"
        />
      </Head>
      <Navbar />
      <SubjectBodyTemplate data={managementData} />
      <Footer />
    </>
  )
}
