import Head from 'next/head'
import Navbar from '../../components/navbar'
import SubjectBodyTemplate from '../../components/SubjectBodyTemplate'
import Footer from '../../components/footer'
import { psychologyData } from '../../components/data/subjectData'
import { getFaqJsonLd, getReviewJsonLd } from '../../utilities/jsonLdCreator'

export default function psychology() {
  return (
    <>
      <Head>
        <title>Expert Psychology Assignment Helper In 2025 | AHP</title>
        <meta
          name="description"
          content="Looking for psychology assignment help? Get expert assistance with psychological theories, case studies, and research papers. Accurate solutions and timely delivery guaranteed!"
        />
        <meta name="robots" content="index,follow" />
        <link rel="icon" href="/favicon.png" />
        <link
          rel="canonical"
          href="https://assignmentshelpprovider.com/subjects/psychology-assignment-help"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={getFaqJsonLd('subjects', 'psychology')}
          key="faq-jsonld"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={getReviewJsonLd(psychologyData)}
          key="review-jsonld"
        />
      </Head>
      <Navbar />
      <SubjectBodyTemplate data={psychologyData} />
      <Footer />
    </>
  )
}
