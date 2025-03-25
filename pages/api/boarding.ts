import { NextApiRequest, NextApiResponse } from "next";
import { BoardingTimeTotal, BoardingTime, BoardingCongestion } from "@/app/lib/definition";

interface boardinginfo {
  total: BoardingTimeTotal,
  boardingTime: BoardingTime,
  boardingCongestion: BoardingCongestion,
  available: boolean
}

// const congestionLevel = { 1:"여유", 2:"보통", 3:"혼잡", 4:"매우혼잡"} //1:원활 , 2:보통, 3:혼잡, 4:매우혼잡
const congestionLevel = ["", "여유", "보통", "혼잡", "매우혼잡"]; //1:원활 , 2:보통, 3:혼잡, 4:매우혼잡

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const now = new Date();
  const nowInKST = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Seoul" }));

  const hours = nowInKST.getHours();
  const minutes = nowInKST.getMinutes();
  const currentTime = hours * 100 + minutes; // 시간을 HHMM 형식으로 변환

  // 21:30 ~ 06:30 사이인지 확인
  const isDataUnavailable = (currentTime >= 2130 || currentTime <= 630);

  if (isDataUnavailable) {
    // 데이터가 제공되지 않는 시간대일 경우 기본값 반환
    const unavailableData: boardinginfo = {
      total: {
        PRC_HR: "데이터 없음",
        timeall: -1
      },
      boardingTime: [
        { time: 0 },
        { time: 0 },
        { time: 0 },
        { time: 0 },
      ],
      boardingCongestion: [
        { id: 1, status: "정보 없음" },
        { id: 2, status: "정보 없음" },
        { id: 3, status: "정보 없음" },
      ],
      available: false
    };

    return res.status(200).json({
      ...unavailableData,
      message: "현재 시간(21:30~06:30)에는 데이터가 제공되지 않습니다.",
    });
  }

  else {
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
        ],
        available: true
      }

      res.status(200).json(boardingData);
    } catch (error) {
      console.error("fetch BoardingTime Error:", error);
      res.status(500).json({ error: "Failed to fetch the BoardingTime data." });
    }
  }

}
