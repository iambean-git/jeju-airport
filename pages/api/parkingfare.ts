import { NextApiRequest, NextApiResponse } from "next";
import { isHoliday } from "@/app/lib/utils";

async function isWeekendOrHoliday(date: Date): Promise<boolean> {
    const day = date.getDay();
    const holiday = await isHoliday(date);
    // console.log("💡",date,"는 공휴일?", holiday);
    return day === 0 || day === 5 || day === 6 || holiday;
}

function parseDateTime(date: string, time: string): Date {
    const [y, m, d] = date.split('-').map(Number);
    const [hh, mm] = time.split(':').map(Number);
    return new Date(y, m - 1, d, hh, mm);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }
    const { isP2, startDate, startTime, endDate, endTime, carType, discount } = req.body;

    if (!startDate || !startTime || !endDate || !endTime || !carType) {
        return res.status(400).json({ message: '입력값이 부족합니다.' });
    }

    const entry = parseDateTime(startDate, startTime);
    const exit = parseDateTime(endDate, endTime);

    const durationMs = exit.getTime() - entry.getTime();
    if (durationMs <= 10 * 60 * 1000) return res.json({ fare: 0 }); // 10분 무료

    const baseRate = carType === '소형' ? 600 : 800;        // 기본요금
    const unitTime = carType === '소형' ? 10 : 15;          // 추가요금 시간 단위
    const unitRate = carType === '소형' ? 200 : 400;        // 추가요금
    const weekdayCap = carType === '소형'                   // 주중 1일 최대 요금
    ? (isP2 ? 8000 : 10000)
    : (isP2 ? 12800 : 16000);
    const weekendCap = carType === '소형'                   // 주말(공휴일) 1일 최대 요금
    ? (isP2 ? 12000 : 15000)
    : (isP2 ? 19200 : 24000);

    const totalHours = durationMs / (1000 * 60 * 60);
    const totalDays = Math.floor(totalHours / 24);
    const remainingMs = durationMs - totalDays * 24 * 60 * 60 * 1000;
    const remainingMinutes = Math.ceil(remainingMs / (1000 * 60));

    let totalFee = 0;

    for (let i = 0; i < totalDays; i++) {
        const day = new Date(entry.getTime() + i * 24 * 60 * 60 * 1000);
        totalFee += await isWeekendOrHoliday(day) ? weekendCap : weekdayCap;
    }

    if (remainingMinutes > 0) {
        const lastDate = new Date(exit.getTime() - remainingMs);
        const isWeekend = await isWeekendOrHoliday(lastDate);
        const cap = isWeekend ? weekendCap : weekdayCap;

        if (remainingMinutes <= 30) {
            totalFee += baseRate;
        } else {
            const extraMinutes = remainingMinutes - 30;
            const units = Math.ceil(extraMinutes / unitTime);
            const subTotal = baseRate + units * unitRate;
            totalFee += Math.min(subTotal, cap);
        }
    }

    totalFee = totalFee * ((100-parseInt(discount))/100)        //할인 적용
    return res.json({ fare: totalFee });

}