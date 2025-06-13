import Image from 'next/image'
import Link from 'next/link'

export function RatingBanner(props) {
  return (
    <div className="flex flex-col md:flex-row m-2 md:my-6 justify-evenly items-center ">
      <Image
        src="/img/rating-text.png"
        width={350}
        height={34}
        alt="Website Rating Text"
        className="my-4"
      />
      {/* <Link
        href="https://www.trustpilot.com/review/assignmentshelpprovider.com"
        className="hover:shadow-md rounded-lg p-2"
      > */}
      <Image
        src="/img/rating-trustpilot.png"
        width={200}
        height={96}
        alt="Website Rating Text"
        className="my-4"
      />
      {/* </Link> */}
      {/* <Link
        href="https://www.sitejabber.com/reviews/assignmentshelpprovider.com"
        className="hover:shadow-md rounded-lg p-2"
      > */}
      <Image
        src="/img/rating-sitejabber.png"
        width={200}
        height={84}
        alt="Website Rating Text"
        className="my-4"
      />
      {/* </Link> */}
    </div>
  )
}
