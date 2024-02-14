'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

export default function Requests() {
    const [reqsData, setReqsData] = useState<any>(null);
    const [loading, setLoading] = useState<any>(true);

    useEffect(() => {
        const checkReq = async () => {
            try {
                const response = await fetch('/api/requests/getRequests')
                const result = await response.json()
                setReqsData(result.requests)
            } catch (error) {
                
            } finally {
                setLoading(false);
            }
        }
        checkReq()
    }, [])

    useEffect(() => {
        console.log(reqsData)
    }, [reqsData]);
  return (
    <>
        {loading && <p>Loading Requests...</p>}
        {!loading && (!reqsData || reqsData.length === 0) && (
            <div>
                <h1 className='flex text-3xl mb-11 justify-center mt-3'>Requests/Messages</h1>
                <h1 className='flex text-2xl justify-center'>
                    No Requests as of now...
                </h1>
            </div>
        )}
        {!loading && reqsData && reqsData.length > 0 &&(
            <>
            <div>
                <h1 className='flex text-3xl mb-11 justify-center mt-3'>Requests/Messages</h1>
            </div>
            <ul>
                {reqsData.map((reqs: any) => (
                    <div key={reqs.req_id}>
                        {reqs.status === 0 && (
                        <Link href={`/user/messageDetails?req_id=${encodeURIComponent(reqs.req_id)}`}>
                            <div className='bg-synchGray-50 rounded-lg py-3 px-2 mb-2'>
                            {reqs.sent_from} - {reqs.team_id} 
                            </div>
                        </Link>
                        )}
                    </div>
                ))}
            </ul>
            </>
        )}
    </>
  )
}
