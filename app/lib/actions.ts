'use server';

export async function calculateParkingfare(formData: FormData): Promise<number> {
    console.log("✅ 주차장 이름 : ", formData.get('parkinglotName'));
    console.log("✅ 차종류 : ", formData.get('carType'));
    console.log("✅ 할인 : ", formData.get('discount'));
    console.log("✅ 입차날짜 : ", formData.get('startDate'));
    console.log("✅ 입차시간 : ", formData.get('startTime'));
    console.log("✅ 출차날짜 : ", formData.get('endDate'));
    console.log("✅ 출차시간 : ", formData.get('endTime'));

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    console.log("✅ baseUrl : ", baseUrl);

    if (!baseUrl) throw new Error('BASE_URL이 설정되지 않았습니다.');

    const payload = {
        isP2 : formData.get('startDate') === "P2" ? true : false,
        startDate: formData.get('startDate'),
        startTime: formData.get('startTime'),
        endDate: formData.get('endDate'),
        endTime: formData.get('endTime'),
        carType: formData.get('carType'),
        discount: formData.get('discount'),
    };
    const res = await fetch(`${baseUrl}/api/parkingfare`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || '요금 계산 실패');
    }

    const data = await res.json();
    return data.fare;
}