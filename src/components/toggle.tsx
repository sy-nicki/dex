"use client"
import * as Switch from '@radix-ui/react-switch';
import React, { useState } from 'react';

export const Toggle = () => {
    const [checked, setChecked] = useState(false);

    const handleChange = (state: boolean) => {
        setChecked(state);
    };

    return (
      <div className="relative flex items-center">
        <Switch.Root
          checked={checked}
          onCheckedChange={handleChange}
          className={`w-16 h-8 rounded-full relative transition-colors ${
            checked ? 'bg-brand-700' : 'bg-brand-300'
          }`}
        >
          <Switch.Thumb
            className={`w-6 h-6 bg-white rounded-full absolute top-1 left-1 transition-all ${
              checked ? 'translate-x-8' : ''
            }`}
          />
        </Switch.Root>

        <span
          className={`absolute text-white font-medium transition-all ${
            checked ? 'left-2' : 'left-8'
          }`}
          style={{ transform: 'translateY(-10%)' }}
        >
                {checked ? 'Yes' : 'No'}
            </span>
      </div>
    );
};
