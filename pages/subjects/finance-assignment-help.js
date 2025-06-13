import Head from 'next/head'
import Navbar from '../../components/navbar'
import SubjectBodyTemplate from '../../components/SubjectBodyTemplate'
import Footer from '../../components/footer'
import { financeData } from '../../components/data/subjectData'
import { getFaqJsonLd, getReviewJsonLd } from '../../utilities/jsonLdCreator'

export default function finance() {
  return (
    <>
      <Head>
        <title>
          Finance Assignment Help 2025: Expert Solutions & Guidance | AHP
        </title>
        <meta
          name="description"
          content="Need finance assignment help? Get expert assistance with financial analysis, budgeting, investments, and more. Accurate solutions delivered on time for academic success!"
        />
        <meta name="robots" content="index,follow" />
        <link rel="icon" href="/favicon.png" />
        <link
          rel="canonical"
          href="https://assignmentshelpprovider.com/subjects/finance-assignment-help"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={getFaqJsonLd('subjects', 'finance')}
          key="faq-jsonld"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={getReviewJsonLd(financeData)}
          key="review-jsonld"
        />
      </Head>
      <Navbar />
      <SubjectBodyTemplate data={financeData} />
      <Footer />
    </>
  )
}
