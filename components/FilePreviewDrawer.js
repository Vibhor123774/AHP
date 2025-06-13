import React from 'react'
import { Drawer, Typography, IconButton } from '@material-tailwind/react'

const FilePreviewDrawer = (props) => {
  return (
    <Drawer
      placement="right"
      open={props.drawerOpen}
      onClose={props.closeDrawer}
      className="p-4"
      size={700}
    >
      <div className="mb-6 flex items-center justify-between">
        <Typography variant="h5" color="blue-gray">
          Sample Preview
        </Typography>
        {/* <ComboBox
          itemList={documentNameList}
          placeholder="Subject/Course"
          selected={props.activeDocument.childName}
          setSelected={setActiveDocumentByDocumentName}
        /> */}
        <IconButton
          variant="text"
          color="blue-gray"
          onClick={props.closeDrawer}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </IconButton>
      </div>
      {/* <iframe className="absolute h-full w-full" src={props.documentUrl} /> */}
      <iframe
        src={`${props.documentUrl}#view=FitH`}
        className="absolute h-full w-px min-w-full"
      >
        File preview not supported in your browser. Kindly download the file.
      </iframe>
    </Drawer>
  )
}
export default FilePreviewDrawer
