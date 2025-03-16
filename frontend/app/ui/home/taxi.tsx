import  fetchTaxi  from "../../lib/data";
import { FaTaxi } from "react-icons/fa";

export default async function Taxi() {
    const { witTaxiCT, witPaxCT, xptBdgMi } = await fetchTaxi();
  return (
    <div className='w-full'>
      <div>대기 택시 수 : {witTaxiCT} </div>
      <div>대기 승객 수 : {witPaxCT} </div>
      <div>예상 탑승 대기 시간 : {xptBdgMi} 분</div>
    </div>
  )
}
