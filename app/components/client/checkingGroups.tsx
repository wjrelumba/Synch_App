  'use client';
  import Link from 'next/link';
  import React, { useState, useEffect } from 'react';
  import { toast } from 'react-toastify';

  type UserData = {
    user_id: string;
  };

  export default function CheckingGroups() {
    const [groupsData, setGroupsData] = useState<any>(null);
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const cookieResponse = await fetch('/api/cookieChecker');
          const cookieValue = await cookieResponse.json();
          const dataToSend: UserData = {
            user_id: cookieValue,
          };

          const response = await fetch('/api/getGroups', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
          });

          if (response.ok) {
            const result = await response.json();
            if(result.groupData !== undefined && result.userData !== undefined){
              setGroupsData(result.groupData);
              setUserData(result.userData)
            }
            if(result.message !== undefined){
              toast.error(result.message)
            }
          } else {
            console.error('Error:', response.status, response.statusText);
          }
        } catch (error) {
          console.error('Fetch error:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, []);

    return (
      <div>
        {loading && (
          <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-4xl text-center mb-8">Data Loading</h1>
          </div>
        )}
        {!loading && !groupsData && !userData && (
          <>
            <h1>You do not have access to this content.</h1>
          </>
        )}
        {!loading && (!groupsData || groupsData.length === 0) && userData && (
          <div>
            <h1 className='text-3xl font-serif justify-center'>Welcome, {userData[0].name}!</h1>
            <h1 className='text-xl font-serif'>No Groups joined...</h1>
          </div>
        )}
        {!loading && groupsData && groupsData.length > 0 && (
          <>
            <div>
              <h1 className='flex text-3xl font-serif ml-3 mb-11 mt-1 justify-start'>Welcome, {userData[0].name}!</h1>
              <ul className="flex flex-wrap justify-center">
                  {groupsData.map((group: any) => (
                      <Link key={group.team_id} href={`/team-group?data=${encodeURIComponent(group.team_id)}`}>
                          <div className= 'bg-synchBlue-50 rounded-lg p-5 border-black mb-5 mr-5 inline-block hover:bg-synchBlue-100 font-mono h-[5rem] w-[20rem]'>
                              <li className="flex justify-center items-center font-mono whitespace-normal">{group.team_name}</li>
                          </div>
                      </Link>
                  ))}
              </ul>
            </div>
          </>
        )}
      </div>
    );
  }
