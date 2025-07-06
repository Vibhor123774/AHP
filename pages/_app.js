import '../css/tailwind.css'
import Script from 'next/script'
import { ClerkProvider } from '@clerk/nextjs'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ClerkProvider
        {...pageProps}
        appearance={{
          cssLayerName: 'clerk',
        }}
        // Add these configuration options
        publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
        signInUrl="/sign-in"
        signUpUrl="/sign-up"
        afterSignInUrl="/"
        afterSignUpUrl="/"
      >
        <Component {...pageProps} />
      </ClerkProvider>
      
      {/* Google Analytics */}
      <Script
        strategy="beforeInteractive"
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-GDMKHXL1EJ"
      ></Script>
      <Script strategy="beforeInteractive">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-GDMKHXL1EJ');
        `}
      </Script>
      <Script strategy="beforeInteractive">
        {`
        !function(f,b,e,v,n,t,s)
          {
            if(f.fbq)
              return;
            n=f.fbq=function(){
                n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)
                };
            if(!f._fbq)
              f._fbq=n;
            n.push=n;
            n.loaded=!0;
            n.version='2.0';
            n.queue=[];
            t=b.createElement(e);
            t.async=!0;
            t.src=v;
            s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '918194652744921');
            fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src="https://www.facebook.com/tr?id=918194652744921&ev=PageView&noscript=1"
        />
      </noscript>
    </>
  )
}

export default MyApp