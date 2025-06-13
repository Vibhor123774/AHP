import { useState, useEffect } from 'react'
import { Card, Input, Button, Select, Option } from '@material-tailwind/react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'
import { serviceList, subjectList, pageNumbers } from './data'
import ContactUsDialog from './dialogs/contactUsDialog'
import CustomDayPicker from './CustomDayPicker'

export default function ContactFormLanding(props) {
  const [phone, setPhone] = useState('')
  const [service, setService] = useState('')
  const [subject, setSubject] = useState('')
  const [pageNum, setPageNum] = useState(pageNumbers[0])
  const [date, setDate] = useState()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [isSubjectDisable, setIsSubjectDisable] = useState(false)
  const [isServiceDisable, setIsServiceDisable] = useState(false)
  const [isMoreNumberOfPagesSelected, setIsMoreNumberOfPagesSelected] =
    useState(false)
  const [pageNumText, setPageNumText] = useState('')
  const [isOtherSubjectSelected, setIsOtherSubjectSelected] = useState(false)
  const [subjectText, setSubjectText] = useState('')
  const [isOtherServiceSelected, setIsOtherServiceSelected] = useState(false)
  const [serviceText, setserviceText] = useState('')
  const [isPhoneValid, setIsPhoneValid] = useState(false)
  const [phoneInputProperties, setPhoneInputProperties] = useState({
    width: '100%',
    height: '100%'
  })
  const [selectedFiles, setSelectedFiles] = useState([])
  const [selectedFilesText, setSelectedFilesText] = useState('')

  useEffect(() => {
    if (props.defaultSubject) {
      setSubject(props.defaultSubject)
      setIsSubjectDisable(true)
    }
    if (props.defaultService) {
      setService(props.defaultService)
      setIsServiceDisable(true)
    }
  }, [])

  useEffect(() => {
    if (pageNum === 'More Pages') {
      setIsMoreNumberOfPagesSelected(true)
    }
    if (subject === 'Others') {
      setIsOtherSubjectSelected(true)
    }
    if (service === 'Others') {
      setIsOtherServiceSelected(true)
    }
  }, [pageNum, subject, service])

  const handleOnPhoneChange = (value, country) => {
    setPhone(value)
    let lengthOfPhoneNumberWithoutCountrycode =
      value.length - country.dialCode.length
    setIsPhoneValid(
      country && lengthOfPhoneNumberWithoutCountrycode > 0 ? true : false
    ) // Validate based on selected country
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!isPhoneValid || phone.trim() === '') {
      setPhoneInputProperties({
        width: '100%',
        height: '100%',
        border: '2px solid',
        borderColor: 'red'
      })
      return
    }
    let formData = new FormData(e.currentTarget)
    formData.append('dueDate', date)
    formData.append('phone', phone)
    if (pageNumText === '') {
      formData.append('pageNumber', pageNum)
    } else {
      formData.append('pageNumber', pageNumText)
    }
    if (subjectText === '') {
      formData.append('subject', subject)
    } else {
      formData.append('subject', subjectText)
    }
    if (serviceText === '') {
      formData.append('service', service)
    } else {
      formData.append('service', serviceText)
    }

    // if (selectedFiles) {
    //   formData.append('assignmentFile', selectedFiles)
    // }

    selectedFiles.forEach((file) => {
      formData.append('assignmentFile', file)
    })

    const response = await fetch('https://ahp-apis.onrender.com/contact', {
      method: 'POST',
      body: formData
    })
    if (response.status === 200) {
      gtag_report_conversion()
      uet_report_conversion()
      setDialogOpen(true)
    }
  }

  return (
    <Card className="px-6 py-8 sm:py-8 lg:px-8 ">
      <ContactUsDialog open={dialogOpen} setOpen={setDialogOpen} />
      <form className="mb-2 max-w-screen-lg sm:w-96" onSubmit={onSubmit}>
        <div className="mb-4 flex flex-col gap-4">
          <Input
            name="name"
            label="Name"
            type="text"
            className="focus:ring-0"
            pattern="[a-zA-Z][a-zA-Z ]+"
            title="Only alphabets are allowed"
            // value={name}
            // onChange={setName}
            required
          />
          <Input
            name="email"
            label="Email"
            type="email"
            className="focus:ring-0"
            required
          />
          <PhoneInput
            country={'us'}
            value={phone}
            onChange={handleOnPhoneChange}
            inputStyle={phoneInputProperties}
            containerStyle={{ height: '2.5rem' }}
          />
          {!isOtherServiceSelected ? (
            <Select
              label="Service"
              name="service"
              defaultValue={props.defaultService}
              value={service}
              disabled={isServiceDisable}
              onChange={(e) => {
                setService(e)
              }}
            >
              {serviceList.map((item, index) => (
                <Option key={`service-${index}`} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          ) : (
            <Input
              label="Other Service"
              type="text"
              value={serviceText}
              onChange={(e) => {
                setserviceText(e.target.value)
              }}
              className="focus:ring-0"
            />
          )}
          {!isOtherSubjectSelected ? (
            <Select
              label="Subject"
              name="subject"
              value={subject}
              disabled={isSubjectDisable}
              onChange={(e) => setSubject(e)}
            >
              {subjectList.map((item, index) => (
                <Option key={`subject-${index}`} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          ) : (
            <Input
              label="Other Subject"
              type="text"
              value={subjectText}
              onChange={(e) => {
                setSubjectText(e.target.value)
              }}
              className="focus:ring-0"
            />
          )}
          {!isMoreNumberOfPagesSelected ? (
            <Select
              label="Number of Pages"
              name="numOfPages"
              containerProps={{
                className: 'min-w-0 mr-1'
              }}
              value={pageNum}
              onChange={(e) => setPageNum(e)}
            >
              {pageNumbers.map((item, index) => (
                <Option key={`pagenum-${index}`} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          ) : (
            <Input
              label="Number of Pages"
              type="text"
              value={pageNumText}
              onChange={(e) => {
                setPageNumText(e.target.value)
              }}
              className="focus:ring-0"
            />
          )}
          <CustomDayPicker date={date} setDate={setDate} />
          {/* <div>
            <Input
              label="Assignment File"
              name="assignmentFile"
              type="file"
              className="focus:ring-0"
              multiple
            />
          </div> */}
          <div className="relative flex w-full max-w-[24rem]">
            <Input
              type="file"
              label="Assignment File"
              className="pr-20"
              containerProps={{
                className: 'min-w-0'
              }}
              value={selectedFilesText}
              onChange={(e) => {
                setSelectedFilesText(e.target.value)
                setSelectedFiles([...e.target.files])
              }}
              multiple
            />
            <Button
              size="sm"
              onClick={(e) => {
                setSelectedFiles([])
                setSelectedFilesText('')
              }}
              color={selectedFiles ? 'gray' : 'blue-gray'}
              disabled={!selectedFilesText}
              className="!absolute right-1 top-1 rounded"
            >
              X
            </Button>
          </div>
        </div>
        {/* <Checkbox
          required
          label={
            <Typography
              variant="small"
              color="gray"
              className="flex items-center font-normal"
            >
              I agree the
              <Link
                href="#"
                className="font-medium transition-colors hover:text-gray-900"
              >
                &nbsp;Terms and Conditions
              </Link>
            </Typography>
          }
          containerProps={{ className: '-ml-2.5' }}
        /> */}
        <Button type="submit" className="mt-4" color="indigo" fullWidth>
          Send
        </Button>
      </form>
    </Card>
  )
}
