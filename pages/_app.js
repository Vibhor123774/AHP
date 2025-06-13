import '../css/tailwind.css'
import Script from 'next/script'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
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

      {/* Google Ad */}
      {/* <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-566347120"
        strategy="beforeInteractive"
      ></Script>
      <Script strategy="beforeInteractive">
        {` window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'AW-566347120');

        function gtag_report_conversion(url) {
          var callback = function () {
            if (typeof(url) != 'undefined') {
              window.location = url;
            }
          };
          gtag('event', 'conversion', {
              'send_to': 'AW-566347120/WOzaCKjfwpoaELn-9uY-',
              'event_callback': callback
          });
          return false;
        } 
        `}
      </Script> */}

      {/* Facebook Pixel Ads */}

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
