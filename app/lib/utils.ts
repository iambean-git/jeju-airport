import { parseStringPromise } from "xml2js";

export const TIME_OPTIONS = Array.from({ length: 48 }, (_, i) => {
    const hours = Math.floor(i / 2)
        .toString()
        .padStart(2, "0");
    const minutes = i % 2 === 0 ? "00" : "30";
    return `${hours}:${minutes}`;
});

export const DISCOUNT_TYPES = [
    { value: 0, label: "일반" },
    { value: 20, label: "4.3 사건 유족" },
    { value: 50, label: "저공해 1,2종" },
    { value: 50, label: "다자녀" },
    { value: 50, label: "4.3 생존 희생자" },
    { value: 50, label: "장애인 차량" },
    { value: 50, label: "국가 유공자(상이)" },
    { value: 20, label: "저공해 3종" },
    { value: 50, label: "경차" }

];

const holidayCache: Record<number, string[]> = {};

export async function getHolidaysByYear(year: number): Promise<string[]> {
    if (holidayCache[year]) return holidayCache[year];

    const serviceKey = process.env.DATA_KEY!;
    const url = `https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?solYear=${year}&numOfRows=100&ServiceKey=${serviceKey}`;

    const res = await fetch(url);
    const xml = await res.text();
    const jsonData = await parseStringPromise(xml, { explicitArray: false });
    const items = jsonData.response.body.items.item;

    const dates: string[] = [];

    for (let i = 0; i < items.length; i++) {
        const locdate = items[i].locdate;
        if (locdate) {
            const formatted = locdate.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
            dates.push(formatted);
        }
    }

    holidayCache[year] = dates;
    return dates;
}

export async function isHoliday(date: Date): Promise<boolean> {
    const year = date.getFullYear();
    const dateStr = date.toISOString().split('T')[0];
    const holidays = await getHolidaysByYear(year);
    return holidays.includes(dateStr);
}