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