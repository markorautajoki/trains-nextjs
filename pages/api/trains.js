import { getTrainsForStation } from '../../service/trains'

const handler = async (req, res) => {
  res.json(await getTrainsForStation(req.query.station, req.query.category));
}

export default handler;