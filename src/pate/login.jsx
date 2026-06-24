import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { KeyRound, Loader2 } from 'lucide-react';
import axios from 'axios';
import { apiUrl } from '../api';

const Code = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(apiUrl('/user/login'), 
        { code }, 
        { withCredentials: true } 
      );

      const data = response.data;

      localStorage.setItem('token', data.token); 
      localStorage.setItem('userData', JSON.stringify(data.user)); 
      
      navigate('/'); 

    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || 'लॉगिन फेल! कृपया दोबारा चेक करें।');
      } else {
        setError('सर्वर से कनेक्शन टूट गया भाई! बैकएंड चालू है ना?');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] font-sf-pro flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#1A1A1A] border border-neutral-800 rounded-2xl shadow-2xl p-8">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white tracking-wide mb-2">intelly</h1>
          <p className="text-[#757575] text-sm">Welcome back! Please enter your unique code.</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[#E0E0E0] text-sm font-medium">Access Code</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <KeyRound size={18} className="text-[#757575]" />
              </div>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter your 8-digit code"
                required
                className="w-full bg-[#121212] text-white border border-neutral-700 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-[#D2A5B5] focus:ring-1 focus:ring-[#D2A5B5] transition-all placeholder-[#757575]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#D2A5B5] text-black font-semibold rounded-lg py-3 flex items-center justify-center hover:bg-opacity-90 transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin mr-2" />
                Verifying...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

      </div>
    </div>
  );
};

export default Code;
