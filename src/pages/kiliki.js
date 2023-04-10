import { useEffect } from "react";

// load the font from public/KiLiKi-Maa.ttf
// and use it in the textarea

const Kiliki = () => {

    useEffect(()=>{

    })

    return (<div>
        <textarea style={{
            width: "90vw",
            margin:"100px auto",
            display: "block",
            minHeight: "50vh",
            fontSize: "1.5rem",
            padding: "10px",
           
            border: "none",
            outline: "none",
            /**
             * font-variant-ligatures: discretionary-ligatures;
    font-family: kiliki;
             */
            fontVariantLigatures: "discretionary-ligatures",
            fontFamily: "Kiliki",
        }}
        className="kiliki"
        spellCheck="false"  
        >

        </textarea>
            </div>
);
    }

export default Kiliki;