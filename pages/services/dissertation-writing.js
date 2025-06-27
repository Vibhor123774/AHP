import {
  Card,
  CardHeader,
  CardBody,
  Typography
} from '@material-tailwind/react'
import Head from 'next/head'
import Navbar from '../../components/navbar'
import ServiceBodyTemplate from '../../components/ServiceBodyTemplate'
import Footer from '../../components/footer'
import { dissertationDataV2 } from '../../components/data/servicesData'
import { getFaqJsonLd, getReviewJsonLd } from '../../utilities/jsonLdCreator'
import CustomBreadcrumbs from '../../components/CustomBreadcrumbs'

export default function dissertation() {
  return (
    <>
      <Head>
        <title>Expert Dissertation Writing Services In 2025 | AHP</title>
        <meta
          name="description"
          content="Looking for reliable dissertation writing services? Get expert assistance for research, writing, and editing. Achieve academic success with our professional support!"
        />
        <meta name="robots" content="index,follow" />
        <link rel="icon" href="/favicon.png" />
        <link
          rel="canonical"
          href="https://www.assignmentshelpprovider.com/services/dissertation-writing"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={getFaqJsonLd('services', 'dissertation')}
          key="faq-jsonld"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={getReviewJsonLd(dissertationDataV2)}
          key="review-jsonld"
        />
      </Head>
      <Navbar />
      <div className="mx-8">
        <CustomBreadcrumbs />
      </div>
      <ServiceBodyTemplate data={dissertationDataV2} />
      <Footer />
    </>
  )
}

function RandomCard() {
  return (
    <Card className="m-8 w-96">
      <CardHeader color="blue-gray">
        <Typography variant="h5" color="blue-gray" className="mb-2">
          UI/UX Review Check
        </Typography>
      </CardHeader>
      <CardBody>
        <Typography>
          The place is close to Barceloneta Beach and bus stop just 2 min by
          walk and near to &quot;Naviglio&quot; where you can enjoy the main
          night life in Barcelona.
        </Typography>
      </CardBody>
    </Card>
  )
}
