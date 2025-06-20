import {
  DevicePhoneMobileIcon,
  AdjustmentsHorizontalIcon,
  SunIcon,
  AcademicCapIcon,
  CalendarDaysIcon,
  BanknotesIcon,
  NewspaperIcon
} from '@heroicons/react/24/solid'

import { US, GB, AU, IE, CA, DE, AE, NZ } from 'country-flag-icons/react/3x2'

import featuresImg from '../public/img/home-feature.svg'
import ourOfferingsImg from '../public/img/our-offerings-2.svg'

const featuresList = {
  title: 'Features',
  desc: '',
  image: featuresImg,
  bullets: [
    {
      title: '100% Plagiarism-Free Work',
      desc: 'Every assignment is original and well-researched.',
      icon: <AcademicCapIcon />
    },
    {
      title: 'Timely Submissions',
      desc: 'We work around the clock to meet deadlines.',
      icon: <CalendarDaysIcon />
    },
    {
      title: 'Affordable Prices',
      desc: 'Quality services at student-friendly rates.',
      icon: <BanknotesIcon />
    },
    {
      title: 'Expert Guidance',
      desc: 'Personalized support for better understanding.',
      icon: <NewspaperIcon />
    }
  ]
}

const howItWorks = {
  title: 'How it works',
  desc: '',
  image: featuresImg,
  bullets: [
    {
      title: 'Tell Us Your Needs',
      desc: 'Share what you’re working on and what areas you need help with.',
      icon: <AcademicCapIcon />
    },
    {
      title: 'Get Matched with a Subject Expert',
      desc: 'Our experienced mentors guide you through research and writing improvement strategies.',
      icon: <CalendarDaysIcon />
    },
    {
      title: 'Polish Your Work & Grow Your Skills',
      desc: 'Apply our expert feedback to level up your academic projects with confidence.',
      icon: <BanknotesIcon />
    },
    {
      title: 'Expert Guidance',
      desc: 'Personalized support for better understanding.',
      icon: <NewspaperIcon />
    }
  ]
}

const academicSupportAvailableIn = {
  title: 'Academic Support Available In',
  desc: 'Book expert academic guidance across top global education hubs. Get personalised support based on your country-specific requirements.',
  image: featuresImg,
  bullets: [
    {
      title: 'United Kingdom',
      desc: '',
      icon: <GB />
    },
    {
      title: 'Australia',
      desc: '',
      icon: <AU />
    },
    {
      title: 'Ireland',
      desc: '',
      icon: <IE />
    },
    {
      title: 'United States',
      desc: '',
      icon: <US />
    },
    {
      title: 'Canada',
      desc: '',
      icon: <CA />
    },
    {
      title: 'Germany',
      desc: '',
      icon: <DE />
    },
    {
      title: 'Dubai (UAE)',
      desc: '',
      icon: <AE />
    },
    {
      title: 'New Zealand',
      desc: '',
      icon: <NZ />
    }
  ]
}

const offeringsSection = {
  title: 'Our Offerings',
  desc: 'Our assignment helper experts can assist with:',
  image: ourOfferingsImg,
  bullets: [
    {
      title: 'Assignment help',
      desc: 'Receive step-by-step guidance to craft a high-quality assignment with our best assignment help. Our assignment help services ensure thorough research, structured formatting, and original content. Whether you need PhD assignment help, assignment assistance, or affordable assignment help, we are here to support you at every stage.',
      icon: <DevicePhoneMobileIcon />,
      ctaUrl: 'services/dissertation-writing'
    },
    {
      title: 'Thesis Help',
      desc: "Get expert support for research methodology, literature reviews, and organization through our thesis help. Our assignment and thesis help specialists provide structured assistance to ensure academic excellence. Whether you're struggling with your PhD assignment help or need help with PhD assignment, we are here to help.",
      icon: <AdjustmentsHorizontalIcon />,
      ctaUrl: 'services/thesis-writing'
    },
    {
      title: 'Research Paper Help',
      desc: 'Get professional assistance in structuring and writing research papers. Our research paper writer services ensure quality content that meets academic standards. Whether you want to write my research paper or seek help for assignment services, our experts specialize in various subjects to deliver top-notch results.',
      icon: <SunIcon />,
      ctaUrl: 'services/research-paper-writing'
    },
    {
      title: 'Programming Assistance',
      desc: 'Debugging, application development, and coding homework help are our specialities. From computer programming assignments to complex software development projects, we provide expert guidance. Whether you need help with web design projects, coding solutions, or debugging tasks, our professionals have got you covered.',
      icon: <NewspaperIcon />,
      ctaUrl: 'services/programming-assignment-help-service'
    }
  ]
}

const academicSupportServices = {
  title: 'Our Academic Support Services',
  desc: "Whether you're working on a research paper, refining your thesis, or need help understanding complex topics, we're here to guide you.",
  image: ourOfferingsImg,
  bullets: [
    {
      title: 'Editing & Proofreading Services',
      desc: 'Sharpen your writing with expert grammar checks, structure refinement, and clarity enhancements.',
      icon: <DevicePhoneMobileIcon />
      // ctaUrl: 'services/dissertation-writing'
    },
    {
      title: 'Academic Research Assistance',
      desc: 'Learn how to find credible sources, build strong arguments, and structure research efficiently.',
      icon: <AdjustmentsHorizontalIcon />
    },
    {
      title: 'Citation & Formatting Help',
      desc: 'APA, MLA, Chicago — We ensure your work follows the academic standards in the letter.',
      icon: <SunIcon />
    },
    {
      title: 'Learning Resources & Templates',
      desc: 'Access custom-created study aids, writing templates, and checklists to support your work.',
      icon: <NewspaperIcon />
    }
  ]
}

const whyStudentChooseUs = {
  title: 'Why Students Choose Us',
  desc: '',
  image: ourOfferingsImg,
  bullets: [
    {
      title: 'Student-Centered Approach',
      desc: 'We prioritise clarity, comprehension, and ethical academic growth.',
      icon: <DevicePhoneMobileIcon />
      // ctaUrl: 'services/dissertation-writing'
    },
    {
      title: 'Subject-Matter Experts',
      desc: 'Our team consists of seasoned academic professionals across various disciplines.',
      icon: <AdjustmentsHorizontalIcon />
    },
    {
      title: 'Confidential & Reliable',
      desc: 'We maintain full confidentiality and offer reliable support tailored to your learning pace.',
      icon: <SunIcon />
    },
    {
      title: 'Ethical Support',
      desc: 'All our services are focused on learning improvement, research accuracy, and editorial excellence.',
      icon: <NewspaperIcon />
    }
  ]
}

const serviceMenu = {
  parentName: 'Service',
  children: [
    {
      childName: 'All Services',
      childUrl: '/services'
    },
    {
      childName: 'Dissertation',
      childUrl: '/services/dissertation-writing'
    },
    {
      childName: 'Research Paper',
      childUrl: '/services/research-paper-writing'
    },
    {
      childName: 'Thesis',
      childUrl: '/services/thesis-writing'
    },
    {
      childName: 'Programming',
      childUrl: '/services/programming-assignment-help-service'
    }
  ]
}

const subjectMenu = {
  parentName: 'Subject',
  children: [
    {
      childName: 'Accounting',
      childUrl: '/subjects/accounting-assignment-help'
    },
    {
      childName: 'Finance',
      childUrl: '/subjects/finance-assignment-help'
    },
    {
      childName: 'Economics',
      childUrl: '/subjects/economics-assignment-help'
    },
    {
      childName: 'Medical',
      childUrl: '/subjects/medical-assignment-help'
    },
    {
      childName: 'Nursing',
      childUrl: '/subjects/nursing-assignment-help'
    },
    {
      childName: 'Psychology',
      childUrl: '/subjects/psychology-assignment-help'
    },
    {
      childName: 'Engineering',
      childUrl: '/subjects/engineering-assignment-help'
    },
    {
      childName: 'Law',
      childUrl: '/subjects/law-assignment-help'
    },
    {
      childName: 'Management',
      childUrl: '/subjects/management-assignment-help'
    }
  ]
}

const footerLinks = [
  { name: 'Home', url: '/' },
  { name: 'About Us', url: '/' },
  { name: 'Samples', url: '/samples' },
  { name: 'Blog', url: '/blogs' },
  { name: 'Careers', url: '/careers' },
  { name: 'Contact Us', url: '/contact' }
]

const serviceCards = [
  { name: 'Accounting', url: '#', imageUrl: '/img/services/accounting.png' },
  { name: 'Management', url: '#', imageUrl: '/img/services/management.png' },
  {
    name: 'Computer Programming',
    url: '#',
    imageUrl: '/img/services/computer-programming.png'
  },
  { name: 'Engineering', url: '#', imageUrl: '/img/services/engineering.png' },
  { name: 'Finance', url: '#', imageUrl: '/img/services/finance.png' },
  { name: 'Economics', url: '#', imageUrl: '/img/services/economics.png' },
  { name: 'Law', url: '#', imageUrl: '/img/services/law.png' },
  {
    name: 'Dissertation/Thesis',
    url: '#',
    imageUrl: '/img/services/dissertation-thesis.png'
  },
  { name: 'Statistics', url: '#', imageUrl: '/img/services/statistics.png' },
  {
    name: 'Science/Maths',
    url: '#',
    imageUrl: '/img/services/science-maths.png'
  },
  { name: 'Healthcare', url: '#', imageUrl: '/img/services/healthcare.png' }
]

const testimonialList = [
  {
    personName: 'Manpreet Kaur',
    personPic: '/img/services/statistics.png',
    message:
      "I got 85 in my thesis for my Master's in Data Science and Artificial Intelligence. Thank you so much, AHP!",
    numberOfStars: 5
  },
  {
    personName: 'Emily Roberts',
    personPic: '/img/services/statistics.png',
    message:
      'I had a great experience with AHP. Their team helped me a lot throughout my degree, making sure I stayed on top of my academic work and deadlines. Thanks to their support, I was able to perform really well, and I would definitely recommend them to anyone who needs assistance with their studies.',
    numberOfStars: 4
  },
  {
    personName: 'Mohmd. Abdul',
    personPic: '/img/services/statistics.png',
    message:
      'My PhD thesis in Public Policy and Governance was completed in 15 days with excellent research!',
    numberOfStars: 4
  },
  {
    personName: 'Shivani Kalra',
    personPic: '/img/services/statistics.png',
    message:
      'I highly recommend AHP for research paperwork. Their service is top-notch!',
    numberOfStars: 5
  },
  {
    personName: 'Kevin Joseph',
    personPic: '/img/services/statistics.png',
    message:
      'I got 85 in my thesis for my masters in Data science and Artificial Intelligence. Thank you so much AHP',
    numberOfStars: 4
  },
  {
    personName: 'Jane Cluster',
    personPic: '/img/services/statistics.png',
    message:
      'I got 84 in my research paper for my bachelors degree in business administration. I highly recommend AHP for research paper work. I really like their genuine concern for students and remind you to submit your assignments on time and always support during professor’s meetings.',
    numberOfStars: 5
  }
]

const testimoniaLandinglList = [
  {
    personName: 'Amelia R., UK University Student',
    personPic: '/img/services/statistics.png',
    message:
      'My research paper went from average to excellent with their editing support and resource guidance.',
    numberOfStars: 5
  },
  {
    personName: "Karan D., Master's Student",
    personPic: '/img/services/statistics.png',
    message:
      'They helped me structure my thesis better and understand citation formats I was struggling with.',
    numberOfStars: 4
  }
]

const sampleList = [
  {
    name: 'Accounts',
    imgUrl: '/img/samples/accounts.jpg',
    path: '/accounts',
    children: [
      {
        childName: 'Accounts Sample 1',
        content:
          'Determine the maturity dates of the three notes prescribed and present journal entries for each of the preceding dates.',
        docUrl: '/documents/accounts/accounts_sample_1.pdf'
      },
      {
        childName: 'Accounts Sample 2',
        content:
          'Calculate depreciation expense for fiscal year 2023, 2024, 2025 by completing a schedule with the following headings.',
        docUrl: '/documents/accounts/accounts_sample_2.pdf'
      },
      {
        childName: 'Accounts Sample 3',
        content:
          'Prepare general Journal entries to record  the following perpetual system merchandising transactions.',
        docUrl: '/documents/accounts/accounts_sample_3.pdf'
      }
    ]
  },
  {
    name: 'Management',
    imgUrl: '/img/samples/management.jpg',
    path: '/management',
    children: [
      {
        childName: 'Capstone Project',
        content:
          'Graybar Inc. is considered the largest distributor and supply chain business of various electrical, telecommunication, and industrial materials.  This study will focus on the current situation of the company based on a market overview.',
        docUrl:
          '/documents/management/Management-Capstone-project_watermark.pdf'
      },
      {
        childName: 'Sample Supply Chain Mgmt',
        content:
          'This report intends to determine how supply chain disruption within Marks & Spencer (M&S) have created issues in their operational services. M&S delivers different product portfolios including clothing, cosmetics, home decor, and food production.',
        docUrl: '/documents/management/Sample-Supply-Chain-Mgmt_watermark.pdf'
      },
      {
        childName: 'Sample 3',
        content:
          'Tina has chosen White Oaks, London, Ontario as the location for her restaurant and has selected Japanese cuisine as the cuisine of her choice. More particularly, her restaurant will be a sushi restaurant and will be called “Sakura Sushi”. This is primarily done to cater to the population of Asians in the area (as stated in the given case) as well as to introduce the local population of White Oaks to the world of Sushi.',
        docUrl: '/documents/management/Management-Sample-3_watermark.pdf'
      }
    ]
  },
  {
    name: 'Finance',
    imgUrl: '/img/samples/finance.jpg',
    path: '/finance',
    children: [
      {
        childName: 'Sample 1',
        content:
          "On the analysis of the statements, it can be said that the financial performance of the company is quite good. However, at the same time, it is also recognised that the cash budget of the company is reflecting negative results. The customers of the company are also closer to its break-even point, which questions the company's financial performance.",
        docUrl: '/documents/finance/Finance-sample-1_watermark.pdf'
      },
      {
        childName: 'Sample 2',
        content:
          'The company will be established in Silicon Valley to operate in the said markets and the growth opportunities will be ample, however, the competition (McKinsey, Deloitte and EY) is high but the company will encounter that through expertise and diversification. The total start-up costs for the company will be $100,000 (including $78,000 for fixed assets and $22,000 for other expenses). The costs will be sourced from equity and debt in equal proportion.',
        docUrl: '/documents/finance/Finance-sample-2_watermark.pdf'
      },
      {
        childName: 'Sample 3',
        content:
          'The report isaimed to discuss the financial and non-financial position of CSL limited. This is a leading biotechnology sector company of Australia. According to the financial analysis of the company this can be summarized that the performance of the company is below average in some areas like the profitability and efficiency that needs to be rectified in the following years.',
        docUrl: '/documents/finance/Finance-sample-3_watermark.pdf'
      }
    ]
  },
  {
    name: 'Dissertation',
    imgUrl: '/img/samples/dissertation.jpg',
    path: '/dissertation',
    children: [
      {
        childName: 'Medical Sample',
        content:
          'The primary aim of this research is to identify the common factors that influence the screening of early prostate cancer and its uptake among Asian, Black, and ethnic minority men.',
        docUrl: '/documents/dissertation/Medical-Dissertation_watermark.pdf'
      },
      {
        childName: 'Management Sample',
        content:
          'The aim of the current research is to identify the importance of a two-way communication process in business organisations. The current research will also explore different effective communication channels along with the strengths and weaknesses of those communication processes.',
        docUrl: '/documents/dissertation/Management-Dissertation_watermark.pdf'
      },
      {
        childName: 'Dissertation ',
        content:
          'The dissertation is focused on ten news reports that appeared in the China Daily, a major newspaper in China, and The New York Times , an important and serious American newspaper, related to “The Belt and Road” initiative (BRI).',
        docUrl:
          '/documents/dissertation/Dissertation-Final-Chapters-CDA-2021_watermark.pdf'
      }
    ]
  },
  {
    name: 'Medical',
    imgUrl: '/img/samples/medical.jpg',
    path: '/medical',
    children: [
      {
        childName: 'Chronic Renal Failure',
        content:
          'Chronic renal failure or chronic kidney disease (CKD) is a gradual and progressive decline of kidney function and is usually observant in individuals who are pre exposed to clinical conditions of type II diabetes mellitus, hypertension and various cardiovascular diseases.',
        docUrl: '/documents/medical/chronic-kidney-failure_watermark.pdf'
      },
      {
        childName: 'Cell Biology',
        content:
          'There are various events which are prevalent for the purpose of dividing cells. The inception of cell division results in the formation of daughter cells. When the formation of daughter cells occurs, there are various changes which are prevalent within the DNA.',
        docUrl: '/documents/medical/cell-biology.pdf'
      },
      {
        childName: 'Psychology',
        content:
          'An important discovery in the development of contemporary psychoanalysis is the debate among both Freudian and Jungian psychology. The rhetorical techniques Freud and the psychoanalytic movement employed to develop, maintain, as well as control psychoanalytic practice were particularly essential in this setting. Another major worry in this was the segregation as well as expulsion of dissenters.',
        docUrl: '/documents/medical/Psychology_watermark.pdf'
      }
    ]
  },
  {
    name: 'Research',
    imgUrl: '/img/samples/engineering.jpg',
    path: '/research',
    children: [
      {
        childName: 'Management',
        content:
          'this research seeks to examine the impact of social media in creating brand awareness in the fast fashion industry. It analysis the role of social media channels used by leading fashion brands in creating brand awareness in the fast fashion industry, such as Facebook, Instagram, YouTube and Twitter.',
        docUrl: '/documents/research/Management-research paper_watermark.pdf'
      },
      {
        childName: 'Finance',
        content:
          'This Research is based on finance and accounting, within which main focus of the research is on highlighting financial fraud or internal audit fraud and its impact on the financial growth of corporates.',
        docUrl: '/documents/research/Finance-research paper_watermark.pdf'
      },
      {
        childName: 'Marketing',
        content:
          'This paper aims to explore how WOM marketing can derive customer engagement and improve brand success of McDonald’s.',
        docUrl: '/documents/research/Marketing-Research Paper_watermark.pdf'
      }
    ]
  },
  {
    name: 'Law',
    imgUrl: '/img/samples/law.jpg',
    path: '/law',
    children: [
      {
        childName: 'Law Sample 1',
        content:
          'The Commonwealth Copyright Act (1968) establishes the legal framework for the copying and distribution of print, electronic, and audio-visual items at the University of Notre Dame Australia.',
        docUrl: '/documents/law/Law-1_watermark.pdf'
      },
      {
        childName: 'Law Sample 2',
        content:
          "The research aims to explore the international organisations' involvement and effect on Australian insolvency law. The findings include cross-border insolvency’s underlying aspects, “Model Law on Cross-Border Insolvency” adopted by the Australia, Australia reforming its insolvency laws and comparing US and the UK.",
        docUrl: '/documents/law/Law-2_watermark.pdf'
      },
      {
        childName: 'Law Sample 3',
        content:
          'As per the arbitration law in force within the territorial jurisdiction of the United Arab Emirates comprises of Federal Law No. (6) of 2018 on Arbitration and as far as arbitrations held in the jurisdiction of DIFC is concerned it is governed and regulated by DIFC LAW No. 1 of 2008.',
        docUrl: '/documents/law/Law-Sample-3_watermark.pdf'
      }
    ]
  },
  {
    name: 'Programming',
    imgUrl: '/img/samples/programming.jpg',
    path: '/programming',
    children: [
      {
        childName: 'Video Game',
        content:
          'Task will be to first pitch, then plan and create assets for, and finally develop a small video game prototype. Your game must not be based on any existing artistic works or media, such as film, television, games, stories, or characters. It must be your own original creation based on a provided randomly generated Scenario.',
        docUrl: '/documents/programming/video_game_watermark.pdf'
      },
      {
        childName: 'Springboot Framework',
        content:
          'The project consists of a Spring Framework project with a Spring Boot Starter parent, a Spring Boot Starter web, a Spring Boot Starter test, and a Spring Spring Starter parent.',
        docUrl: '/documents/programming/springboot_starter_parent_watermark.pdf'
      },
      {
        childName: 'PCB Quality Control',
        content:
          'PCB quality control involves monitoring and measuring PCBs in strict accordance with inspection.',
        docUrl: '/documents/programming/pcq_quality_control_watermark.pdf'
      },
      {
        childName: 'ER Diagram',
        content:
          'Consider the ER diagram below, which shows a simplified schema of the examination period at UWE. Extract from the ER diagram the requirements and constraints that produced this schema. Try to be as precise as possible in your requirements and constraints specification.',
        docUrl: '/documents/programming/er_desciption_name_watermark.pdf'
      }
    ]
  }
]

const serviceList = [
  'Annotated Bibliography',
  'Article Review',
  'Assignment',
  'Book/Movie Review',
  'Business Plan',
  'Capstone Project',
  'Dissertation',
  'Essay (Any Type)',
  'Journal Article',
  'Memo/Letter',
  'Outline',
  'Presentation/PPT',
  'Programming',
  'Proposal',
  'Outline',
  'Reflection paper/essay',
  'Research Paper',
  'Research Plan',
  'Speech',
  'Summary',
  'Thesis',
  'Others'
]

const subjectList = [
  'Management',
  'Computer Science (Programming)',
  'Finance',
  'Accounting',
  'Mathematics',
  'Statistics',
  'Law (All Fields)',
  'Nutrition',
  'Healthcare',
  'Medical Sciences',
  'Nursing',
  'Psychology',
  'Natural Sciences',
  'Architecture, Building and Planning',
  'Engineering (Civil, Mechanical, Electronics)',
  'English 101 & Literature',
  'Philosophy',
  'Economics',
  'Sociology',
  'Tourism',
  'Others'
]

const pageNumbers = [
  '1 page - 250 words',
  '2 page - 500 words',
  '3 page - 750 words',
  '4 page - 1000 words',
  '5 page - 1250 words',
  '6 page - 1500 words',
  '7 page - 1750 words',
  '8 page - 2000 words',
  '9 page - 2250 words',
  '10 page - 2500 words',
  '11 page - 2750 words',
  '12 page - 3000 words',
  '13 page - 3250 words',
  '14 page - 3500 words',
  '15 page - 3750 words',
  '16 page - 4000 words',
  '17 page - 4250 words',
  '18 page - 4500 words',
  '19 page - 4750 words',
  '20 page - 5000 words',
  'More Pages'
]

const faqHomeData = [
  {
    questionText: 'What is an assignment helper, and how can it assist me?',
    answerText: `An assignment helper is a professional who provides expert guidance in academic writing, including thesis help, assignment assistance, research papers, and programming assignments. Our team ensures well-researched and plagiarism-free content tailored to your requirements.`
  },
  {
    questionText: 'What subjects do you cover?',
    answerText: `We offer assistance in Finance, Law, Marketing, HRM, Nursing, Programming, Chemistry, Accounting, Statistics, and more. No matter your subject, our experts are here to help!`
  },
  {
    questionText: 'How do I get assignment help online?',
    answerText: `Simply contact our assignment help services, share your requirements, and let our experts handle the research, writing, and formatting. We provide personalized support throughout the process.`
  },
  {
    questionText: 'Do you offer emergency assignment help?',
    answerText: `Yes! We specialize in urgent assignment help, including emergency rent assistance topics, Section 8 housing for rent assignments, and last-minute submissions.`
  },
  {
    questionText: 'Can I buy a assignment or research paper online?',
    answerText: `Yes, we provide custom assignment help where you can get original and high-quality assignment tailored to your university's guidelines.`
  },
  {
    questionText: 'What makes your programming assistance unique?',
    answerText: `Our programming assistance covers everything from coding homework help to debugging, software development, and web design projects, ensuring students understand the logic behind the code.`
  },
  {
    questionText: 'How do I ensure my assignment is plagiarism-free?',
    answerText: `We use advanced plagiarism-checking tools and provide assignment proofreading services to guarantee 100% original content before submission.`
  }
]

const faqLandingData = [
  {
    questionText: 'Do you offer assignment help?',
    answerText: `We provide academic guidance, research mentoring, and editing support. Our services are designed to help students improve the quality of their academic work while maintaining educational integrity.`
  },
  {
    questionText: 'Can I use your feedback in my project?',
    answerText: `Absolutely! Our support is meant to help you build a stronger understanding of your subject and improve your work independently.`
  }
]

export {
  featuresList,
  offeringsSection,
  serviceMenu,
  subjectMenu,
  footerLinks,
  serviceCards,
  testimonialList,
  sampleList,
  serviceList,
  subjectList,
  pageNumbers,
  faqHomeData,
  academicSupportServices,
  howItWorks,
  testimoniaLandinglList,
  whyStudentChooseUs,
  academicSupportAvailableIn,
  faqLandingData
}
