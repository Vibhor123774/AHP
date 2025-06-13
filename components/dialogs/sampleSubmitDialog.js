import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter
} from '@material-tailwind/react'

import Image from 'next/image'

export default function SampleSubmitDialog(props) {
  const onClickOkay = () => {
    handleOpen()
    window.location.reload(false)
  }

  const handleOpen = () => props.setOpen(!props.open)

  return (
    <Dialog
      open={props.open}
      handler={handleOpen}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 }
      }}
      size="sm"
    >
      <DialogHeader className="flex justify-center">
        The Sample is submitted
      </DialogHeader>
      <DialogBody className="flex flex-col items-center">
        <Image
          height={64}
          width={64}
          src={'/img/animate-tick.gif'}
          alt="Animate Green Tick"
        />
        Sample content will be published/Updated shortly
      </DialogBody>
      <DialogFooter className="flex justify-center">
        <Button variant="gradient" color="green" onClick={onClickOkay}>
          <span>Okay</span>
        </Button>
      </DialogFooter>
    </Dialog>
  )
}
