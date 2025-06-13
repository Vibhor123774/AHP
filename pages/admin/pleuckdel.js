import React, { useState } from 'react'
import Navbar from '../../components/navbar'
import Head from 'next/head'
import { Button, Input } from '@material-tailwind/react'
import BlogDeleteDialog from '../../components/dialogs/blogDeleteDialog'

const blogremover = () => {
  const [blogUrl, setBlogUrl] = useState('')
  const [passcode, setPasscode] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)

  const submit = async () => {
    if (passcode !== 'He!p3r#') {
      alert('Incorrect Passcode')
      return
    }
    let finalUrl = `https://ahp-apis.onrender.com/blog/${blogUrl}`

    const response = await fetch(finalUrl, {
      method: 'DELETE'
    })
    if (response.status === 200) {
      setDialogOpen(true)
    } else {
      alert('Facing Network Error')
    }
  }
  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <Navbar />
      <BlogDeleteDialog open={dialogOpen} setOpen={setDialogOpen} />
      <div className="h-full w-[50vw] m-auto flex flex-col gap-2 p-4">
        <Input
          type="text"
          label="BlogUrl To Delete"
          value={blogUrl}
          onChange={(e) => {
            setBlogUrl(e.target.value)
          }}
          className="focus:ring-0"
          containerProps={{ className: 'col-span-2' }}
        />
        <Input
          type="password"
          label="Passcode"
          value={passcode}
          onChange={(e) => {
            setPasscode(e.target.value)
          }}
          className="focus:ring-0"
          containerProps={{ className: 'col-span-1' }}
        ></Input>
        <Button onClick={submit} className="col-span-1" color="green">
          Delete
        </Button>
      </div>
    </>
  )
}

export default blogremover
