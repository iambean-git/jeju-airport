import taxiCompanyDataFile from "../../data/taxi_company.json";
import { useEffect, useState } from 'react';
import { FaMapLocationDot } from "react-icons/fa6";
import { GoCopy } from "react-icons/go";
import { IoCallOutline } from "react-icons/io5";
interface TaxiInfo {
    지역별: string;
    호출명: string;
    전화번호: string;
    데이터기준일자: string;
}

export default function Taxicompany() {
    const [isMobile, setIsMobile] = useState(false);
    const [selectedRegion, setSelectedRegion] = useState<string>('전체');
    const [copiedNumber, setCopiedNumber] = useState<string | null>(null);
    const taxiData = taxiCompanyDataFile.taxiCompanyData;

    // 모든 지역 목록을 중복 없이 추출
    const regions = Array.from(
        new Set(taxiCompanyDataFile.taxiCompanyData.map(taxi => taxi.지역별))
    ).sort();

    const filteredData = selectedRegion === '전체'
        ? taxiData
        : taxiData.filter(taxi => taxi.지역별 === selectedRegion);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const userAgent = navigator.userAgent.toLowerCase();
            console.log("✅✅✅✅ userAgent : ", userAgent);
            setIsMobile(/iphone|ipod|ipad|android/.test(userAgent));
        }
    }, []);

    const handleCopy = (phoneNumber: string) => {
        navigator.clipboard.writeText(phoneNumber)
            .then(() => {
                setCopiedNumber(phoneNumber);
                // 2초후 리셋
                setTimeout(() => setCopiedNumber(null), 2000);
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    };

    return (
        <div className="w-full">
            <div className="text-xs px-2 py-5 rounded-lg bg-blue-50 mb-5">

                <ul className="list-inside list-disc pl-2 space-y-1 text-gray-800 font-light">
                    <li>대기 시간이 길다면, 내가 가는 지역의 콜택시를 이용해보세요!</li>
                    <li>공항 근처에서 해당 지역으로 돌아가는 택시를 이용하면 미터요금보다 더 저럼하게 이용할 수 있어요</li>
                    <li>콜 택시에 전화해 목적지를 설명하고 예상 요금을 미리 확인하세요</li>
                </ul>

                <div className="flex pl-2 mt-5">
                    <label htmlFor="region-filter" className="mr-2 font-medium flex items-center text-sm text-blue-800">
                        <FaMapLocationDot className="mr-2" />지역 선택
                    </label>
                    <select
                        id="region-filter"
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                        className="px-2 py-1 text-sm w-32 sm:w-48 border border-blue-500 rounded bg-white"
                    >
                        <option value="전체">전체</option>
                        {regions.map(region => (
                            <option key={region} value={region}>{region}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="relative overflow-x-auto">
                {/* 모바일 버전 */}
                {/* ============== onClick 추가하기  ==================*/}
                <div className="grid grid-cols-2 sm:hidden w-full flex-col gap-3">
                    {filteredData.map((taxi, idx) => (
                        <button className=" border border-gray-300 rounded-lg p-3"
                            key={"btn" + taxi.호출명}>
                            <div className="text-gray-500 text-sm">{taxi.지역별}</div>
                            <div className="text-sm text-blue-600">{taxi.호출명}</div>
                            <div className="font-semibold">{taxi.전화번호}</div>
                        </button>
                    ))}
                </div>
                {/* 테이블 버전 */}
                <table className="hidden sm:table w-full sm:text-sm text-left rtl:text-right text-gray-800 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                        <tr>
                            <th scope="col" className="px-10 py-3">
                                지역별
                            </th>
                            <th scope="col" className="px-6 py-3">
                                호출(콜)택시명
                            </th>
                            <th scope="col" className="px-6 py-3">
                                전화번호
                            </th>
                            <th scope="col" className="py-3">

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((taxi, idx) => (
                            <tr className="bg-white border-b border-gray-200 h-14"
                            key={"tr"+taxi.호출명}>
                                <td scope="row" className="px-10 whitespace-nowrap">
                                    {taxi.지역별}
                                </td>
                                <td className="px-6">
                                    {taxi.호출명}
                                </td>
                                <td className="px-6">
                                    {taxi.전화번호}
                                </td>
                                <td className="h-14 flex justify-center items-center p-2" >
                                    <button
                                        onClick={() => handleCopy(taxi.전화번호)}
                                        className="w-12 sm:w-16 h-full flex justify-center items-center rounded-lg hover:bg-gray-100"
                                        aria-label="Copy phone number"
                                    >
                                        <div className="relative w-full h-full flex justify-center items-center">
                                            <GoCopy
                                                className={`text-center mt-0.5 absolute transition-all duration-300 ease-in-out ${copiedNumber === taxi.전화번호 ? 'opacity-0' : 'opacity-100'
                                                    }`}
                                            />
                                            <span
                                                className={`text-blue-600 absolute transition-all duration-300 ease-in-out ${copiedNumber === taxi.전화번호 ? 'opacity-100' : 'opacity-0'
                                                    }`}
                                            >
                                                Copied!
                                            </span>
                                        </div>
                                    </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}
