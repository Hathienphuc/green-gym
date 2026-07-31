import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const useAOS = (option = {}) => {
    useEffect(() => {
        AOS.init(option);
        const handleScroll = () => {
            AOS.refresh();
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};

export default useAOS;
