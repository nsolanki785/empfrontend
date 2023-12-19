import React,{useEffect,useRef} from "react";


const useOutsideClick = (wrapperRef ,setClose) => {


  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
        document.removeEventListener("click", handleClickOutside, false);
    };
}, []);

const handleClickOutside = event => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        // setColordropdown(false);
        setClose(false)
    }

    // if (filterRef.current && !filterRef.current.contains(event.target)) {
    //     setShowfilter(false);
    // }
};
}

  export default useOutsideClick;
  