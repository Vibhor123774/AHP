import { Typography, Button } from '@material-tailwind/react'
// import DownloadIcon from '@mui/icons-material/Download'
import { useState } from 'react'
import Head from 'next/head'
import Navbar from '../../components/navbar'
import Footer from '../../components/footer'
const accounts_sample_2 = () => {
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
          Verification of Accounting Records
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
            Accounting records verification is an essential procedure that
            guarantees the precision and dependability of financial data. The
            primary methods for verification include the trial balance, bank
            reconciliation, and control accounts. Now, let's thoroughly examine
            each individual aspect:
          </Typography>

          <Typography variant="paragraph" color="black" className="mx-2 mt-4">
            The Trial Balance Definition A trial balance is a summary of the
            balances in the ledger accounts as of a specified date, usually at
            the conclusion of an accounting quarter. The general ledger provides
            a comprehensive record of the debit and credit balances for all
            accounts. Purpose of a Trial Balance - Verification: The trial
            balance serves to verify the correctness of the accounting records
            by confirming that the total debits match the total credits. -
            Preparation of Financial Statements: Serves as the basis for
            creating financial statements such as the income statement and
            balance sheet. Limitations of a Trial Balance - No Assurance of
            Accuracy: A trial balance may nevertheless exhibit balance even in
            the presence of inaccuracies in individual transactions. -
            Incomplete Error Detection: Some mistakes, including compensatory
            errors or errors of omission, may not have an impact on the trial
            balance. Preparation and Amendment - Preparation: Aggregating the
            balances from the ledger accounts to get the trial balance. -
            Revision: Upon the discovery of mistakes, rectifications are carried
            out by making adjustments to the impacted ledger accounts. Errors
            Excluding Impact on Trial Balance - Commission Errors: Inaccurately
            documenting a transaction, however offsetting the mistake with
            another error. - Compensating mistakes: Two mistakes that cancel
            each other out. - Complete Reversal Errors: Inadvertently
            interchanging the debit and credit entries. - Omission Errors: The
            act of unintentionally excluding a transaction from the recorded
            data. - Original Entry Errors: Errors that occur during the initial
            process of capturing information. - Principle Errors: Breaches of
            accounting principles.
          </Typography>
          <Typography variant="paragraph" color="black" className="mx-2 mt-4">
            Rectification of Mistakes Methods - Journal Entries: Corrections are
            issued directly to the impacted accounts. - Suspense Account: A
            provisional account used to reconcile the trial balance while
            discrepancies are rectified. Profit or Loss Adjustment -
            Post-Correction: The effect of mistakes on profits or losses is
            rectified. Impact on Statement of Financial Position - Corrections
            Affect Balances: Rectifying mistakes modifies the amounts in
            impacted accounts, thereby impacting the financial statement. Bank
            reconciliation Bank reconciliation is the process of comparing and
            matching the transactions recorded in a company's bank statement
            with the transactions recorded in its own accounting records. Bank
            Statement Use and Purpose - Verification: Ensures alignment between
            the company's and the bank's records. - Detecting Discrepancies:
            Illuminates unrecorded transactions, inaccuracies, or fraudulent
            activities. Cash Book Update - Bank Charges and Interest:
            Incorporating adjustments for charges and interest. - Error
            Correction: Rectifying inaccuracies in the cash book. - Credit
            Transfers, Direct Debits, Dividends, Standing Orders: Recording
            these transactions in the cash book. Preparation of Bank
            Reconciliation Statement - Bank Errors: Making corrections for
            mistakes made by the bank. - Uncredited Deposits: Entries that have
            been documented by the firm but have not yet been acknowledged by
            the bank. - Unpresented Cheques: Cheques that have been issued but
            have not yet been presented to the bank for processing.
          </Typography>
          <Typography variant="paragraph" color="black" className="mx-2 mt-4">
            Control Accounts: Objective - Management of Purchases and Sales
            Ledger Control Accounts: Consolidates and validates the transactions
            recorded in the corresponding ledgers. Sources of Information for
            Control Accounts Entries - Books of Prime Entry: Records such as the
            sales day book and purchases day book. Preparation of Control
            Accounts - Credit Purchases and Sales, Receipts and Payments:
            Consolidating transactions. - Cash Discounts, Returns, Irrecoverable
            Debts, Dishonoured Cheques: Recording pertinent transactions. -
            Interest on Overdue Accounts, Contra Entries, Refunds: Including
            supplementary details. - Verification of Opening and Closing
            Balances: Ensuring that the control accounts are in balance.
          </Typography>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default accounts_sample_2
