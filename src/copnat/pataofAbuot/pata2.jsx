import React from 'react';
import { Download } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from 'recharts';

const Pata2 = ({ patientWeight = [] }) => {
    console.log("Chart Data:", patientWeight);

    return (
        <div className="col-span-3 space-y-8 animate-in fade-in duration-500">
            
            {/* WEIGHT CHART SECTION */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 transition-all hover:shadow-md">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-xl text-gray-900">Weight</h3>
                    <select className="bg-gray-900 hover:bg-gray-800 transition-colors cursor-pointer text-white text-xs px-4 py-2 rounded-full outline-none appearance-none text-center min-w-[80px]">
                        <option>Year</option>
                        <option>Month</option>
                        <option>Week</option>
                    </select>
                </div>
                
                {/* Fixed container issue for Recharts */}
                <div className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={patientWeight} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <XAxis 
                                dataKey="name" 
                                stroke="#A0A0A0" 
                                fontSize={12} 
                                tickLine={false} 
                                axisLine={false} 
                                dy={10} 
                            />
                            <Tooltip 
                                cursor={{ fill: '#f3f4f6' }}
                                contentStyle={{ 
                                    borderRadius: '12px', 
                                    border: 'none', 
                                    boxShadow: '0 4px 15px -3px rgb(0 0 0 / 0.1)' 
                                }} 
                            />
                            <Bar 
                                dataKey="weight" 
                                radius={[6, 6, 6, 6]} 
                                barSize={28} 
                                fill="#1A1A1A" 
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* RECENT DOCUMENTS SECTION */}
            <div>
                <div className="flex justify-between items-center mb-4 px-1">
                    <h3 className="font-bold text-lg text-gray-900">Recent documents</h3>
                    <span className="bg-gray-900 text-white text-xs font-bold w-6 h-6 rounded-full flex justify-center items-center shadow-sm">
                        2
                    </span>
                </div>
                <div className="space-y-3">
                    {/* Document Item with Hover Effect */}
                    <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all cursor-pointer group">
                        <div className="bg-red-50 text-red-500 group-hover:bg-red-500 group-hover:text-white transition-colors p-3 rounded-xl text-xs font-bold tracking-wider">
                            PDF
                        </div>
                        <div className="flex-1">
                            <p className="text-[15px] font-semibold text-gray-800">Medical Prescription</p>
                            <p className="text-xs text-gray-500 mt-0.5">Added today</p>
                        </div>
                        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <Download size={18} className="text-gray-400 group-hover:text-gray-900" />
                        </button>
                    </div>
                </div>
            </div>

            {/* RECENT FILES SECTION */}
            <div>
                <h3 className="font-bold text-lg mb-4 text-gray-900 px-1">Recent files</h3>
                
                {/* File Card with Image Zoom Effect */}
                <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer group">
                    <div className="flex justify-between items-center mb-3">
                        <span className="bg-pink-100 text-pink-600 text-xs px-3 py-1 rounded-lg font-bold tracking-wide">
                            X-Ray
                        </span>
                        <span className="text-xs text-gray-400 font-medium">12/02/2023</span>
                    </div>
                    
                    <h4 className="font-bold text-lg mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">
                        Hands X-Ray_Wilkinson T.
                    </h4>
                    
                    <p className="text-sm text-gray-500 mb-5 line-clamp-2 leading-relaxed">
                        Diagnose: No broken bones found during examination. The joint structures appear normal.
                    </p>
                    
                    <div className="relative overflow-hidden rounded-2xl">
                        <img 
                            src="https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=400" 
                            alt="X-Ray" 
                            className="w-full h-40 object-cover bg-black transform group-hover:scale-105 transition-transform duration-500" 
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default Pata2;