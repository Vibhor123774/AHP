import { useEffect } from 'react'
import Head from 'next/head'
import NavbarLanding from '../components/NavbarLanding'
import SectionTitle from '../components/sectionTitle'
import {
  howItWorks,
  academicSupportServices,
  whyStudentChooseUs,
  academicSupportAvailableIn
} from '../components/data'
import CustomInfoDisplay from '../components/customInfoDisplay'
import Footer from '../components/footer'
import { Faqs } from '../components/Faqs'
import { faqLandingData } from '../components/data'
import { RatingBanner } from '../components/RatingsBanner'
import { homeJsonLd, getReviewJsonLd } from '../utilities/jsonLdCreator'
import HeroLanding from '../components/heroLanding'
import TestimonialsLanding from '../components/testimonialsLanding'
import { Button, Chip } from '@material-tailwind/react'
import Image from 'next/image'

import { CameraIcon, QrCodeIcon, LinkIcon } from '@heroicons/react/24/solid'
import Script from 'next/script'
// import Script from 'next/script'

const Landing = () => {
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
        <title>Academic Support & Guidance</title>
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
        <script
          src="https://www.googletagmanager.com/gtag/js?id=AW-16858857273"
          strategy="beforeInteractive"
        ></script>
        {/* Google Ads for Landing Page */}
        <script strategy="beforeInteractive">
          {` window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'AW-16858857273');

        function gtag_report_conversion(url) {
          var callback = function () {
            if (typeof(url) != 'undefined') {
              window.location = url;
            }
          };
          gtag('event', 'conversion', {
              'send_to': 'AW-16858857273/WOzaCKjfwpoaELn-9uY-',
              'event_callback': callback
          });
          return false;
        } 
        `}
        </script>
        {/* Bing Ads for Landing Page */}
        <script strategy="beforeInteractive">
          {`(function(w,d,t,r,u)
        {var f,n,i;
        w[u]=w[u]||[],f=function(){
        var o={
        ti:"187191340", enableAutoSpaTracking: true};
        o.q=w[u],w[u]=new UET(o),w[u].push("pageLoad")},n=d.createElement(t),n.src=r,n.async=1,n.onload=n.onreadystatechange=function(){
        var s=this.readyState;s&&s!=="loaded"&&s!=="complete"||(f(),n.onload=n.onreadystatechange=null)
        },i=d.getElementsByTagName(t)[0],i.parentNode.insertBefore(n,i)})
        (window,document,"script","//bat.bing.com/bat.js","uetq");`}
        </script>
        <script strategy="beforeInteractive">
          {`function uet_report_conversion() { window.uetq = window.uetq || []; window.uetq.push('event', 'submit_lead_form', {}); } `}
        </script>
      </Head>
      {/* <NavbarLanding /> */}
      <HeroLanding />
      {/* <SectionTitle
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
      </SectionTitle> */}
      <CustomInfoDisplay data={academicSupportServices} />
      <CustomInfoDisplay imgPos="right" data={howItWorks} />
      <CustomInfoDisplay data={whyStudentChooseUs} />
      <CustomInfoDisplay
        imgPos="right"
        data={academicSupportAvailableIn}
        iconBg="bgless"
      />
      <SectionTitle title="Real Student Stories"></SectionTitle>
      <TestimonialsLanding />
      <SectionTitle title="FAQs"></SectionTitle>
      <Faqs data={faqLandingData} />
      {/* Whatsapp QR section */}
      <div className="flex flex-col justify-center items-center bg-indigo-100 w-2/3 m-auto rounded-xl">
        <a href="https://api.whatsapp.com/send/?phone=919529691180&text&type=phone_number&app_absent=0">
          <Button className="my-4" color="green">
            Quick Whatsapp Enquiry
          </Button>
        </a>

        <div className="flex justify-between items-center m-4 lg:w-1/2 flex-wrap">
          <div className="felx-col m-auto mb-4 lg:mb-2">
            <Chip
              value="Open your camera"
              variant="outlined"
              className="m-1"
              icon={<CameraIcon />}
            />
            <Chip
              value="Scan Qr Code"
              variant="outlined"
              className="m-1"
              icon={<QrCodeIcon />}
            />
            <Chip
              value="Connect & Get Discount"
              variant="outlined"
              className="m-1"
              icon={<LinkIcon />}
            />
          </div>
          <Image
            src={`/img/whatsapp-qr-ahp.jpg`}
            width={128}
            height={128}
            alt="whatsapp-qr-ahp"
            className="object-cover m-auto"
          />
        </div>
      </div>
      <hr className="mt-8 mx-6" color="black" />
      <Footer />
      {/* <PopupWidget /> */}
    </>
  )
}

export default Landing
