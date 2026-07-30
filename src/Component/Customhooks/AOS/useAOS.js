import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const useAOS = (option = {}) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        AOS.init(option);
        const handleScroll = () => {
            AOS.refresh();
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
};

export default useAOS;
