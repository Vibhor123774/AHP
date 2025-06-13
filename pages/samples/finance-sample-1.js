import { Typography, Button } from '@material-tailwind/react'
// import DownloadIcon from '@mui/icons-material/Download'
import { useState } from 'react'
import Head from 'next/head'
import Navbar from '../../components/navbar'
import Footer from '../../components/footer'
const finance_sample_1 = () => {
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
          Sensitive Analysis and Scenario Analysis
        </h2>
        {/* SUBTITLE */}
        <div className="flex justify-between mx-2 my-2">
          <div className="flex">
            <Typography variant="paragraph" color="black">
              Words:
            </Typography>
            <Typography variant="h6" color="black" className="px-2">
              609
            </Typography>
          </div>
        </div>
        {/* CONTENT */}
        <div>
          <Typography variant="paragraph" color="black" className="mx-2">
            What is Sensitivity Analysis? Sensitivity Analysis is a technique
            used in financial modelling to examine the impact of various values
            of a group of independent variables on a certain dependent variable,
            given precise circumstances. Sensitivity analysis is often used
            across several disciplines, including biology, geography, economics,
            and engineering. It is particularly valuable in the examination and
            evaluation of a "Black Box Process" when the result is an obscure
            function of several inputs. An opaque function or process is one
            that cannot be comprehensively examined or analysed due to certain
            limitations or restrictions. Climate models in geography, for
            instance, tend to be quite intricate. Consequently, the precise
            correlation between the inputs and outcomes is not well understood.
          </Typography>

          <Typography variant="paragraph" color="black" className="mx-2 mt-4">
            What- If Analysis A Financial Sensitivity Analysis, sometimes
            referred to as a What-If analysis or a What-If simulation exercise,
            is primarily used by financial analysts to forecast the result of a
            certain action when executed under specified circumstances.
            Financial Sensitivity Analysis is conducted within predetermined
            limits, which are established by the set of independent (input)
            variables. For instance, sensitivity analysis may be used to examine
            the impact of a 1% rise in interest rates on bond prices. The
            "What-If" inquiry would be: "What would be the impact on the price
            of a bond if interest rates were to increase by 1%?" Sensitivity
            analysis may provide a solution to this challenge.
          </Typography>
          <Typography variant="paragraph" color="black" className="mx-2 mt-4">
            Scenario Analysis Sensitivity analysis and scenario analysis are two
            distinct methods used in financial analysis. It is crucial to avoid
            conflating Financial Sensitivity Analysis with Financial Scenario
            Analysis. While sharing some similarities, the two entities possess
            distinct variations. Sensitivity Analysis is used to ascertain the
            impact of a group of independent factors on a dependent variable
            under certain circumstances. For instance, a financial analyst seeks
            to determine the impact of a company's net working capital on its
            profit margin. The study will include all the factors that have
            influence on the company's profit margin, including the cost of
            items sold, workers' pay, managers' compensation, and so forth. The
            study will identify and separate each of these predetermined and
            fluctuating expenses and document all the potential results.
            Scenario Analysis, conversely, requires the financial analyst to
            meticulously scrutinise a certain scenario. Scenario Analysis is
            often used to examine circumstances characterised by significant
            economic disruptions, such as a worldwide market upheaval or a
            substantial change in the nature of the industry. Once the facts of
            the scenario are specified, the analyst must next identify and
            define all the pertinent variables to ensure they are consistent
            with the scenario. The outcome is an exceedingly thorough depiction
            of the future (a distinct scenario). The analyst has comprehensive
            knowledge of all potential outcomes, even extreme possibilities, and
            can accurately predict the precise results based on a predetermined
            set of factors inside a real-life situation.
          </Typography>
          <Typography variant="paragraph" color="black" className="mx-2 mt-4">
            Benefits of Financial Sensitivity Analysis Conducting sensitivity
            analysis is crucial for many significant reasons: Sensitivity
            analysis enhances the reliability of financial models by subjecting
            them to extensive testing across a range of scenarios. Financial
            Sensitivity Analysis enables the analyst to adjust the parameters
            within which the sensitivity of the dependent variables to the
            independent variables may be tested. For instance, the model used to
            analyse the impact of a 5-point alteration in interest rates on bond
            prices would vary from the financial model utilised to examine the
            consequences of a 20-point variation in interest rates on bond
            prices. Sensitivity analysis facilitates the process of making
            well-informed decisions. The model is used by decision-makers to
            comprehend the degree of responsiveness of the output to alterations
            in certain factors. Therefore, the analyst may assist in drawing
            concrete findings and play a crucial role in making optimum
            selections.
          </Typography>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default finance_sample_1
