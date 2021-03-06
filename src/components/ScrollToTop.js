import * as React from "react";
import { useLocation } from "react-router";

export default function ScrollToTop() {
    const { pathname } = useLocation();
    React.useEffect(() => {
        //window.scrollTo(0, 0);
        window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
    }, [pathname]);

    return null;
};