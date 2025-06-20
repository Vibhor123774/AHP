import Head from 'next/head'
import Navbar from '../../components/navbar'
import Footer from '../../components/footer'
import { Typography } from '@material-tailwind/react'

export async function getStaticPaths() {
  const res = await fetch('https://ahp-apis.onrender.com/samplesNameList')
  const samples = await res.json()
  const paths = samples.map((sample) => ({
    params: { slug: sample.url }
  }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://ahp-apis.onrender.com/sample/${params.slug}`)
  const sample = await res.json()
  return { props: { sample } }
}

export default function Samples({ sample }) {
  return (
    <>
      <Head>
        <title>{sample.metaTitle}</title>
        <meta name="description" content={sample.metaDescription} />
        <link rel="icon" href="/favicon.png" />
        <link
          rel="canonical"
          href={'https://assignmentshelpprovider.com/samples/' + sample.url}
        />
      </Head>
      <Navbar />
      <div className="flex mb-4 mx-8 flex-col items-center md:mx-16">
        <h1 className="mt-4 px-2 pt-4 text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:px-8 lg:text-3xl lg:leading-tight ">
          {sample.title}
        </h1>
        <div className="flex">
          <Typography variant="paragraph" color="black">
            Words:
          </Typography>
          <Typography variant="h6" color="black" className="px-2">
            {sample.wordCount}
          </Typography>
        </div>
      </div>
      <div
        className="my-4 mx-16"
        dangerouslySetInnerHTML={{ __html: sample.content }}
      ></div>
      <Footer />
    </>
  )
}
