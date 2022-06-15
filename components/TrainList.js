import React from 'react';
import moment from 'moment';
import styles from './TrainList.module.css';

const TIME_FORMAT = 'HH:mm';

export const trainListType = {
  ARRIVAL: 'ARRIVAL',
  DEPARTURE: 'DEPARTURE'
};

const renderActualTime = (train, className) =>
  <span className={className}>{moment(train.actualTime).format(TIME_FORMAT)}</span>;

const renderActualTimeIfNeeded = (train) => {

  if (train.differenceInMinutes < 0 ) {
    return renderActualTime(train, styles.early);
  } else if (train.differenceInMinutes > 0) {
    return renderActualTime(train, styles.late);
  }
  return null;
};

const renderTrainListEntry = (train, type) => (
  <li className={styles.row} key={train.trainNumber}>
    <div>{ train.trainType } { train.trainNumber }</div>
    <div>{ moment(train.scheduledTime).format(TIME_FORMAT) }</div>
    <div>{ renderActualTimeIfNeeded(train) }</div>
    <div>{ type === trainListType.ARRIVAL ? train.departureStation : train.destinationStation }</div>
  </li>
);

const TrainList = ({ title, trains, type }) => (
  <div className={styles.container}>
    <h2 className={styles.title}>{ title }</h2>
    <ul className={styles.list}>
      { trains.map(train => renderTrainListEntry(train, type)) }
    </ul>
  </div>
);

export default TrainList;

