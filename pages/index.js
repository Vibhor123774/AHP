import { useEffect } from 'react'
import Head from 'next/head'
import Hero from '../components/hero'
import Navbar from '../components/navbar'
import SectionTitle from '../components/sectionTitle'
import { featuresList, offeringsSection } from '../components/data'
import CustomInfoDisplay from '../components/customInfoDisplay'
import Footer from '../components/footer'
import Testimonials from '../components/testimonials'
import { Faqs } from '../components/Faqs'
import { faqHomeData } from '../components/data'
import { RatingBanner } from '../components/RatingsBanner'
import { homeJsonLd, getReviewJsonLd } from '../utilities/jsonLdCreator'

// import Script from 'next/script'

const Home = () => {
  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    }

    fetch('https://ahp-apis.onrender.com', requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error))
  }, [])

  return (
    <>
      <Head>
        <title>Assignment Helper | Expert Assistance for All Subjects</title>
        <meta
          name="description"
          content="Looking for a reliable assignment helper? Get expert support for assignments, dissertations, research theses, and programming tasks. Quality work and timely delivery guaranteed"
          key="desc"
        />
        <meta name="robots" content="index,follow" />
        <link rel="icon" href="/favicon.png" />
        <link rel="canonical" href="https://www.assignmentshelpprovider.com/" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
          key="home-jsonld"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={getReviewJsonLd({
            serviceName: 'Assignment Help Provider',
            descriptionContent:
              'Avail Assignment helper in affordable prices. Get online assignment help on dissertation, thesis helper,  research paper assistance & more on a wide range of subjects.',
            pageUrl: ''
          })}
          key="review-jsonld"
        />
      </Head>
      <Navbar />
      <Hero />
      <RatingBanner />
      <SectionTitle
        title="Avail the Best Assignment Helper Online"
        shortenContentLength="490"
      >
        Struggling with complex assignments? Whether it's Business, Finance,
        Law, HRM, Marketing, or intricate subjects like computer programming,
        web design, Medicine, Nursing, and Health and Social Care, our
        Assignment Help Provider is here to support you. Our services also
        extend to Thesis Help, assignment help, and Research Paper help,
        ensuring that your academic work is well-structured, thoroughly
        researched, and 100% plagiarism-free.
      </SectionTitle>
      <CustomInfoDisplay data={offeringsSection} />
      <CustomInfoDisplay imgPos="right" data={featuresList} />
      <SectionTitle title="Reviews"></SectionTitle>
      <Testimonials />
      <SectionTitle title="FAQs"></SectionTitle>
      <Faqs data={faqHomeData} />
      <hr className="mt-8 mx-6" color="black" />

      <Footer />
      {/* <PopupWidget /> */}
    </>
  )
}

export default Home