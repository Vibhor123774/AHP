import Head from 'next/head'
import Navbar from '../../components/navbar'
import Footer from '../../components/footer'
import { SampleListingCard } from '../../components/SampleListingCard'
import FilePreviewDrawer from '../../components/FilePreviewDrawer'
import { useState } from 'react'
import { sampleList } from '../../components/data'
import DialogFilePreview from '../../components/DialogFilePreview'
import { Button } from '@material-tailwind/react'
import CustomBreadcrumbs from '../../components/CustomBreadcrumbs'

const accounts = () => {
  const handleLogin = () => {
    const frontendUrl = window.location.href
    window.location.href = `http://localhost:3030/auth/google?redirect=${encodeURIComponent(
      frontendUrl
    )}`
  }

  const handleLogout = () => {
    window.open('http://localhost:5000/logout', '_self')
  }
  const handleOnClick = (documentUrl) => {
    setActiveDocument(documentUrl)
    setDrawerOpen(true)
    // dialogHandler()
  }
  const [activeDocument, setActiveDocument] = useState('')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)

  const dialogHandler = () => setDialogOpen(!dialogOpen)
  const closeDrawer = () => {
    setDrawerOpen(false)
  }
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
      <FilePreviewDrawer
        drawerOpen={drawerOpen}
        closeDrawer={closeDrawer}
        documentUrl={activeDocument}
      />
      {/* 
      <DialogFilePreview
        dialogOpen={dialogOpen}
        dialogHandler={dialogHandler}
        documentUrl={activeDocument}
      /> */}

      {/* BODY */}
      <div className="container mx-auto w-4/5 ">
        <CustomBreadcrumbs />
        <h2 className="px-2 pt-2 text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:text-2xl lg:leading-tight xl:text-3xl xl:leading-tight">
          Accounts Sample
        </h2>

        {/* <Button onClick={handleLogin}>LOGIN</Button> */}
        {sampleList
          .find((item) => item.name === 'Accounts')
          ['children'].map((child, index) => (
            <SampleListingCard
              title={child.childName}
              documentUrl={child.docUrl}
              handleOnClick={handleOnClick}
            >
              {child.content}
            </SampleListingCard>
          ))}
      </div>

      <Footer />
    </>
  )
}
export default accounts
