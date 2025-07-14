import Navbar from '../../components/navbar'
import Footer from '../../components/footer'
import React, { useState, useRef, useMemo, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Button, Input, Typography } from '@material-tailwind/react'
import SampleSubmitDialog from '../../components/dialogs/sampleSubmitDialog'
import Head from 'next/head'

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false })

const Editor = () => {
  const editor = useRef(null)
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [metaTitle, setMetaTitle] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const [wordCount, setWordCount] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [passcode, setPasscode] = useState('')

  /* The most important point*/
  const config = useMemo(
    //  Using of useMemo while make custom configuration is strictly recomended
    () => ({
      //  if you don't use it the editor will lose focus every time when you make any change to the editor, even an addition of one character
      /* Custom image uploader button configuretion to accept image and convert it to base64 format */
      uploader: {
        insertImageAsBase64URI: true,
        imagesExtensions: ['jpg', 'png', 'jpeg', 'gif', 'svg', 'webp'] // this line is not much important , use if you only strictly want to allow some specific image format
      }
    }),
    []
  )

  const submit = async () => {
    if (passcode !== 'He!p3r#') {
      alert('Incorrect Passcode')
      return
    }
    let formData = new FormData()
    formData.append('title', title)
    formData.append('url', url)
    formData.append('metaTitle', metaTitle)
    formData.append('metaDescription', metaDescription)
    formData.append('content', content)
    formData.append('wordCount', wordCount)

    const response = await fetch('https://ahp-apis.onrender.com/newsample', {
      method: 'POST',
      body: formData
    })
    if (response.status === 200) {
      setDialogOpen(true)
    } else if (response.status === 409) {
      alert('Sample with the same URL already exist')
    } else {
      alert('Facing Network Error')
    }
  }

  /* function to handle the changes in the editor */
  const handleChange = (value) => {
    setContent(value)
  }
  const handleChangeCoverImage = async (target) => {
    const file = target.files[0]
    const base64 = await convertToBase64(file)
    setCoverImageData(base64)
  }

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result)
      }
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }

  const updateSampleUrl = (sampleTitle) => {
    const strWithoutSpecialChars = sampleTitle.replace(/[^a-zA-Z0-9 ]/g, '')
    const strExtraSpaceRemoved = strWithoutSpecialChars
      .replace(/\s+/g, ' ')
      .trim()
    const lowerCasedWithHyphen = strExtraSpaceRemoved
      .replace(/ /g, '-')
      .toLocaleLowerCase()
    setUrl(lowerCasedWithHyphen)
  }

  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <Navbar />
      <SampleSubmitDialog open={dialogOpen} setOpen={setDialogOpen} />
      <div className="h-full w-[90vw] m-auto">
        <h1 className="text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:mt-8 lg:text-3xl lg:leading-tight">
          Sample Creator Window
        </h1>
        {/* This is the main initialization of the Jodit editor */}
        <JoditEditor
          ref={editor} //This is important
          value={content} //This is important
          config={config} //Only use when you declare some custom configs
          onChange={handleChange} //handle the changes
          className="w-full h-[70%] mt-10 bg-white"
        />
        <style>{`.jodit-wysiwyg{height:300px !important}`}</style>
      </div>
      <div className="grid grid-cols-4 gap-4 w-[90vw] mx-auto my-2">
        <Input
          type="text"
          label="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
            updateSampleUrl(e.target.value)
          }}
          className="focus:ring-0"
          containerProps={{ className: 'col-span-2' }}
        />
        <Input
          type="text"
          label="URL of blog"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value)
          }}
          className="focus:ring-0"
          containerProps={{ className: 'col-span-2' }}
        />
        <Input
          type="text"
          label="Meta Title"
          value={metaTitle}
          onChange={(e) => {
            setMetaTitle(e.target.value)
          }}
          className="focus:ring-0"
          containerProps={{ className: 'col-span-2' }}
        />
        <Input
          type="text"
          label="Meta Description"
          value={metaDescription}
          onChange={(e) => {
            setMetaDescription(e.target.value)
          }}
          className="focus:ring-0"
          containerProps={{ className: 'col-span-2' }}
        />
        <Input
          type="number"
          label="Word Count"
          value={wordCount}
          onChange={(e) => {
            setWordCount(e.target.value)
          }}
          className="focus:ring-0"
          containerProps={{ className: 'col-span-1' }}
        ></Input>
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
          Publish
        </Button>
      </div>

      <div className="my-10 h-full w-[90vw] mx-auto mt-20">
        PREVIEW
        {/* <Image
          src={coverImageData}
          width={128}
          height={128}
          alt="Cover Image"
        /> */}
        {/* Meta Data */}
        <div className="flex mb-4 mx-8 flex-col items-center md:mx-16">
          <h1 className="mt-4 px-2 pt-4 text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:px-8 lg:text-3xl lg:leading-tight ">
            {title}
          </h1>
          <div className="flex">
            <Typography variant="paragraph" color="black">
              Words:
            </Typography>
            <Typography variant="h6" color="black" className="px-2">
              {wordCount}
            </Typography>
          </div>
        </div>
        <div
          className="my-4"
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
      </div>
      <Footer />
    </>
  )
}

export default Editor

const SeperatorDot = () => {
  return (
    <div className="w-[8px] h-[8px] bg-gray-700 rounded my-auto mx-2"></div>
  )
}

// /*functions*/
// export default function Home() {

//   return (
//     <>
//     {/* Below is a basic html page and we use Tailwind css to style*/}
//     <Head>
//       <title>Jodit Rich Text Editor on the Web | Soubhagyajit</title>
//       <meta name='author' content='Soubhagyajit Borah'/>
//     </Head>
//     <main>
//       <div className="h-screen w-screen flex items-center flex-col">
//         <div className="m-10  flex flex-col items-center">
//          <span className="text-2xl text-center">

//         Jodit Rich Text Editor on the Web
//         </span>
//         <div className='text-center'>Author : Soubhagyajit Borah</div>
//         <div className='text-center'>visit <a href="https://www.soubhagyajit.com/blogs/adding-Jodit-js-:-rich-text-editor-to-a-react-(next.js)-application" target='_blank' className="text-blue-500">www.soubhagyajit.com</a> for more information</div>
//         </div>

//       </div>
//     </main>
//     </>
//   );
// }
