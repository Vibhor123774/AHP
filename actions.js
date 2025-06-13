'use server'

// import { revalidateTag } from 'next/cache'

export default async function submitContactDetails(prevState, formData) {
  //   revalidateTag('posts')
  return { message: 'form received' }
}
