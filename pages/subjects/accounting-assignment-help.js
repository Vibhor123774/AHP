import Head from 'next/head'
import Navbar from '../../components/navbar'
import SubjectBodyTemplate from '../../components/SubjectBodyTemplate'
import Footer from '../../components/footer'
import { accountingData } from '../../components/data/subjectData'
import { getFaqJsonLd, getReviewJsonLd } from '../../utilities/jsonLdCreator'

export default function accounting() {
  return (
    <>
      <Head>
        <title>Get Expert Accounting Assignment Help In 2025 | AHP</title>
        <meta
          name="description"
          content="Looking for accounting assignment help? Get expert guidance and accurate solutions for financial, managerial, and cost accounting assignments. Achieve academic success now!"
        />
        <meta name="robots" content="index,follow" />
        <link rel="icon" href="/favicon.png" />
        <link
          rel="canonical"
          href="https://assignmentshelpprovider.com/subjects/accounting-assignment-help"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={getFaqJsonLd('subjects', 'accounting')}
          key="faq-jsonld"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={getReviewJsonLd(accountingData)}
          key="review-jsonld"
        />
      </Head>
      <Navbar />
      <SubjectBodyTemplate data={accountingData} />

      <Footer />
    </>
  )
}
