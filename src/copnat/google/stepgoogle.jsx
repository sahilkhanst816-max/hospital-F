import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router';
import { Brain, Heart, Dna, Activity, ShieldCheck, Bone, Info } from 'lucide-react';
import HealthScore from './HealthScore';
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { apiUrl } from '../../api';
const StepGoogle = () => {
    const [googleSteps, setGoogleSteps] = useState(0);
    const [isConnecting, setIsConnecting] = useState(false);
    const location = useLocation();

    const hasFetched = useRef(false);

    const connectGoogleFit = async (e) => {
        try {
            e.preventDefault();
            setIsConnecting(true);
            const response = await fetch(apiUrl('/google/auth-url'));
            const data = await response.json();

            if (data.url) {
                window.location.href = data.url;
            }
        } catch (error) {
            console.error("URL लाने में दिक्कत:", error);
            setIsConnecting(false);
        }
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code && !hasFetched.current) {
            hasFetched.current = true;

            const fetchStepsFromGoogle = async () => {
                try {
                    const response = await fetch(apiUrl('/google/get-steps'), {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ code })
                    });

                    const data = await response.json();

                    if (data.success) {
                        setGoogleSteps(data.steps);
                        window.history.replaceState({}, document.title, window.location.pathname);
                    } else {
                        console.error("Backend se error aaya:", data.message);
                    }
                } catch (error) {
                    console.error("Steps लाने में एरर:", error);
                }
            };

            fetchStepsFromGoogle();
        }
    }, []);
    useGSAP(() => {
        gsap.to('.box-rote', {
            rotate: 360,
            duration: 10,
            repeat: -1,
            ease: "none"
        })
    })
    /*  const radiusPercent = 43;
     const radian = (item.angle * Math.PI) / 180;
     const x = Math.cos(radian) * radiusPercent;
     const y = Math.sin(radian) * radiusPercent;
  */

    return (
        <>
            <div className="lg:w-[50%] relative lg:h-[50vh] aspect-square flex justify-center items-center mx-auto">

                <div className="box-rote absolute w-[90%] max-w-[400px] aspect-square rounded-[50%] bg-amber-200 flex items-center justify-center mx-auto  box-rote ">


                    <div
                        className="absolute w-10 h-10 bg-amber-500 rounded-[50%] shadow-sm transition-transform hover:scale-110 flex justify-center items-center cursor-pointer "
                        style={{ transform: `translate(172px, -50px)` }}
                    >👟
                    </div>
                </div>
                <div className="absolute z-10 w-[57%] h-[67%] rounded-full bg-white flex flex-col justify-center items-center shadow-lg">
                    <span className="font-bold text-5xl  md:text-6xl text-gray-800 tracking-tight" style={{ fontFamily: 'Quicksand, sans-serif' }}>
                        {googleSteps.toLocaleString()}
                    </span>
                    <span className="text-xs md:text-sm text-gray-400 font-semibold uppercase tracking-wider mt-1">
                        Steps Today
                    </span>
                </div>
            </div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Live Steps</h3>
                <button
                    onClick={connectGoogleFit}
                    disabled={isConnecting}
                    className="bg-black text-white text-xs px-4 py-2 rounded-full font-bold hover:bg-gray-800 disabled:opacity-50"
                >
                    {isConnecting ? 'Connecting...' : 'Connect Google Fit'}
                </button>
            </div>
            <HealthScore />
        </>


    );
};

export default StepGoogle;
