import { useState, useEffect } from 'react';
import { getTrainEta } from '../api';
import { useLive } from '../useSocket';

function StationBoard({ code }) {
  const [rows, setRows] = useState([]);
  useEffect(() => { getArrivals(code).then(d => setRows(d.arrivals)); }, [code]);
  useLive('subscribe:station', code, 'arrival', (a) =>
    setRows(prev => [...prev.filter(r => r.trainNo !== a.trainNo), a]
      .sort((x, y) => new Date(x.predictedETA) - new Date(y.predictedETA))));
  // table render karo: trainNo, trainName, predictedETA, predictedDelayMin
}