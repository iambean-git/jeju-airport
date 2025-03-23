import { parseStringPromise } from "xml2js";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const url = `${process.env.DATA_TAXI_URL}?serviceKey=${process.env.DATA_KEY}&pageNo=1&numOfRows=10`;
    console.log("Fetching from:", url);

    const resp = await fetch(url);
    const textData = await resp.text(); // XML 데이터를 텍스트로 가져오기
    const jsonData = await parseStringPromise(textData, { explicitArray: false });

    const data = jsonData.response.body.items.item;
    const taxiData = {
      witTaxiCT: data.witTaxiCT, // 대기 택시 수
      witPaxCT: data.witPaxCT, // 대기 승객 수
      xptBdgMi: data.xptBdgMi, // 예상 탑승 대기 시간
    };

    res.status(200).json(taxiData);
  } catch (error) {
    console.error("fetchTaxi Error:", error);
    res.status(500).json({ error: "Failed to fetch the Taxi data." });
  }
}
