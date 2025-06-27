import Head from 'next/head'
import Navbar from '../../components/navbar'
import SubjectBodyTemplate from '../../components/SubjectBodyTemplate'
import Footer from '../../components/footer'
import { engineeringData } from '../../components/data/subjectData'
import { getFaqJsonLd, getReviewJsonLd } from '../../utilities/jsonLdCreator'

export default function engineering() {
  return (
    <>
      <Head>
        <title>
          Engineering Assignment Help 2025: Expert Solutions for All Fields |
          AHP
        </title>
        <meta
          name="description"
          content="Looking for engineering assignment help? Get expert assistance in civil, mechanical, electrical, and software engineering assignments. Quality solutions delivered on time!"
        />
        <meta name="robots" content="index,follow" />
        <link rel="icon" href="/favicon.png" />
        <link
          rel="canonical"
          href="https://www.assignmentshelpprovider.com/subjects/engineering-assignment-help"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={getFaqJsonLd('subjects', 'engineering')}
          key="faq-jsonld"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={getReviewJsonLd(engineeringData)}
          key="review-jsonld"
        />
      </Head>
      <Navbar />
      <SubjectBodyTemplate data={engineeringData} />
      <Footer />
    </>
  )
}
