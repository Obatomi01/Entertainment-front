import styles from '../../styles/home/home.module.css';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function SummaryDetail() {
  const { summaryId } = useParams();
  const [summaryWords, setSummaryWords] = useState('');

  useEffect(() => {
    loadMovieSummary();
  }, []);

  const loadMovieSummary = async () => {
    try {
      const response = await fetch(
        `https://entertainment-app-tomisin.vercel.app/movies/${summaryId}`
      );

      const data = await response.json();

      const formattedSummary = data.summary.split('\n').map((line, i) => {
        return (
          <div key={i}>
            <h2>{line}</h2>
          </div>
        );
      });

      setSummaryWords(formattedSummary);
    } catch (err) {
      console.log(err);
    }
  };

  return <div className={styles['summary--container']}>{summaryWords}</div>;
}

export default SummaryDetail;
