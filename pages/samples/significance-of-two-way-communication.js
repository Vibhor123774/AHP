import { Typography, Button } from '@material-tailwind/react'
// import DownloadIcon from '@mui/icons-material/Download'
import { useState } from 'react'
import Head from 'next/head'
import Navbar from '../../components/navbar'
import Footer from '../../components/footer'
import Link from 'next/link'
const management_capstone_project = () => {
  return (
    <>
      <Head>
        <title>AHP - Assignments Help Provider</title>
        <meta
          name="description"
          content="Avail Assignment helper in affordable prices. Get online assignment help on dissertation, thesis helper,  research paper assistance & more on a wide range of subjects."
        />
        <meta name="robots" content="index,follow" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Navbar />
      {/* BODY */}
      <div className="container  mx-auto w-4/5 ">
        <h2 className="px-2 pt-2 text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:text-2xl lg:leading-tight xl:text-3xl xl:leading-tight">
          Significance of two-way Communication in the Business Organisation
        </h2>
        {/* SUBTITLE */}
        <div className="flex justify-between mx-2 my-2">
          <div className="flex">
            <Typography variant="paragraph" color="black">
              Words:
            </Typography>
            <Typography variant="h6" color="black" className="px-2">
              1314
            </Typography>
          </div>
          <div>
            <Button variant="outlined" color="indigo" size="sm">
              Download
            </Button>
          </div>
        </div>
        {/* CONTENT */}
        <div>
          <Typography variant="paragraph" color="black" className="mx-2">
            One of the most critical aspects of a business organization is
            maintaining an effective relationship between employees. Two-way
            communication enhances the condition of work effectiveness and helps
            in the future development of the organization. Apart from
            interaction with employees, two-way communication is also essential
            for handling effective relationships with stakeholders. Using an
            appropriate two-way communication approach helps the organization's
            management team send messages to internal as well as external
            stakeholders. External stakeholders are also able to send back
            information to the management team and employees of the
            organization. Two-way communication is an essential element, and it
            plays a vital role in the interchange of information. It helps to
            enhance transparency within the organization and maintains the
            knowledge flow. There are two types of two-way communication present
            in the organization: horizontal two-way communication and vertical
            two-way communication. The vertical two-way communication conducts
            when the data and information are exchanged between subordinates and
            superiors (Williams, 2020).
          </Typography>
          <Typography variant="paragraph" color="black" className="mx-2 mt-4">
            On the other hand, horizontal two-way communication occurs when
            people with the same position communicate. For example, in
            horizontal two-way communication, the product manager of an
            organization can provide a purchase request to the purchase manager,
            and the purchase manager sends feedback to the product manager. In
            order to achieve advantages in the competitive market, organizations
            must implement an effective strategy of two-way communication
            (Williams, V., 2020). Using this strategy, the management team is
            able to motivate their team members to maintain a healthy working
            culture. This type of communication in an internal environment
            enhances employee engagement and increases their strength.
          </Typography>
          <Typography variant="paragraph" color="black" className="mx-2 mt-4">
            Based on the information of a research paper, it can be said that
            teamHub is one of the most effective solutions to achieve two-way
            communication (Dolamore et al., 2021). It helps leaders of an
            organization to share their success stories among employees through
            the mobile application. This application is very cost-effective and
            the fastest way of implementing internal two-way communication.
            Ineffective internal communication is related to low employee
            engagement, performance, and motivation. Apart from these, poor
            internal communication provides a direct negative impact on employee
            experience. Inefficient internal communication harms the
            relationship between higher authorities and employees. It also
            reduces productivity, which reduces the organization's revenue. In
            order to develop an effective two-communication in the internal
            environment of the organization, it is essential to follow four
            steps such as 1) plan, 2) focus on the audience, 3) allow sufficient
            time, 4) take feedback, and 5) regularly check. Based on the
            information from multiple research papers, it is clear that two-way
            communication is better than the top-down approach in order to
            improve employee engagement (Nawaz, 2020). These days, most
            organizations follow teamwork and collaborative approaches with
            their leaders. The two-way communication helps in this process, and
            leaders are able to maintain transparency. Apart from internal
            communication, a two-way communication strategy also helps the
            external communication of the organization. Any organization's
            customer relationship management team should integrate two-way
            communication to develop a healthy relationship with customers. It
            will not only enhance customer engagement but also provide a
            positive impact on sales. In order to maintain two-way communication
            with customers, the management team can take help from social media
            platforms. Multiple methods help in two-way communication, such as
            polls, NPS, surveys, etc (Dolamore et al., 2021). These
            communication methods play a vital role in understanding customers'
            perceptions and help understand the purchase behavior of the target
            audiences. Using multiple approaches of two-way communication, the
            customer relationship management team can resolve customer issues
            that play an essential role in customer satisfaction. There are
            multiple aspects present in customer support, such as social
            communities, web assistance, human service, etc. According to the
            information in the research paper, it can be said that human service
            is most effective for customer support and can be achieved through a
            two-way communication system. Face-to-face communication is the
            traditional way of two-way communication, but in this covid-19
            pandemic, situation organizations take the help of software to
            maintain the efficiency of the communication. Using two-way
            communication, the sales team of the organization can understand the
            expectations of potential customers. It also helps to increase the
            loyal customer relationship and boost customer advocacy. From a
            research paper, it is clear that a 5% increment in customer
            relations can increase the 95% of profit growth. Apart from this,
            two-way communication brings visibility to the organization (Nawaz,
            2020).
          </Typography>
        </div>
      </div>

      <Footer />
    </>
  )
}
export default management_capstone_project
