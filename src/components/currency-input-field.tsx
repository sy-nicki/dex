"use client"
import React from 'react';
import { Input } from '@/components';
interface CurrencyInputFieldProps {
  loading?: boolean;
  value?: number;
  field?: string;
  getSwapPrice?: (value: number) => void;
  spinner?: React.ComponentType; // 这是一个组件类型
}

export const CurrencyInputField:React.FC<CurrencyInputFieldProps> = ({ loading, value, field, getSwapPrice, spinner: Spinner, }) => {
  const getPrice = (value: number) => {
    if (value > 0 && getSwapPrice) {
      getSwapPrice(value);
    }
  }
  return (
    <div>
      {loading ? (
        <div className="spinnerContainer w-full h-[80px] flex items-center
        rounded-md border shadow-sm px-3">
          {Spinner && <Spinner />}
        </div>
      ) : (
        <Input
          type={'number'}
          placeholder="0"
          value={value}
          className="w-full h-[80px]"
          onChange={e => (field === 'input' ? getPrice(Number(e.target.value)) : null)}
        />
      )}

    </div>
  )
}
