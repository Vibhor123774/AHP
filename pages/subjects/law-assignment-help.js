import Head from 'next/head'
import Navbar from '../../components/navbar'
import SubjectBodyTemplate from '../../components/SubjectBodyTemplate'
import Footer from '../../components/footer'
import { lawData } from '../../components/data/subjectData'
import { getFaqJsonLd, getReviewJsonLd } from '../../utilities/jsonLdCreator'

export default function law() {
  return (
    <>
      <Head>
        <title>
          Law Assignment Helper 2025: Expert Legal Writing Assistance | AHP
        </title>
        <meta
          name="description"
          content="Looking for a law assignment helper? Get expert support with case studies, legal analysis, and research papers. Timely delivery and accurate solutions guaranteed!"
        />
        <meta name="robots" content="index,follow" />
        <link rel="icon" href="/favicon.png" />
        <link
          rel="canonical"
          href="https://assignmentshelpprovider.com/subjects/law-assignment-help"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={getFaqJsonLd('subjects', 'law')}
          key="faq-jsonld"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={getReviewJsonLd(lawData)}
          key="review-jsonld"
        />
      </Head>
      <Navbar />
      <SubjectBodyTemplate data={lawData} />
      <Footer />
    </>
  )
}
