import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Breadcrumbs
} from '@material-tailwind/react'
import Head from 'next/head'
import Navbar from '../../components/navbar'
import ServiceBodyTemplate from '../../components/ServiceBodyTemplate'
import Footer from '../../components/footer'
import { dissertationData } from '../../components/data/servicesData'
import { getFaqJsonLd, getReviewJsonLd } from '../../utilities/jsonLdCreator'
import CustomBreadcrumbs from '../../components/CustomBreadcrumbs'

// Not in Use
export default function dissertation() {
  return (
    <>
      <Head>
        <title>Dissertation Writing Service | Assignments Help Provider</title>
        <meta
          name="description"
          content="Stuck with your dissertation? Assignments Help Provider offers expert dissertation writing service to university students globally at affordable prices."
        />
        <meta name="robots" content="index,follow" />
        <link rel="icon" href="/favicon.png" />
        <link
          rel="canonical"
          href="https://assignmentshelpprovider.com/services/dissertation-writing-service"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={getFaqJsonLd('services', 'dissertation')}
          key="faq-jsonld"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={getReviewJsonLd(dissertationData)}
          key="review-jsonld"
        />
      </Head>
      <Navbar />
      <ServiceBodyTemplate data={dissertationData} />
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
