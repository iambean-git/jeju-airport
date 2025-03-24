export type BoardingTimeTotal = {
    PRC_HR: string;
    timeall: number;
};

export type BoardingTime = [
    { time: number },
    { time: number },
    { time: number },
    { time: number },
];

export type BoardingCongestion = [
    { id: number, status: string },
    { id: number, status: string },
    { id: number, status: string },
];

export type TaxiWaitingInfo = {
    witTaxiCT: string; // 대기 택시 수
    witPaxCT: string, // 대기 승객 수
    xptBdgMi: string, // 예상 탑승 대기 시간
}