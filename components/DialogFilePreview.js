import {
  Dialog,
  DialogHeader,
  DialogBody,
  IconButton
} from '@material-tailwind/react'

const DialogFilePreview = (props) => {
  return (
    <>
      <Dialog open={props.dialogOpen} handler={props.dialogHandler}>
        <DialogHeader>
          Sample Preview
          <IconButton
            color="blue-gray"
            size="sm"
            variant="text"
            onClick={props.dialogHandler}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </DialogHeader>
        <DialogBody className="h-[40rem] overflow-scroll text-center">
          <iframe
            src={`${props.documentUrl}#zoom=50`}
            height="100%"
            width="100%"
          >
            File preview not supported in your browser. Kindly download the
            file.
          </iframe>
        </DialogBody>
      </Dialog>
    </>
  )
}

export default DialogFilePreview
