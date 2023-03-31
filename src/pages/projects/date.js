import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import moment from 'moment';

const DateCounter = () => {
  const [daysElapsed, setDaysElapsed] = useState(null);
  const router = useRouter();

  useEffect(() => {
    document.querySelector("header").classList.add("hide");

    const { query } = router;
    const startDate = moment(query.start_date, 'DD-MM-YYYY');
    const currentDate = moment();
    const elapsedDays = currentDate.diff(startDate, 'days');
    setDaysElapsed(elapsedDays);
  }, [router.query.start_date]);

  return (
    <div className="timeline">
        {daysElapsed} days Elapsed
    </div>
  );
};

export default DateCounter;
