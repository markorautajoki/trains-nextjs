import { getStationsMetadata as getStationsMetadataFromApi } from '../../integration/avoindata_api';
import { getCacheItem, setCacheItem } from '../../cache';

const STATIONS_METADATA_CACHE_KEY = 'STATIONS_METADATA_CACHE_KEY';
const STATION_NAME_PART_TO_REMOVE = ' asema';

const getStationsMetadata = async () => {
  let stationsMetatada = await getCacheItem(STATIONS_METADATA_CACHE_KEY);

  if (!stationsMetatada) {
    stationsMetatada = await getStationsMetadataFromApi();

    await setCacheItem(STATIONS_METADATA_CACHE_KEY, stationsMetatada);
  }

  return stationsMetatada;
};

export const getStationsList = async () => {
  const stationsMetadata = await getStationsMetadata();

  return stationsMetadata.map(({ stationShortCode, stationName }) => ({ stationShortCode, stationName: stationName.replace(STATION_NAME_PART_TO_REMOVE, '') }));
};
