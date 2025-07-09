import Link from 'next/link'
import Image from 'next/image'
import { Disclosure } from '@headlessui/react'
import { serviceMenu, subjectMenu } from './data'
import { CustomMenu } from './CustomMenu'
import Script from 'next/script'
import { useState, useEffect } from 'react'

const Navbarlanding = () => {
  // const [isTawkScriptLoaded, setisTawkScriptLoaded] = useState(false)
  useEffect(() => {
    if (window.sessionStorage.getItem('isReloaded')) {
    } else if (window.Tawk_API && window.Tawk_API.onLoaded) {
      window.sessionStorage.setItem('isReloaded', true)
      window.location.reload(false)
    }
  }, [])

  return (
    <>
      <Script
        id="tawk"
        strategy="lazyOnload"
        src="https://embed.tawk.to/627672e97b967b11798e3885/1g2fb1olq"
      ></Script>
      <div className="bg-indigo-100 w-full sticky top-0 z-[2]">
        <nav className="container relative flex flex-wrap items-center justify-between p-2 mx-auto lg:justify-between">
          {/* Logo  */}
          <Disclosure>
            {({ open }) => (
              <>
                {/* {open && (
                <div className="fixed inset-0 w-full h-full z-[9995] bg-black bg-opacity-60 backdrop-blur-sm"></div>
              )} */}
                <div className="flex flex-wrap items-center justify-between w-full lg:w-auto drop-shadow-2xl">
                  <Link href="/">
                    <span className="flex items-center space-x-2 text-2xl font-medium text-indigo-500 ">
                      <span>
                        <Image
                          src="/img/AHP-Logo.png"
                          alt="AHP"
                          // width="128"
                          // height="128"
                          width={96}
                          height={96}
                        />
                      </span>
                    </span>
                  </Link>

                  <Disclosure.Button
                    aria-label="Toggle Menu"
                    className="px-2 py-1 ml-auto text-gray-700 rounded-md lg:hidden hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none"
                  >
                    <svg
                      className="w-6 h-6 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      {open && (
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                        />
                      )}
                      {!open && (
                        <path
                          fillRule="evenodd"
                          d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                        />
                      )}
                    </svg>
                  </Disclosure.Button>

                  <Disclosure.Panel className="flex flex-wrap w-full my-5 lg:hidden">
                    <>
                      {/* {navigation.map((item, index) => ( */}
                      <Link
                        href="/"
                        className="w-full inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md  hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none"
                      >
                        Home
                      </Link>
                      <Link
                        href="/samples"
                        className="w-full inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md  hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none"
                      >
                        Samples
                      </Link>
                      <CustomMenu data={serviceMenu} />
                      <CustomMenu data={subjectMenu} />
                      <Link
                        href="/blogs"
                        className="w-full inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md  hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none"
                      >
                        Blogs
                      </Link>
                      <Link
                        href="/contact"
                        className="w-full px-6 py-2 mt-3 text-center text-white bg-indigo-600 rounded-md lg:ml-5"
                      >
                        Contact Us
                      </Link>
                    </>
                  </Disclosure.Panel>
                </div>
              </>
            )}
          </Disclosure>

          {/* menu  */}
          <div className="hidden text-center lg:flex lg:items-center">
            <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
              <li className="mr-3 nav__item" key="home-nav">
                <Link
                  href="/"
                  className="w-full inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md  hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none"
                >
                  Home
                </Link>
              </li>
              <li className="w-full mr-3 nav__item" key="sample-nav">
                <Link
                  href="/samples"
                  className="inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md  hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none"
                >
                  Samples
                </Link>
              </li>
              <li className="mr-3 nav__item" key="service-nav">
                <CustomMenu data={serviceMenu} />
              </li>
              <li className="mr-3 nav__item" key="subject-nav">
                <CustomMenu data={subjectMenu} />
              </li>
              <li className="mr-3 nav__item" key="blog-nav">
                <Link
                  href="/blogs"
                  className="w-full inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md  hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none"
                >
                  Blogs
                </Link>
              </li>
            </ul>
          </div>

          <div className="hidden mr-3 space-x-4 lg:flex nav__item">
            <Link
              href="/contact"
              className="px-6 py-2 text-white bg-indigo-600 rounded-md md:ml-5"
            >
              Contact Us
            </Link>
          </div>
        </nav>
        <a href="/services/dissertation-writing" className="w-0"></a>
        <a href="/services/research-paper-writing" className="w-0"></a>
        <a href="/services/thesis-writing" className="w-0"></a>
        <a href="/services/programming-assignment-help" className="w-0"></a>
        <a href="/subjects/accounting-assignment-help" className="w-0"></a>
        <a href="/subjects/finance-assignment-help" className="w-0"></a>
        <a href="/subjects/economics-assignment-help" className="w-0"></a>
        <a href="/subjects/medical-assignment-help" className="w-0"></a>
        <a href="/subjects/nursing-assignment-help" className="w-0"></a>
        <a href="/subjects/psychology-assignment-help" className="w-0"></a>
        <a href="/subjects/engineering-assignment-help" className="w-0"></a>
        <a href="/subjects/law-assignment-help" className="w-0"></a>
        <a href="/subjects/management-assignment-help" className="w-0"></a>
      </div>
    </>
  )
}

export default Navbarlanding
