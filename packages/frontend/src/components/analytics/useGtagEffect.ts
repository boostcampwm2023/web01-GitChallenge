import { useRouter } from "next/router";
import { useEffect } from "react";

import { PRODUCTION } from "../../constants/config";
import * as gtag from "../../libs/gtag";

const useGtagEffect = () => {
  const router = useRouter();
  useEffect(() => {
    if (!PRODUCTION) return () => {};

    const handleRouteChange = (url: URL) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  return null;
};
export default useGtagEffect;
