import { useState, useEffect } from 'react';
import { getTrainEta } from '../api';
import { useLive } from '../useSocket';

function TrainEta({ no }) {
  const [data, setData] = useState(null);

  useEffect(() => { getTrainEta(no).then(setData); }, [no]);        // first load (REST)
  useLive('subscribe:train', no, 'eta', (d) => {                    // phir live push
    if (d.trainNo === no) setData(d);
  });

  if (!data) return <p>Loading...</p>;
  return (
    <>
      <h2>{data.trainName} – delay {data.currentDelayMin} min</h2>
      {data.stops.map(s => (
        <div key={s.stationCode}>
          {s.stationName}: <b>{new Date(s.predictedETA).toLocaleTimeString()}</b>
          {' '}(sched {new Date(s.scheduledArrival).toLocaleTimeString()}, +{s.predictedDelayMin}m)
        </div>
      ))}
    </>
  );
}

export default TrainEta;