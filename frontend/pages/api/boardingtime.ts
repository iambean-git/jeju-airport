import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const url = `${process.env.DATA_BOARDING_TIME_URL}?serviceKey=${process.env.DATA_KEY}&pageNo=1&numOfRows=10`;
    console.log("🔗BoardingTime Fetching from:", url);

    const resp = await fetch(url);



    // res.status(200).json(taxiData);
  } catch (error) {
    console.error("fetchTaxi Error:", error);
    res.status(500).json({ error: "Failed to fetch the Taxi data." });
  }
}
