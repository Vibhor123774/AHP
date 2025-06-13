import { Typography, Button } from '@material-tailwind/react'
// import DownloadIcon from '@mui/icons-material/Download'
import { useState } from 'react'
import Head from 'next/head'
import Navbar from '../../components/navbar'
import Footer from '../../components/footer'
const law_sample_3 = () => {
  return (
    <>
      <Head>
        <title>AHP - Assignments Help Provider</title>
        <meta
          name="description"
          content="Avail Assignment helper in affordable prices. Get online assignment help on dissertation, thesis helper,  research paper assistance & more on a wide range of subjects."
        />
        <meta name="robots" content="index,follow" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Navbar />
      {/* BODY */}
      <div className="container mx-auto w-4/5 ">
        <h2 className="px-2 pt-2 text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:text-2xl lg:leading-tight xl:text-3xl xl:leading-tight">
          Australian Criminal Law Case Study
        </h2>
        {/* SUBTITLE */}
        <div className="flex justify-between mx-2 my-2">
          <div className="flex">
            <Typography variant="paragraph" color="black">
              Words:
            </Typography>
            <Typography variant="h6" color="black" className="px-2">
              362
            </Typography>
          </div>
        </div>
        {/* CONTENT */}
        <div>
          <Typography variant="paragraph" color="black" className="mx-2">
            Indeed, let us use the IRAC approach to analyse a criminal law case
            inside the Australian jurisdiction: Issue The matter at hand is to
            the determination of whether the defendant, John Smith, may be
            prosecuted for the crime of robbery in accordance with Australian
            penal legislation. Rule In Australia, robbery is legally defined as
            the act of unlawfully stealing someone else's property in the
            presence of another person, with the intention of permanently
            depriving them of that property. This crime is further characterised
            by the use or threat of force. In order to establish the crime of
            robbery, the prosecution must provide evidence for both the actus
            reus (the physical act) and the mens rea (the guilty state of mind)
            aspects of the offence.
          </Typography>
          <Typography variant="paragraph" color="black" className="mx-2 mt-4">
            Application John Smith forcibly stole a wallet from an individual in
            a public setting, suggesting the use of physical coercion. The actus
            reus component, which involves forcefully snatching the wallet, is
            evident. It is essential to take into account the mens rea
            component, which requires establishing that John Smith had the
            intention to permanently deprive the victim of their pocketbook.
            Upon scrutiny, it has been shown that John Smith was cognizant of
            the victim's existence and forcibly stole the wallet with the aim of
            retaining it for his own benefit. This exemplifies the essential
            mens rea required for the offence of robbery. Robbery is
            characterised by the use of physical force or the intimidation of
            force. If John Smith's conduct did not entail physical coercion or
            the intimidation of physical harm, but instead happened in a way
            that may be classified as larceny or theft, the accusation of
            robbery may not be suitable.
          </Typography>
          <Typography variant="paragraph" color="black" className="mx-2 mt-4">
            Conclusion Based on the facts supplied, it is evident that there are
            sufficient reasons to accuse John Smith of committing robbery
            according to Australian penal law. Both the actus reus, which
            involves forcefully stealing the wallet, and the mens rea, which
            involves the purpose to permanently deprive, seem to be present in
            this case of robbery. Nevertheless, it is crucial to verify the
            presence of the force or the threat of force element, as it serves
            to differentiate robbery from other offences linked to stealing.
          </Typography>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default law_sample_3
