import React, { useEffect, useState } from 'react';

import TrainList, { trainListType } from '../components/TrainList';

import { getStationsList } from '../service/stations';
const DEFAULT_STATION = 'TPE';

const App = ({ stations }) => {
  const [selectedStation, setSelectedStation] = useState(DEFAULT_STATION);
  const [arriving, setArriving] = useState([]);
  const [departing, setDeparting] = useState([]);

  useEffect(() => {
    updateArrivingAndDeparting(selectedStation);
  }, []);

  const onStationChange = async (e) => {
    const selectedStation = e.target.value;

    setSelectedStation(selectedStation);

    await updateArrivingAndDeparting(selectedStation);
  };

  const renderStationSelectorOption = ({ stationShortCode, stationName }) => {
    return (
      <option key={stationShortCode} value={stationShortCode}>
        {stationName}
      </option>
    );
  };

  const renderStationSelector = (stations, selectedStation) => {
    return (
      <select value={selectedStation} onChange={onStationChange}>
        {stations.map((station) => renderStationSelectorOption(station, selectedStation))}
      </select>
    );
  };

  const updateArrivingAndDeparting = async (selectedStation) => {
    console.log(selectedStation);
    const { arriving, departing } = await fetch(`api/trains?station=${selectedStation}&category=Long-distance`).then((res) => res.json());
    setArriving(arriving);
    setDeparting(departing);
  };

  return (
    <div>
      <div className="stationSelectorContainer">Asema: {renderStationSelector(stations, selectedStation)}</div>
      <div className="mainContainer">
        <TrainList trains={arriving} title="Saapuvat kaukojunat" type={trainListType.ARRIVAL} />
        <TrainList trains={departing} title="Lähtevät kaukojunat" type={trainListType.DEPARTURE} />
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const stations = await getStationsList();

  return { props: { stations } };
};

export default App;
