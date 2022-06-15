import moment from 'moment';

import { getLiveTrains } from '../../integration/avoindata_api';
import { getStationsList } from '../stations';

const TYPE_DEPARTURE = "DEPARTURE";
const TYPE_ARRIVAL = "ARRIVAL";

const findTimeTableRowOfTypeForStation = (type, station, timeTableRows) =>
  timeTableRows.find(entry => entry.type === type && entry.stationShortCode === station);

const getTrainsForStationForType = (type, station, trains, stations) =>
  trains.reduce((trains, train) => {
    const { trainNumber, trainType, timeTableRows } = train;
    const timeTableRow = findTimeTableRowOfTypeForStation(type, station, timeTableRows);

    const departureStation = timeTableRows.length ?
      getStationName(timeTableRows[0].stationShortCode, stations) : undefined;

    const destinationStation = timeTableRows.length ?
      getStationName(timeTableRows[timeTableRows.length - 1].stationShortCode, stations) : undefined;

    if (timeTableRow) {
      const {scheduledTime, actualTime, differenceInMinutes} = timeTableRow;

      return [
        ...trains,
        {
          trainType,
          trainNumber,
          scheduledTime,
          actualTime,
          differenceInMinutes,
          departureStation,
          destinationStation
        }]
    }

    return trains;
  }, []);

const getStationName = (stationShortCode, stations) => {
  const station = stations.find(s => stationShortCode === s.stationShortCode);

  return station ? station.stationName : undefined;
}

const sortByActualTime = (a, b) => moment(a.scheduledTime).diff(moment(b.scheduledTime));

export const getTrainsForStation = async (station, category) => {
  const trains = await getLiveTrains(station);
  const stations = await getStationsList();

  const trainsOfCategory = trains.filter(train => category === train.trainCategory);

  const arriving = getTrainsForStationForType(TYPE_ARRIVAL, station, trainsOfCategory, stations);
  const departing = getTrainsForStationForType(TYPE_DEPARTURE, station, trainsOfCategory, stations);

  arriving.sort(sortByActualTime);
  departing.sort(sortByActualTime);

  return {
    arriving,
    departing
  }
}