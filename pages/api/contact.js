import { Formidable } from 'formidable'
import fs from 'fs'
import { sendEmail, sendMail2 } from '../../service/mailService'
import { insertContactformResponse } from '../../service/mongodbService'
import { put } from '@vercel/blob'
import { NextResponse } from 'next/server'

export const config = {
  api: {
    bodyParser: false
  }
}

export default async function contact(req, res) {
  const data = await new Promise((resolve, reject) => {
    const form = new Formidable()
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject({ err })
      }
      resolve({ err, fields, files })
    })
  })
  const name = data.fields.name[0]
  const email = data.fields.email[0]
  const dueDate = data.fields.dueDate[0]
  const phone = data.fields.phone[0]
  const service = data.fields.service[0]
  const subject = data.fields.subject[0]
  const pageNumber = data.fields.pageNumber[0]

  const textMessageForEmail = `Name : ${name}\nEmail : ${email}\nDue-Date : ${dueDate}\nPhone Number : ${phone}\nService : ${service}\nSubject : ${subject}\nNumber of Pages : ${pageNumber}`
  var attachmentObject = []
  data?.files?.assignmentFile?.forEach((file) => {
    attachmentObject.push({
      filename: file.originalFilename,
      content: fs.readFileSync(file.filepath)
    })
  })

  sendEmail(
    'AHP Cleint Information',
    process.env.NODEMAILER_EMAIL,
    email,
    textMessageForEmail,
    attachmentObject
  )

  sendMail2(
    'AHP Cleint Information 2',
    process.env.NODEMAILER_EMAIL_2,
    email,
    textMessageForEmail,
    attachmentObject
  )

  /*
  For entering in database
  */
  insertContactformResponse(
    getDataObjectWithoutFile(name, email, dueDate, phone, service, subject)
  )

  /*
  For storage
  */
  // const blob = await put(file.originalFilename, file.filepath, {
  //   access: 'public'
  // })
  // console.log(blob)
  res.status(200).json({
    status: process.env.NODEMAILER_EMAIL_2
  })
}

function getDataObjectWithoutFile(
  name,
  email,
  dueDate,
  phone,
  service,
  subject
) {
  return {
    name: name,
    email: email,
    dueDate: dueDate,
    phone: phone,
    service: service,
    subject: subject
  }
}
