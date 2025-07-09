import Link from 'next/link'
import Image from 'next/image'
import { Disclosure } from '@headlessui/react'
import { serviceMenu, subjectMenu } from './data'
import { CustomMenu } from './CustomMenu'
import Script from 'next/script'
import { useEffect } from 'react'

const Navbar = () => {
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.Tawk_API &&
      typeof window.Tawk_API.onLoaded === 'function'
    ) {
      window.Tawk_API.onLoaded = () => {
        console.log('Tawk script loaded.')
      }
    }
  }, [])

  return (
    <>
      <Script
        id="tawk"
        strategy="lazyOnload"
        src="https://embed.tawk.to/627672e97b967b11798e3885/1g2fb1olq"
      ></Script>

      {/* Clean White Navigation Bar */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-lg">
        <nav className="container relative flex flex-wrap items-center justify-between px-4 py-3 mx-auto max-w-7xl lg:justify-between">
          <Disclosure>
            {({ open }) => (
              <>
                <div className="flex flex-wrap items-center justify-between w-full lg:w-auto">
                  {/* Clean Logo */}
                  <Link href="/" className="group">
                    <span className="flex items-center space-x-3 text-xl font-medium">
                      <div className="relative transform transition-all duration-300 group-hover:scale-105">
                        <div className="relative bg-gray-50 p-1.5 rounded-xl border border-gray-200 group-hover:border-indigo-300 transition-all duration-300 group-hover:shadow-md">
                          <Image
                            src="/img/AHP-Logo.png"
                            alt="AHP"
                            width={60}
                            height={60}
                            className="transition-all duration-300"
                          />
                        </div>
                      </div>
                    </span>
                  </Link>

                  {/* Mobile Menu Button */}
                  <Disclosure.Button
                    aria-label="Toggle Menu"
                    className="relative p-2 ml-auto text-gray-600 rounded-lg lg:hidden hover:text-indigo-600 hover:bg-gray-50 focus:text-indigo-600 focus:bg-gray-50 transition-all duration-300"
                  >
                    <svg
                      className="w-5 h-5 fill-current transition-transform duration-300"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      {open ? (
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                        />
                      ) : (
                        <path
                          fillRule="evenodd"
                          d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                        />
                      )}
                    </svg>
                  </Disclosure.Button>

                  {/* Mobile Menu Panel */}
                  <Disclosure.Panel className="flex flex-wrap w-full my-4 lg:hidden">
                    <div className="w-full bg-white rounded-xl border border-gray-200 shadow-lg p-3 space-y-1">
                      <Link
                        href="/"
                        className="group w-full flex items-center px-3 py-2 text-base font-medium text-gray-700 no-underline rounded-lg transition-all duration-300 hover:bg-gray-50 hover:text-indigo-600"
                      >
                        <span className="relative">
                          Home
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
                        </span>
                      </Link>
                      <Link
                        href="/samples"
                        className="group w-full flex items-center px-3 py-2 text-base font-medium text-gray-700 no-underline rounded-lg transition-all duration-300 hover:bg-gray-50 hover:text-indigo-600"
                      >
                        <span className="relative">
                          Samples
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
                        </span>
                      </Link>
                      <CustomMenu data={serviceMenu} />
                      <CustomMenu data={subjectMenu} />
                      <Link
                        href="/blogs"
                        className="group w-full flex items-center px-3 py-2 text-base font-medium text-gray-700 no-underline rounded-lg transition-all duration-300 hover:bg-gray-50 hover:text-indigo-600"
                      >
                        <span className="relative">
                          Blogs
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
                        </span>
                      </Link>
                      <Link
                        href="/reference"
                        className="group w-full flex items-center px-3 py-2 text-base font-medium text-gray-700 no-underline rounded-lg transition-all duration-300 hover:bg-gray-50 hover:text-indigo-600"
                      >
                        <span className="relative">
                          Free Reference Generator
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
                        </span>
                      </Link>

                      {/* Mobile CTA Button */}
                      <div className="pt-3">
                        <Link
                          href="/contact"
                          className="group relative w-full flex items-center justify-center px-6 py-3 text-white font-medium rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105 bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-xl"
                        >
                          <span className="relative z-10 flex items-center">
                            Contact Us
                            <svg
                              className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                              />
                            </svg>
                          </span>
                        </Link>
                      </div>
                    </div>
                  </Disclosure.Panel>
                </div>
              </>
            )}
          </Disclosure>

          {/* Desktop Menu */}
          <div className="hidden text-center lg:flex lg:items-center">
            <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex lg:space-x-1">
              <li className="nav__item group" key="home-nav">
                <Link
                  href="/"
                  className="relative inline-flex items-center px-4 py-2 text-base font-medium text-gray-700 transition-all duration-300 rounded-lg hover:text-indigo-600 hover:bg-gray-50 group"
                >
                  <span className="relative z-10">
                    Home
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </li>
              <li className="nav__item group" key="sample-nav">
                <Link
                  href="/samples"
                  className="relative inline-flex items-center px-4 py-2 text-base font-medium text-gray-700 transition-all duration-300 rounded-lg hover:text-indigo-600 hover:bg-gray-50 group"
                >
                  <span className="relative z-10">
                    Samples
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </li>
              <li className="nav__item" key="service-nav">
                <CustomMenu data={serviceMenu} />
              </li>
              <li className="nav__item" key="subject-nav">
                <CustomMenu data={subjectMenu} />
              </li>
              <li className="nav__item group" key="blog-nav">
                <Link
                  href="/blogs"
                  className="relative inline-flex items-center px-4 py-2 text-base font-medium text-gray-700 transition-all duration-300 rounded-lg hover:text-indigo-600 hover:bg-gray-50 group"
                >
                  <span className="relative z-10">
                    Blogs
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </li>
              <li className="nav__item group" key="reference-nav">
                <Link
                  href="/reference"
                  className="relative inline-flex items-center px-4 py-2 text-base font-medium text-gray-700 transition-all duration-300 rounded-lg hover:text-indigo-600 hover:bg-gray-50 group"
                >
                  <span className="relative z-10">
                    Free Reference Generator
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex nav__item">
            <Link
              href="/contact"
              className="group relative inline-flex items-center px-6 py-2 ml-3 text-white font-medium rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105 bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-xl"
            >
              <span className="relative z-10 flex items-center">
                Contact Us
                <svg
                  className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </Link>
          </div>
        </nav>

        {/* SEO Preload Links (Hidden) */}
        <div className="sr-only">
          <a href="/services/dissertation-writing">
            Dissertation Writing Service
          </a>
          <a href="/services/research-paper-writing">
            Research Paper Writing Service
          </a>
          <a href="/services/thesis-writing-service">Thesis Writing Service</a>
          <a href="/services/programming-assignment-help">
            Programming Assignment Help
          </a>
          <a href="/subjects/accounting-assignment-help">
            Accounting Assignment Help
          </a>
          <a href="/subjects/finance-assignment-help">
            Finance Assignment Help
          </a>
          <a href="/subjects/economics-assignment-help">
            Economics Assignment Help
          </a>
          <a href="/subjects/medical-assignment-help">
            Medical Assignment Help
          </a>
          <a href="/subjects/nursing-assignment-help">
            Nursing Assignment Help
          </a>
          <a href="/subjects/psychology-assignment-help">
            Psychology Assignment Help
          </a>
          <a href="/subjects/engineering-assignment-help">
            Engineering Assignment Help
          </a>
          <a href="/subjects/law-assignment-help">Law Assignment Help</a>
          <a href="/subjects/management-assignment-help">
            Management Assignment Help
          </a>
        </div>
      </div>
    </>
  )
}

export default Navbar
