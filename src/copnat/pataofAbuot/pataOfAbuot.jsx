import React from 'react';
// Icons aur Recharts import kiye hain
import { Activity, Heart, Brain, Download } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';

// Component ka naam Capital kiya aur Props sahi se destructure kiye
const PataOfAbuot = ({ WeightRateData, heartRateData, minheartRateData, maxheartRateData }) => {
    return (
        <>
            <div>
                <h3 className="font-bold text-lg mb-6">Health systems & general overview</h3>
                <div className="space-y-5">

                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                            <Activity size={18} />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium mb-1">Endocrine system</p>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div className="bg-[#EED564] h-3 rounded-full" style={{ width: '83%' }}></div>
                            </div>
                        </div>
                        <div className="w-16 text-right"><span className="text-xl font-bold">8.3</span> <span className="text-xs text-gray-500">of 10</span></div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-500">
                            <Heart size={18} />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium mb-1">Cardiovascular system</p>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div className="bg-[#F4A7C8] h-3 rounded-full" style={{ width: '87%' }}></div>
                            </div>
                        </div>
                        <div className="w-16 text-right"><span className="text-xl font-bold">8.7</span> <span className="text-xs text-gray-500">of 10</span></div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                            <Brain size={18} />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium mb-1">Nervous system</p>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div className="bg-[#A4C3F4] h-3 rounded-full" style={{ width: '90%' }}></div>
                            </div>
                        </div>
                        <div className="w-16 text-right"><span className="text-xl font-bold">9.0</span> <span className="text-xs text-gray-500">of 10</span></div>
                    </div>
                </div>
            </div>

            <div>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg">Heart rate data</h3>
                    <select className="bg-black text-white text-xs px-4 py-2 rounded-full"><option>This week</option></select>
                </div>
                <div className="h-48 w-full mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={heartRateData}>
                            <XAxis dataKey="name" stroke="#A0A0A0" fontSize={12} tickLine={true} axisLine={true} />
                            <YAxis stroke="#A0A0A0" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                            <Line type="monotone" dataKey="bpm" stroke="#1A1A1A" strokeWidth={3} dot={{ r: 4, fill: '#1A1A1A' }} activeDot={{ r: 6, fill: '#000' }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="flex gap-6 mt-2 text-sm">
                    <div><span className="font-bold text-lg">{minheartRateData}</span> bpm <br /><span className="text-xs text-gray-500">AVERAGE</span></div>
                    <div><span className="font-bold text-lg">{maxheartRateData}</span> bpm <br /><span className="text-xs text-gray-500">MAXIMUM</span></div>
                </div>
            </div>
        </>
    )
}

export default PataOfAbuot;