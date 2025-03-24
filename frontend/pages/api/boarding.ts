import { NextApiRequest, NextApiResponse } from "next";
import { BoardingTimeTotal, BoardingTime, BoardingCongestion } from "@/app/lib/definition";

interface boardinginfo {
  total: BoardingTimeTotal,
  boardingTime: BoardingTime,
  boardingCongestion: BoardingCongestion
}

// const congestionLevel = { 1:"여유", 2:"보통", 3:"혼잡", 4:"매우혼잡잡"} //1:원활 , 2:보통, 3:혼잡, 4:매우혼잡
const congestionLevel =  ["", "여유", "보통", "혼잡", "매우혼잡"]; //1:원활 , 2:보통, 3:혼잡, 4:매우혼잡

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const url = `${process.env.DATA_BOARDING_TIME_URL}serviceKey=${process.env.DATA_KEY_DECODING}`;
    const url2 = `${process.env.DATA_BOARDING_CONGESTION_URL}serviceKey=${process.env.DATA_KEY_DECODING}`;
    // console.log("🔗 Boarding Time Fetching from:", url);
    // console.log("🔗 Boarding Congestion Fetching from:", url2);

    const resp = await fetch(url);
    const data = await resp.json();
    // console.log("✅ BoardingTime data", data);

    const resp2 = await fetch(url2);
    const data2 = await resp2.json();
    // console.log("✅ BoardingTime data", data2);

    const boardingData: boardinginfo = {
      total: {
        PRC_HR: data.data[0].PRC_HR,
        timeall: Math.round(data.data[0].STY_TCT_AVG_ALL / 60)
      },
      boardingTime: [
        { time: Math.round(data.data[0].STY_TCT_AVG_A / 60) },
        { time: Math.round(data.data[0].STY_TCT_AVG_B / 60) },
        { time: Math.round(data.data[0].STY_TCT_AVG_C / 60) },
        { time: Math.round(data.data[0].STY_TCT_AVG_D / 60) },
      ],
    
      boardingCongestion: [
        { id: 1, status: congestionLevel[data2.data[0].CGDR_A_LVL] },
        { id: 2, status: congestionLevel[data2.data[0].CGDR_B_LVL] },
        { id: 3, status: congestionLevel[data2.data[0].CGDR_C_LVL] },
      ]
    }

    res.status(200).json(boardingData);
  } catch (error) {
    console.error("fetch BoardingTime Error:", error);
    res.status(500).json({ error: "Failed to fetch the BoardingTime data." });
  }
}
