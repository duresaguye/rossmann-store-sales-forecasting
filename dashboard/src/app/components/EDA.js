import React from 'react'
import Image from 'next/image'

function EDA() {
  return (
    <> 
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
    <h2 className="text-2xl font-bold mb-4">Customer Behavior Insights</h2>

    <div className="mb-6">
      <h3 className="text-xl font-semibold">1. Promo Impact</h3>
  
      <div className="mt-4">
        <Image src="/effectofpromo.png" alt="Promo Impact Chart" width={600} height={400} />
      </div>
    </div>

    <div className="mb-6">
      <h3 className="text-xl font-semibold">2. Sales During Holidays</h3>
   
   
      <div className="mt-4">
        <Image src="/sales.png" alt="Holiday Sales Trend" width={600} height={400} />
      </div>
    </div>

    <div className="mb-6">
      <h3 className="text-xl font-semibold">3. Store Type Impact</h3>
 
    
      <div className="mt-4">
        <Image src="/assortment.png" alt="Store Type Impact" width={600} height={400} />
      </div>
    </div>

    <div className="mb-6">
      <h3 className="text-xl font-semibold">4. Competitor Distance Effect and promo effect</h3>
 
      <div className="mt-4 flex">
       
        <Image src="/Distance.png" alt="Competitor Distance Effect" width={600} height={400} />
      </div>
    </div>

    <div className="mb-6">
      <h3 className="text-xl font-semibold">5. Customer Trends</h3>
     
     
      <div className="mt-4 flex ">
        <Image src="/salesonweekends.png" alt="Customer Trends Chart" width={600} height={400} />
        <Image src="/seasonal.png" alt="Customer Trends Chart" width={600} height={400} />
      </div>
    </div>

    <div className="mb-6 flex flex-col items-center justify-center">
      <h3 className="text-xl font-semibold">True vs Predicted Sales</h3>
      <div className="mt-4 flex">
       
        <Image src="/trueVSpredicatedSales.png" alt="Competitor Distance Effect" width={600} height={400} />
      </div>
    </div>
  </div>
</>

  )
}

export default EDA