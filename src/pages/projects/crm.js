import { useEffect, useState } from "react"
export default function Home() {

    const [timeElapsed, setTimeElapsed] = useState(0);
    const dateDiff = (date1, date2) => {
        const diff = date1 - date2;
        const days = diff / 1000 / 60 / 60 / 24;
        // round to nearest day
        // if it minus days, we need to multiply by -1 to get the
        // correct number of days
        //
        if(days < 0) {
            return Math.round(days) * -1;
        }
        return days;
    };
    useEffect(() => {
        document.querySelector("header").classList.add("hide");
        // project start date is 5th November 2022
        const startDate = new Date(2022, 10, 15);
        // find the difference between now and the start date
        const days = dateDiff(startDate, new Date());
    
        setTimeElapsed(days);
    },[]);
  return (
    <div className="timeline">
        {timeElapsed } Days Elapsed
    </div>
  )
}