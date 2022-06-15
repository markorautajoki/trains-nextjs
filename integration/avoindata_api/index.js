export const API_BASE_URL = 'https://rata.digitraffic.fi/api/v1';

export const getLiveTrains = (station) => fetch(`${API_BASE_URL}/live-trains?station=${station}`).then((res) => res.json());

export const getStationsMetadata = () => fetch(`${API_BASE_URL}/metadata/stations`).then((res) => res.json());
