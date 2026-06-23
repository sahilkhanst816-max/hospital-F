import React, { useEffect, useState } from 'react';
import { ChevronLeft, FileText, Download, MoreVertical, Activity, Heart, Brain, Wind } from 'lucide-react';
// import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

import PataOfAbuot from '../copnat/pataofAbuot/pataOfAbuot';
import Pata2 from '../copnat/pataofAbuot/pata2';
import StepGoogle from '../copnat/google/stepgoogle'
// 1. useNavigate ki jagah useLocation import karo
import { useLocation } from 'react-router';
import DashoardVisitDetails from '../copnat/pataofAbuot/DashoardVisitDetails';



const About = () => {
  const [userdata, setuserdata] = useState({});
  const [activeTab, setActiveTab] = useState('clinical');

  const nodata = 'NO - data';

  // 2. useLocation ka instance banao
  const location = useLocation();

  useEffect(() => {
    try {
      const user = localStorage.getItem("userData");
      console.log(user)
      if (user) {
        const parsedData = JSON.parse(user);
        if (parsedData.user) {
          setuserdata(parsedData.user);
          console.log('hufwodn')
        } else {
          setuserdata(parsedData);
          console.log('sahhi')
        }
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }, []);

  const latestRoutine = userdata?.dailyRoutine && userdata.dailyRoutine.length > 0
    ? userdata.dailyRoutine[userdata.dailyRoutine.length - 1]
    : null;

  const heartRateData = userdata?.dailyRoutine?.map((routine) => {
    return {
      name: routine.checkupTime ? routine.checkupTime.slice(11, 19) : '',
      bpm: routine.heartBeat || 0
    };
  }) || [];

  const WeightRateData = userdata?.dailyRoutine?.map((emle, idx) => {
    return {
      name: emle.checkupTime ? emle.checkupTime.slice(11, 16) : `Visit ${idx + 1}`,
      weight: emle.weight
    };
  }) || [];

  const bpmsArray = heartRateData.map(item => item.bpm);
  const minheartRateData = bpmsArray.length > 0 ? Math.min(...bpmsArray) : 0;
  const maxheartRateData = bpmsArray.length > 0 ? Math.max(...bpmsArray) : 0;

  const patientWeight = latestRoutine?.weight || null;
  console.log(patientWeight)
  
  
    
  return (
    <div className="min-h-screen bg-[#FDFBF7] p-4 md:p-8 font-sans text-gray-800">

      {/* --- BREADCRUMBS --- */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">

          <span className="text-black font-semibold">{userdata?.name ? userdata.name : nodata}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        <div className="lg:col-span-4 xl:col-span-3 space-y-6 lg:sticky lg:top-8 lg:h-fit ">

          <div className="flex gap-4 items-center bg-white p-4 rounded-3xl shadow-sm border border-gray-100">
            <img src='' alt="Patient" className="w-20 h-20 rounded-2xl object-cover shadow-sm" />
            <div>
              <h1 className="text-2xl font-bold leading-tight mb-1 text-gray-900">
                {userdata?.name || "Patient Name"}
              </h1>
              <p className="text-xs text-gray-500 font-medium">57685-LK • 11H - Follow up - 09:15</p>
            </div>
          </div>

          {/* Info Card */}
          <div className="bg-[#EAE4D3] rounded-3xl overflow-hidden shadow-sm text-sm transition-all hover:shadow-md">
            <div className="bg-[#A4B476] text-white p-4 flex justify-between items-center font-medium">
              <span>1EG4-TE5-MK72 </span>
              <span>{userdata.createdAt?.slice(0, 10) ? userdata.createdAt?.slice(0, 10) : nodata}</span>
            </div>
            <div className="p-5 space-y-3 bg-white/40 backdrop-blur-sm">
              <p className="flex justify-between"><span className="text-gray-500 font-medium">Gender:</span> <span className="font-semibold text-gray-800">{userdata?.gender || nodata}</span></p>
              <p className="flex justify-between"><span className="text-gray-500 font-medium">Date of birth:</span> <span className="font-semibold text-gray-800">{userdata?.age || nodata}</span></p>
              <p className="flex justify-between"><span className="text-gray-500 font-medium">Phone number:</span> <span className="font-semibold text-gray-800">{userdata?.phone || nodata}</span></p>
              <p className="flex justify-between items-center"><span className="text-gray-500 font-medium">E-mail:</span> <span className="font-semibold text-gray-800 truncate max-w-[120px]" title={userdata?.email}>{userdata?.email || nodata}</span></p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg text-gray-800">Allergies</h3>
              {latestRoutine?.allergies?.length > 0 && (
                <span className="text-xs text-red-600 bg-red-100 px-3 py-1 rounded-full font-semibold">
                  ● {latestRoutine.allergies.length} alerts
                </span>
              )}
            </div>

            {latestRoutine?.allergies?.length > 0 ? (
              <div className="flex gap-4">
                <div className="flex-1 bg-yellow-50/80 p-4 rounded-2xl border border-yellow-200">
                  <p className="font-semibold text-sm mb-3 text-gray-800">🧀 Food</p>
                  <div className="text-xs space-y-3">
                    {latestRoutine.allergies.map((allergy, index) => (
                      <div key={index} className="flex justify-between items-center border-b border-yellow-100/50 pb-2 last:border-0 last:pb-0">
                        <span className="text-gray-600 uppercase font-medium">{allergy.food}</span>
                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${allergy.alerts === 'OK' ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                          {allergy.alerts}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-400 italic">No allergies recorded.</p>
            )}
          </div>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="lg:col-span-8 xl:col-span-9 bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100 space-y-8">

          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">11H-Emergency visit</h1>
            <span className="bg-gray-900 text-white text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-2 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              In progress 02:15
            </span>
          </div>

          {/* Tabs */}
          <div className="flex gap-8 border-b border-gray-100 text-sm font-semibold">
            <button
              onClick={() => setActiveTab('clinical')}
              className={`pb-3 px-1 transition-all duration-300 relative ${activeTab === 'clinical'
                ? 'text-gray-900'
                : 'text-gray-400 hover:text-gray-600'
                }`}
            >
              Clinical history
              {activeTab === 'clinical' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900 rounded-t-md"></span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('visit')}
              className={`pb-3 px-1 transition-all duration-300 relative ${activeTab === 'visit'
                ? 'text-gray-900'
                : 'text-gray-400 hover:text-gray-600'
                }`}
            >
              Visit Details
              {activeTab === 'visit' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900 rounded-t-md"></span>
              )}
            </button>
          </div>


          {location.pathname === "/Dashboard/Clinicalhistory" && (
            <div className="min-h-[400px] animate-in fade-in duration-500">
              {activeTab === 'clinical' ? (
                <div className="space-y-6">
                  <PataOfAbuot
                    heartRateData={heartRateData}
                    minheartRateData={minheartRateData}
                    maxheartRateData={maxheartRateData}
                  />
                  <Pata2 patientWeight={WeightRateData} />
                </div>
              ) : (
                <div className="w-full h-full">
                  <StepGoogle />
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default About;