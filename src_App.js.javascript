import React, { useState } from 'react';
import './App.css';

const CoffeeGraphic = () => (
  <svg viewBox="0 0 200 200" className="w-20 h-20">
    <defs>
      <linearGradient id="coffeeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#8B4513', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#5C2E0F', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="cupGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#f0f0f0', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    
    <path d="M 50 50 L 60 120 Q 60 130 70 130 L 130 130 Q 140 130 140 120 L 150 50 Z" fill="url(#cupGradient)" stroke="#4d6467" strokeWidth="2"/>
    <path d="M 60 80 L 140 80" stroke="#e0e0e0" strokeWidth="1" opacity="0.5"/>
    
    <rect x="65" y="60" width="70" height="55" fill="url(#coffeeGradient)" rx="2"/>
    
    <ellipse cx="100" cy="60" rx="35" ry="8" fill="#6B3410" opacity="0.6"/>
    
    <circle cx="155" cy="85" r="18" fill="none" stroke="#4d6467" strokeWidth="2.5"/>
    <circle cx="155" cy="85" r="14" fill="none" stroke="#4d6467" strokeWidth="1.5"/>
    <path d="M 155 70 Q 165 75 165 85 Q 165 95 155 100" fill="none" stroke="#4d6467" strokeWidth="2.5" strokeLinecap="round"/>
    
    <circle cx="100" cy="75" r="3" fill="#FFD700" opacity="0.8"/>
    <circle cx="85" cy="95" r="2.5" fill="#FFD700" opacity="0.7"/>
    <circle cx="120" cy="100" r="2" fill="#FFD700" opacity="0.6"/>
  </svg>
);

export default function CoffeeSignup() {
  const [signups, setSignups] = useState({});
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [name, setName] = useState('');

  const timeSlots = {
    Friday: [
      '7:30 - 9:00 AM',
      '9:00 - 10:00 AM',
      '10:00 - 11:00 AM',
      '11:00 AM - 12:00 PM',
      '12:00 - 1:00 PM',
      '1:00 - 2:00 PM',
      '2:00 - 3:00 PM',
      '3:00 - 4:00 PM',
      '4:00 - 5:00 PM',
      '5:00 - 6:00 PM',
      '6:00 - 7:00 PM',
      '7:00 - 8:00 PM',
    ],
    Saturday: [
      '7:30 - 9:00 AM',
      '9:00 - 10:00 AM',
      '10:00 - 11:00 AM',
      '11:00 AM - 12:00 PM',
      '12:00 - 1:00 PM',
      '1:00 - 2:00 PM',
      '2:00 - 3:00 PM',
      '3:00 - 4:00 PM',
      '4:00 - 5:00 PM',
      '5:00 - 6:00 PM',
      '6:00 - 7:00 PM',
      '7:00 - 8:00 PM',
    ],
    Sunday: [
      '7:30 - 9:00 AM',
      '9:00 - 10:00 AM',
    ],
  };

  const handleSignup = () => {
    if (!name.trim() || !selectedSlot) {
      alert('Please enter your name and select a time slot');
      return;
    }

    const slotKey = `${selectedSlot.day}-${selectedSlot.time}`;
    
    if (signups[slotKey]) {
      alert('This slot is already taken. Please choose another.');
      return;
    }

    setSignups({
      ...signups,
      [slotKey]: name,
    });

    setName('');
    setSelectedSlot(null);
    alert(`${name} signed up for ${selectedSlot.day} ${selectedSlot.time}`);
  };

  const handleRemove = (day, time) => {
    const slotKey = `${day}-${time}`;
    const newSignups = { ...signups };
    delete newSignups[slotKey];
    setSignups(newSignups);
  };

  const isSlotTaken = (day, time) => {
    return !!signups[`${day}-${time}`];
  };

  const getSlotName = (day, time) => {
    return signups[`${day}-${time}`] || null;
  };

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: '#abc595' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <CoffeeGraphic />
            <h1 className="text-4xl font-bold" style={{ color: '#4d6467' }}>64th Annual SETA Convention</h1>
            <CoffeeGraphic />
          </div>
          <p className="text-2xl font-semibold" style={{ color: '#4d6467' }}>Coffee Service Sign-Up</p>
          <p className="text-sm mt-2" style={{ color: '#7d9364' }}>Select your time slot and enter your name to volunteer</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {Object.entries(timeSlots).map(([day, slots]) => (
            <div key={day} className="border-3 shadow-lg rounded-lg overflow-hidden" style={{ borderColor: '#4d6467', backgroundColor: '#ffffff' }}>
              <div className="rounded-t-lg p-4" style={{ background: 'linear-gradient(to right, #7d9364, #9aaa6c)' }}>
                <h2 className="text-2xl font-bold text-white">{day}</h2>
                <p style={{ color: '#f0f0f0' }} className="text-sm">{slots.length} time slots available</p>
              </div>
              <div className="p-4">
                <div className="space-y-2">
                  {slots.map((time) => {
                    const taken = isSlotTaken(day, time);
                    const volunteer = getSlotName(day, time);
                    return (
                      <div key={`${day}-${time}`} className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            setSelectedSlot(
                              selectedSlot?.day === day && selectedSlot?.time === time
                                ? null
                                : { day, time }
                            )
                          }
                          className="flex-1 p-3 rounded-lg font-medium transition-all text-left"
                          style={{
                            backgroundColor: taken ? '#e8e8e8' : selectedSlot?.day === day && selectedSlot?.time === time ? '#7d9364' : '#abc595',
                            color: taken ? '#999' : selectedSlot?.day === day && selectedSlot?.time === time ? '#fff' : '#4d6467',
                          }}
                          disabled={taken}
                        >
                          <div className="text-sm font-semibold">{time}</div>
                          {volunteer && <div className="text-xs mt-1">✓ {volunteer}</div>}
                        </button>
                        {volunteer && (
                          <button
                            onClick={() => handleRemove(day, time)}
                            className="px-2 py-1 text-xs rounded hover:opacity-80 transition-opacity text-white font-semibold"
                            style={{ backgroundColor: '#f2a99c' }}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedSlot && (
          <div className="border-3 shadow-lg max-w-md mx-auto rounded-lg overflow-hidden" style={{ borderColor: '#f2a99c', backgroundColor: '#ffffff' }}>
            <div style={{ backgroundColor: '#f2a99c' }} className="p-4">
              <h3 className="text-lg font-bold text-amber-900">Complete Your Sign-Up</h3>
              <p style={{ color: '#5d5d5d' }} className="text-sm">{selectedSlot.day} • {selectedSlot.time}</p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#4d6467' }}>
                  Your Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full border-2 p-2 rounded"
                  style={{ borderColor: '#abc595' }}
                  onKeyPress={(e) => e.key === 'Enter' && handleSignup()}
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleSignup}
                  className="flex-1 text-white font-semibold p-2 rounded"
                  style={{ backgroundColor: '#7d9364' }}
                >
                  Confirm Sign-Up
                </button>
                <button
                  onClick={() => {
                    setSelectedSlot(null);
                    setName('');
                  }}
                  className="flex-1 border-2 p-2 rounded"
                  style={{ borderColor: '#abc595', color: '#4d6467' }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-12 p-6 rounded-lg border-3 shadow-md" style={{ backgroundColor: '#ffffff', borderColor: '#7d9364' }}>
          <h2 className="text-lg font-bold mb-4" style={{ color: '#4d6467' }}>Signup Summary</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {Object.entries(timeSlots).map(([day]) => {
              const count = timeSlots[day].filter(
                (time) => signups[`${day}-${time}`]
              ).length;
              return (
                <div
                  key={day}
                  className="p-4 rounded-lg border-2"
                  style={{ backgroundColor: '#abc595', borderColor: '#7d9364' }}
                >
                  <div className="font-semibold" style={{ color: '#4d6467' }}>{day}</div>
                  <div className="text-2xl font-bold" style={{ color: '#4d6467' }}>
                    {count}/{timeSlots[day].length}
                  </div>
                  <div className="text-xs" style={{ color: '#7d9364' }}>slots filled</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
