
export function TaxiSkeleton() {
    return (
        <div>
            택시 로딩중...
        </div>
    );
}

export function ParkingSkeleton() {
    // 로딩 중에 표시할 가상 주차장 아이템 개수 (실제 데이터와 비슷하게 3개로 설정)
    const skeletonItems = [1, 2, 3];
  
    return (
      <div className='w-full flex flex-col md:flex-row p-5 gap-5'>
        <div className='w-full md:w-1/2 border rounded-lg border-gray-300 p-5 md:p-10 flex flex-col'>
          <h1 className='w-full text-2xl font-bold'>주차 현황</h1>
          {skeletonItems.map((item) => (
            <div key={item} className='mt-10'>
              {/* 제목과 주차 가능 대수 스켈레톤 */}
              <div className='font-semibold mb-3 bg-gray-200 animate-pulse h-6 w-2/3 rounded'></div>
              
              {/* 상태 바 스켈레톤 */}
              <div className='grid grid-cols-3 gap-5 lg:gap-10'>
                <div className='h-2 md:h-3 bg-gray-200 animate-pulse'></div>
                <div className='h-2 md:h-3 bg-gray-200 animate-pulse'></div>
                <div className='h-2 md:h-3 bg-gray-200 animate-pulse'></div>
              </div>
              
              {/* 상태 텍스트 스켈레톤 */}
              <div className='grid grid-cols-3 gap-5 lg:gap-10 mt-1'>
                <div className='text-center bg-gray-200 animate-pulse h-5 rounded'></div>
                <div className='text-center bg-gray-200 animate-pulse h-5 rounded'></div>
                <div className='text-center bg-gray-200 animate-pulse h-5 rounded'></div>
              </div>
            </div>
          ))}
        </div>
        <div className='w-full md:w-1/2 border rounded-lg border-gray-300 p-5 md:p-10 flex flex-col'>
          <h1 className='w-full text-2xl font-bold'>예상 주차요금 조회</h1>
          {/* 예상 주차요금 조회 영역 스켈레톤 (현재 실제 구현은 없지만 공간만 확보) */}
          <div className='mt-10 h-48 bg-gray-200 animate-pulse rounded'></div>
        </div>
      </div>
    );
  }