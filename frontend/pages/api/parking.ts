import { parseStringPromise } from "xml2js";
import { NextApiRequest, NextApiResponse } from "next";

// fetch 반환 타입
interface ParkingDataItem {
    airportEng: string;
    airportKor: string;
    parkingAirportCodeName: string;
    parkingCongestion: string;
    parkingCongestionDegree: string;
    parkingOccupiedSpace: string;
    parkingTotalSpace: string;
    sysGetdate: string;
    sysGettime: string;
}

// 반환해줄 데이터 타입
interface ResultItem {
    name : string;
    congestion: string;
    available: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const url = `${process.env.DATA_PARKING_URL}?serviceKey=${process.env.DATA_KEY}&pageNo=1&numOfRows=10&schAirportCode=CJU`;
        console.log("🔗Parking Info Fetching from:", url);

        const resp = await fetch(url);
        const textData = await resp.text(); // XML 데이터를 텍스트로 가져오기
        const jsonData = await parseStringPromise(textData, { explicitArray: false });

        // console.log("✅jsonData", jsonData);
        const data = jsonData.response.body.items.item;

        // console.log("✅ Parking Data", data);
        res.status(200);
        const ParkingData: ResultItem[] = data.map((item: ParkingDataItem) => ({
            name : item.parkingAirportCodeName,
            congestion : item.parkingCongestion,
            available : parseInt(item.parkingTotalSpace) - parseInt(item.parkingOccupiedSpace)
          }));

        res.status(200).json(ParkingData);

    } catch (error) {
        console.error("fetch Parking Error:", error);
        res.status(500).json({ error: "Failed to fetch the Parking data." });
    }
}