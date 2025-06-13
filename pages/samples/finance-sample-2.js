import { Typography, Button } from '@material-tailwind/react'
// import DownloadIcon from '@mui/icons-material/Download'
import { useState } from 'react'
import Head from 'next/head'
import Navbar from '../../components/navbar'
import Footer from '../../components/footer'
const finance_sample_2 = () => {
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
          Enterprise Value vs Equity Value
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
            Enterprise value refers to the whole worth of a company, taking into
            account its market capitalization, debt, and cash reserves. The
            enterprise value, also known as firm value or asset value, is the
            aggregate worth of a company's assets, excluding cash. When
            determining the worth of a company using unlevered free cash flow in
            a discounted cash flow (DCF) model, we are essentially estimating
            the whole value of the company, known as its enterprise value. Given
            the firm's known stock value, total debt, and cash balances, we may
            use this information to compute the enterprise value.
          </Typography>

          <Typography variant="paragraph" color="black" className="mx-2 mt-4">
            Formula for calculating enterprise value To determine enterprise
            value, one must have knowledge about equity, debt, and cash. The
            calculation may be done using the following formula: EV = (share
            price x Outstanding Shares) + total debt – cash The enterprise value
            (EV) is calculated by multiplying the share price by the number of
            shares, and then adding the total debt while subtracting the cash.
            EV stands for Enterprise Value. Please be aware that in the case of
            a firm having a minority stake, it is essential to include this in
            the calculation of the Enterprise Value (EV). Acquire more knowledge
            on the inclusion of minority stake in the calculations of enterprise
            value. Alternatively, Determine the Enterprise Value by computing
            the Net Present Value of all Free Cash Flow to the Firm (FCFF) in a
            Discounted Cash Flow (DCF) Model.
          </Typography>
          <Typography variant="paragraph" color="black" className="mx-2 mt-4">
            Equity value After all debts have been paid off, the value that
            remains for the shareholders is known as the equity value, which is
            also called the net asset value. Equity value is the result of
            applying a discounted cash flow model to a company's leveraged free
            cash flow. The following is a formula for calculating the equity
            value of a company given its enterprise value, total debt, and cash
            on hand. Equity Value calculation The following is the formula for
            determining equity value given the following information: enterprise
            value, debt, and cash on hand: Earnings per share (EPS) = Enterprise
            Value - Total Debt + Cash on hand Or Equivalent equity is the
            product of the number of shares and the share price.
          </Typography>
          <Typography variant="paragraph" color="black" className="mx-2 mt-4">
            Implementation in the Valuation The elimination of capital structure
            from enterprise value makes organisations more comparable, which is
            why it is increasingly widely utilised in valuation procedures. It
            is standard practice in investment banking, for instance, to advise
            clients on mergers and acquisitions by valuing the whole company, or
            enterprise value. Since equities research experts are encouraging
            investors to purchase individual shares rather than the overall
            organisation, it is more customary for them to concentrate on the
            equity value.
          </Typography>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default finance_sample_2
