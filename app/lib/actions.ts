'use server';

export async function calculateParkingfare(formData : FormData) {
    console.log("✅ 차종류 : ", formData.get('carType'));
    return 10000;
}