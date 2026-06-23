import React from 'react';
import { Brain, Heart, Dna, Activity, ShieldCheck, Bone, Info } from 'lucide-react';

const HealthScore = () => {
    const iconsData = [
        { id: 1, Icon: Bone, angle: 225, color: 'text-blue-500', bg: 'bg-blue-100' },
        { id: 2, Icon: ShieldCheck, angle: 275, color: 'text-yellow-600', bg: 'bg-yellow-200' },
        { id: 3, Icon: Activity, angle: 330, color: 'text-green-700', bg: 'bg-green-200' },
        { id: 4, Icon: Heart, angle: 35, color: 'text-pink-600', bg: 'bg-pink-200' },
        { id: 5, Icon: Brain, angle: 90, color: 'text-blue-600', bg: 'bg-blue-200' },
        { id: 6, Icon: Activity, angle: 145, color: 'text-green-600', bg: 'bg-green-200' },
        { id: 7, Icon: Dna, angle: 190, color: 'text-yellow-600', bg: 'bg-yellow-200' },
    ];

    return (
        <div className="flex justify-center items-center p-4 sm:p-6 md:p-10 bg-[#FDFBF7]">
            
            {/* Main Static Container (Ye nahi ghumega) */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full flex flex-col items-center justify-center border-[12px] sm:border-[16px] md:border-[20px] border-gray-50 shadow-inner mx-auto">

                {/* Center Text (Score) - Ye static rahega */}
                <div className="absolute z-10 flex flex-col items-center">
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#1A1A1A] tracking-tight" style={{ fontFamily: 'Quicksand, sans-serif' }}>
                        8.8
                    </h1>
                    <div className="flex items-center gap-1 sm:gap-1.5 mt-1 text-gray-500">
                        <span className="text-[10px] sm:text-xs md:text-sm font-semibold">your health score</span>
                        <Info className="w-3 h-3 sm:w-4 sm:h-4 cursor-pointer hover:text-gray-800" />
                    </div>
                </div>

                {/* Spinning Ring (Ye background mein ghumega) */}
                <div className="absolute inset-0 w-full h-full animate-[spin_20s_linear_infinite]">
                    
                    {/* Circular Icons Placement */}
                    {iconsData.map((item) => {
                        const radiusPercent = 43;
                        const radian = (item.angle * Math.PI) / 180;
                        const x = Math.cos(radian) * radiusPercent;
                        const y = Math.sin(radian) * radiusPercent;

                        return (
                            // Ye parent div math apply karke icon ko circle ke border par rakhega
                            <div
                                key={item.id}
                                className="absolute w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
                                style={{
                                    left: `calc(50% + ${x}%)`,
                                    top: `calc(50% + ${y}%)`,
                                    transform: 'translate(-50%, -50%)',
                                }}
                            >
                                {/* Ye inner div counter-spin (ulta ghumega) karega taaki icons hamesha seedhe khade rahein! */}
                                <div 
                                    className={`w-full h-full flex items-center justify-center rounded-full ${item.bg} ${item.color} shadow-sm cursor-pointer animate-[spin_20s_linear_infinite] hover:scale-110 transition-transform`}
                                    style={{ animationDirection: 'reverse' }}
                                >
                                    <item.Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" strokeWidth={2.5} />
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
};

export default HealthScore;