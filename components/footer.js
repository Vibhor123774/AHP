import Link from 'next/link'
import React from 'react'
import Container from './container'
import Image from 'next/image'

export default function Footer() {
  // Footer link categories
  const footerCategories = {
    services: {
      title: 'Services',
      links: [
        {
          name: 'Dissertation Writing Services',
          url: '/services/dissertation-writing-service'
        },
        {
          name: 'Research Paper Writing Service',
          url: '/services/research-paper-writing-service'
        },
        {
          name: 'Thesis Writing Services',
          url: '/services/thesis-writing-service'
        },
        {
          name: 'Programming Assignment Help',
          url: '/services/programming-assignment-help'
        }
      ]
    },
    samples: {
      title: 'Samples',
      links: [
        { name: 'Accounts', url: '/samples/accounts' },
        { name: 'Management', url: '/samples/management' },
        { name: 'Finance', url: '/samples/finance' },
        { name: 'Dissertation', url: '/samples/dissertation' },
        { name: 'Medical', url: '/samples/medical' },
        { name: 'Research', url: '/samples/research' },
        { name: 'Law', url: '/samples/law' },
        { name: 'Programming', url: '/samples/programming' }
      ]
    },
    subjects: {
      title: 'Subjects',
      links: [
        { name: 'Accounting', url: '/subjects/accounting-assignment-help' },
        { name: 'Finance', url: '/subjects/finance-assignment-help' },
        { name: 'Economics', url: '/subjects/economics-assignment-help' },
        { name: 'Medical', url: '/subjects/medical-assignment-help' },
        { name: 'Nursing', url: '/subjects/nursing-assignment-help' },
        { name: 'Psychology', url: '/subjects/psychology-assignment-help' },
        { name: 'Engineering', url: '/subjects/engineering-assignment-help' },
        { name: 'Law', url: '/subjects/law-assignment-help' },
        { name: 'Management', url: '/subjects/management-assignment-help' }
      ]
    },
    discover: {
      title: 'Discover',
      links: [
        { name: 'Blog', url: '/blogs' },
        { name: 'About Us', url: '/about' },
        { name: 'Careers', url: '/careers' },
        { name: 'Free Reference Generator', url: '/reference' },
        { name: 'Contact Us', url: '/contact' }
      ]
    }
  }

  return (
    <div className="relative">
      {/* Professional WhatsApp Floating Button */}
      <div className="fixed bottom-20 right-6 md:bottom-8 md:right-8 z-50 group">
        <Link href="https://wa.me/919529691180">
          <div className="relative transform transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-green-500 rounded-full blur opacity-40"></div>
            <div className="relative bg-green-500 hover:bg-green-600 p-3 rounded-full shadow-lg border border-green-400/20 transition-all duration-300">
              <Image
                src="/img/whatsapp-icon.png"
                height="40"
                width="40"
                alt="whatsapp icon"
                className="drop-shadow-sm"
              />
            </div>
          </div>
        </Link>
      </div>

      {/* Professional Footer with Clean Design */}
      <footer className="relative bg-white text-gray-800 border-t border-gray-200">
        <Container>
          <div className="relative py-6 z-10">
            {/* Main Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
              {/* Services Column */}
              <div className="space-y-1">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {footerCategories.services.title}
                </h3>
                <div className="space-y-1">
                  {footerCategories.services.links.map((link, index) => (
                    <Link
                      key={index}
                      href={link.url}
                      className="group block text-gray-600 hover:text-indigo-600 transition-all duration-300"
                    >
                      <div className="relative rounded-md hover:bg-gray-50 transition-all duration-300">
                        <span className="relative z-10 text-sm font-medium">
                          {link.name}
                        </span>
                        <div className="absolute bottom-0 left-2 w-0 h-0.5 bg-indigo-600 group-hover:w-6 transition-all duration-300"></div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Samples Column */}
              <div className="space-y-1">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {footerCategories.samples.title}
                </h3>
                <div className="space-y-1">
                  {footerCategories.samples.links.map((link, index) => (
                    <Link
                      key={index}
                      href={link.url}
                      className="group block text-gray-600 hover:text-indigo-600 transition-all duration-300"
                    >
                      <div className="relative  rounded-md hover:bg-gray-50 transition-all duration-300">
                        <span className="relative z-10 text-sm font-medium">
                          {link.name}
                        </span>
                        <div className="absolute bottom-0 left-2 w-0 h-0.5 bg-indigo-600 group-hover:w-6 transition-all duration-300"></div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Subjects Column */}
              <div className="space-y-1">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {footerCategories.subjects.title}
                </h3>
                <div className="space-y-1">
                  {footerCategories.subjects.links.map((link, index) => (
                    <Link
                      key={index}
                      href={link.url}
                      className="group block text-gray-600 hover:text-indigo-600 transition-all duration-300"
                    >
                      <div className="relative rounded-md hover:bg-gray-50 transition-all duration-300">
                        <span className="relative z-10 text-sm font-medium">
                          {link.name}
                        </span>
                        <div className="absolute bottom-0 left-2 w-0 h-0.5 bg-indigo-600 group-hover:w-6 transition-all duration-300"></div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Discover Column */}
              <div className="space-y-1">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {footerCategories.discover.title}
                </h3>
                <div className="space-y-1">
                  {footerCategories.discover.links.map((link, index) => (
                    <Link
                      key={index}
                      href={link.url}
                      className="group block text-gray-600 hover:text-indigo-600 transition-all duration-300"
                    >
                      <div className="relative rounded-md hover:bg-gray-50 transition-all duration-300">
                        <span className="relative z-10 text-sm font-medium">
                          {link.name}
                        </span>
                        <div className="absolute bottom-0 left-2 w-0 h-0.5 bg-indigo-600 group-hover:w-6 transition-all duration-300"></div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gray-200 mb-8"></div>

            {/* Bottom Section */}
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
              {/* Secure Payment Section */}
<div className="flex flex-col items-center lg:items-end">
  <h4 className="text-base font-medium text-gray-900 mb-3 text-center lg:text-right">
    100% Secure Payment
  </h4>
  <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
    {/* Payment Icons */}
    <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-4 bg-gray-50 rounded-lg px-3 sm:px-5 py-4 border border-gray-200 max-w-full">
      {/* Razorpay */}
      <div className="w-12 h-8 sm:w-16 sm:h-10 bg-white rounded-md flex items-center justify-center border border-gray-200 shadow-sm">
        <img
          src="/razorpay-seeklogo.svg"
          alt="Razorpay"
          className="h-4 sm:h-6 max-w-full object-contain"
        />
      </div>

      {/* UPI */}
      <div className="w-12 h-8 sm:w-16 sm:h-10 bg-white rounded-md flex items-center justify-center border border-gray-200 shadow-sm">
        <img
          src="/upi-id.svg"
          alt="UPI"
          className="h-4 sm:h-6 max-w-full object-contain"
        />
      </div>

      {/* Visa */}
      <div className="w-12 h-8 sm:w-16 sm:h-10 bg-white rounded-md flex items-center justify-center border border-gray-200 shadow-sm">
        <img
          src="/visa.svg"
          alt="Visa"
          className="h-4 sm:h-6 max-w-full object-contain"
        />
      </div>

      {/* Mastercard */}
      <div className="w-12 h-8 sm:w-16 sm:h-10 bg-white rounded-md flex items-center justify-center border border-gray-200 shadow-sm">
        <img
          src="/mastercard.svg"
          alt="Mastercard"
          className="h-4 sm:h-6 max-w-full object-contain"
        />
      </div>
    </div>

    {/* Security Badges */}
    <div className="flex items-center space-x-2">
      <div className="bg-green-600 text-white px-2 sm:px-2.5 py-1 rounded-md text-xs font-medium">
        DMCA
      </div>
      <div className="bg-gray-700 text-white px-2 sm:px-2.5 py-1 rounded-md text-xs font-medium">
        PROTECTED
      </div>
    </div>
  </div>
</div>

              {/* Social Icons Section */}
              <div className="flex flex-col items-center lg:items-start">
                <h4 className="text-base font-medium text-gray-900 mb-3">
                  Connect With Us
                </h4>
                <div className="flex space-x-3">
                  <Link
                    href="https://wa.me/919529691180"
                    target="_blank"
                    rel="noopener"
                    className="group relative"
                  >
                    <div className="bg-green-500 hover:bg-green-600 p-2.5 rounded-lg transform transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg">
                      <span className="sr-only">Whatsapp</span>
                      <Whatsapp size={18} />
                    </div>
                  </Link>

                  <Link
                    href="https://www.facebook.com/people/Assignments-Help-Provider/100089214236809/?mibextid=D4KYlr"
                    target="_blank"
                    rel="noopener"
                    className="group relative"
                  >
                    <div className="bg-blue-600 hover:bg-blue-700 p-2.5 rounded-lg transform transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg">
                      <span className="sr-only">Facebook</span>
                      <Facebook size={18} />
                    </div>
                  </Link>

                  <Link
                    href="https://www.instagram.com/assignmenthelpprovider/?igshid=YmMyMTA2M2Y%3D"
                    target="_blank"
                    rel="noopener"
                    className="group relative"
                  >
                    <div className="bg-pink-600 hover:bg-pink-700 p-2.5 rounded-lg transform transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg">
                      <span className="sr-only">Instagram</span>
                      <Instagram size={18} />
                    </div>
                  </Link>

                  <Link
                    href="https://www.linkedin.com/in/assignment-help-provider-250827228"
                    target="_blank"
                    rel="noopener"
                    className="group relative"
                  >
                    <div className="bg-blue-700 hover:bg-blue-800 p-2.5 rounded-lg transform transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg">
                      <span className="sr-only">Linkedin</span>
                      <Linkedin size={18} />
                    </div>
                  </Link>

                  <Link
                    href="mailto:assignmentinfo.ahp@gmail.com"
                    target="_blank"
                    rel="noopener"
                    className="group relative"
                  >
                    <div className="bg-red-600 hover:bg-red-700 p-2.5 rounded-lg transform transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center">
                      <span className="sr-only">Email</span>
                      <Image
                        src="/img/mail-icon.png"
                        height="18"
                        width="18"
                        alt="mail"
                        className="filter brightness-0 invert"
                      />
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Final Divider */}
            <div className="w-full h-px bg-gray-200 my-6"></div>

            {/* Copyright Section */}
            <div className="text-center">
              <div className="text-sm text-gray-600 font-medium bg-gray-50 rounded-lg px-4 py-2.5 border border-gray-200 inline-block">
                <span className="text-gray-900 font-medium">
                  Copyright © {new Date().getFullYear()}
                </span>
                <span className="mx-2 text-gray-400">•</span>
                <span className="text-gray-900 font-medium">
                  Assignments Help Provider
                </span>
                <span className="mx-2 text-gray-400">•</span>
                <span className="text-gray-600">All rights are reserved.</span>
              </div>
            </div>
          </div>
        </Container>

        {/* Bottom Accent Line */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"></div>
      </footer>
    </div>
  )
}

const Whatsapp = ({ size = 24 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="currentColor"
      viewBox="0 0 418.135 418.135"
      className="text-white"
    >
      <path d="M198.929.242C88.5 5.5 1.356 97.466 1.691 208.02c.102 33.672 8.231 65.454 22.571 93.536L2.245 408.429c-1.191 5.781 4.023 10.843 9.766 9.483l104.723-24.811c26.905 13.402 57.125 21.143 89.108 21.631 112.869 1.724 206.982-87.897 210.5-200.724C420.113 93.065 320.295-5.538 198.929.242zm124.957 321.955c-30.669 30.669-71.446 47.559-114.818 47.559-25.396 0-49.71-5.698-72.269-16.935l-14.584-7.265-64.206 15.212 13.515-65.607-7.185-14.07c-11.711-22.935-17.649-47.736-17.649-73.713 0-43.373 16.89-84.149 47.559-114.819 30.395-30.395 71.837-47.56 114.822-47.56 43.372.001 84.147 16.891 114.816 47.559 30.669 30.669 47.559 71.445 47.56 114.817-.001 42.986-17.166 84.428-47.561 114.822z"></path>
      <path d="M309.712 252.351l-40.169-11.534a14.971 14.971 0 00-14.816 3.903l-9.823 10.008c-4.142 4.22-10.427 5.576-15.909 3.358-19.002-7.69-58.974-43.23-69.182-61.007-2.945-5.128-2.458-11.539 1.158-16.218l8.576-11.095a14.97 14.97 0 001.847-15.21l-16.9-38.223c-4.048-9.155-15.747-11.82-23.39-5.356-11.211 9.482-24.513 23.891-26.13 39.854-2.851 28.144 9.219 63.622 54.862 106.222 52.73 49.215 94.956 55.717 122.449 49.057 15.594-3.777 28.056-18.919 35.921-31.317 5.362-8.453 1.128-19.679-8.494-22.442z"></path>
    </svg>
  )
}

const Facebook = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-white"
  >
    <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07" />
  </svg>
)

const Instagram = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-white"
  >
    <path d="M16.98 0a6.9 6.9 0 0 1 5.08 1.98A6.94 6.94 0 0 1 24 7.02v9.96c0 2.08-.68 3.87-1.98 5.13A7.14 7.14 0 0 1 16.94 24H7.06a7.06 7.06 0 0 1-5.03-1.89A6.96 6.96 0 0 1 0 16.94V7.02C0 2.8 2.8 0 7.02 0h9.96zm.05 2.23H7.06c-1.45 0-2.7.43-3.53 1.25a4.82 4.82 0 0 0-1.3 3.54v9.92c0 1.5.43 2.7 1.3 3.58a5 5 0 0 0 3.53 1.25h9.88a5 5 0 0 0 3.53-1.25 4.73 4.73 0 0 0 1.4-3.54V7.02a5 5 0 0 0-1.3-3.49 4.82 4.82 0 0 0-3.54-1.3zM12 5.76c3.39 0 6.2 2.8 6.2 6.2a6.2 6.2 0 0 1-12.4 0 6.2 6.2 0 0 1 6.2-6.2zm0 2.22a3.99 3.99 0 0 0-3.97 3.97A3.99 3.99 0 0 0 12 15.92a3.99 3.99 0 0 0 3.97-3.97A3.99 3.99 0 0 0 12 7.98zm6.44-3.77a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8z" />
  </svg>
)

const Linkedin = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-white"
  >
    <path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.27 20.1H3.65V9.24h3.62V20.1zM5.47 7.76h-.03c-1.22 0-2-.83-2-1.87 0-1.06.8-1.87 2.05-1.87 1.24 0 2 .8 2.02 1.87 0 1.04-.78 1.87-2.05 1.87zM20.34 20.1h-3.63v-5.8c0-1.45-.52-2.45-1.83-2.45-1 0-1.6.67-1.87 1.32-.1.23-.11.55-.11.88v6.05H9.28s.05-9.82 0-10.84h3.63v1.54a3.6 3.6 0 0 1 3.26-1.8c2.39 0 4.18 1.56 4.18 4.89v6.21z" />
  </svg>
)
