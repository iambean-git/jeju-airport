import { parseStringPromise } from "xml2js";

export default async function fetchTaxi() {
    try {
        const url = `${process.env.DATA_TAXI_URL}?serviceKey=${process.env.DATA_KEY}&pageNo=1&numOfRows=10`;
        // console.log("serviceKey : " + process.env.DATA_KEY);
        console.log("url : " + url);
        // API 요청
        const resp = await fetch(url);
        const textData = await resp.text(); // XML 데이터를 텍스트로 가져오기
        // console.log("Raw XML Data:", textData); // 원본 XML 로그

        // XML → JSON 변환
        const jsonData = await parseStringPromise(textData, { explicitArray: false });
        console.log("✅Parsed JSON Data:", JSON.stringify(jsonData, null, 2));

        const data = jsonData.response.body.items.item;
        const witTaxiCT = data.witTaxiCT;     // 대기 택시 수
        const witPaxCT = data.witPaxCT;     // 대기 승객 수
        const xptBdgMi = data.xptBdgMi;     // 예상 탑승 대기 시간

        console.log("💡 대기 택시 수 : " + witTaxiCT);
        console.log("💡 대기 승객 수 : " + witPaxCT);
        console.log("💡 예상 탑승 대기 시간 : " + xptBdgMi);
        
        return { witTaxiCT, witPaxCT, xptBdgMi };

    } catch (error) {
        console.error("fetchTaxi Error : ", error);
        throw new Error('Failed to fetch the Taxi data.');
    }
}
