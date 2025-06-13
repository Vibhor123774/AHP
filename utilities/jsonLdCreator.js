import {
  dissertationData,
  programmingData,
  researchPaperData,
  thesisData
} from '../components/data/servicesData'
import {
  accountingData,
  economicsData,
  engineeringData,
  financeData,
  lawData,
  managementData,
  medicalData,
  nursingData,
  psychologyData
} from '../components/data/subjectData'

export const homeJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Assignment Help Provider',
  alternateName: 'AHP',
  url: 'https://assignmentshelpprovider.com/',
  logo: 'https://assignmentshelpprovider.com/img/logo.png',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+919529691180',
    contactType: 'customer service',
    areaServed: 'IN',
    availableLanguage: 'en'
  },
  sameAs: [
    'https://www.facebook.com/people/Assignments-Help-Provider/100089214236809/?mibextid=D4KYlr',
    'https://www.instagram.com/assignmenthelpprovider/?igshid=YmMyMTA2M2Y%3D',
    'https://www.linkedin.com/in/assignment-help-provider-250827228'
  ]
}

export const getFaqJsonLd = (pageType, pageName) => {
  var jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: []
  }
  var dataObject
  if (pageType === 'services') {
    switch (pageName) {
      case 'dissertation':
        dataObject = dissertationData
        break
      case 'programming':
        dataObject = programmingData
        break
      case 'researchPaper':
        dataObject = researchPaperData
        break
      case 'thesis':
        dataObject = thesisData
        break
      default:
        break
    }
  } else {
    switch (pageName) {
      case 'economics':
        dataObject = economicsData
        break
      case 'medical':
        dataObject = medicalData
        break
      case 'nursing':
        dataObject = nursingData
        break
      case 'psychology':
        dataObject = psychologyData
        break
      case 'finance':
        dataObject = financeData
        break
      case 'law':
        dataObject = lawData
        break
      case 'accounting':
        dataObject = accountingData
        break
      case 'engineering':
        dataObject = engineeringData
        break
      case 'management':
        dataObject = managementData
        break
      default:
        break
    }
  }

  const faqList = dataObject.faqList
  faqList.forEach((faq) => {
    jsonLd.mainEntity.push({
      '@type': 'Question',
      name: faq.questionText,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answerText
      }
    })
  })
  return {
    __html: JSON.stringify(jsonLd)
  }
}

export const getReviewJsonLd = (data) => {
  var ratingValue
  if (
    data.serviceName === 'Dissertation Service' ||
    data.serviceName === 'Thesis Service'
  ) {
    ratingValue = 4.7
  } else {
    ratingValue = getRandomInt(42, 45) / 10
  }
  const reviewCount = 40 + getRandomInt(0, 30)
  const worstRating = 3.7 + getRandomInt(0, 4) / 10
  const bestRating = 5
  var jsonLd = {
    '@context': 'http://schema.org',
    '@type': 'Product',
    name: data.serviceName || data.subjectName,
    description: data.descriptionContent,
    url: `https://assignmentshelpprovider.com/${data.pageUrl}`,
    brand: { '@type': 'Brand', name: 'Assignments Help Provider' },
    image: '',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: ratingValue,
      reviewCount: reviewCount,
      worstRating: worstRating,
      bestRating: bestRating
    }
  }
  return {
    __html: JSON.stringify(jsonLd)
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}
