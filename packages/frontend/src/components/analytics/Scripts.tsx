import Script from "next/script";

import { PRODUCTION } from "../../constants/config";
import { GA_TRACKING_ID } from "../../libs/gtag";

function Scripts() {
  return (
    <div>
      {PRODUCTION && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <Script strategy="lazyOnload" id="ga">
            {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });`}
          </Script>
        </>
      )}
    </div>
  );
}

export default Scripts;
