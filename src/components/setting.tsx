'use client';
import React from 'react';
import { Settings } from 'lucide-react';
import {
  DialogTrigger,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {Toggle} from "@/components";

interface SettingProps {
  maxSlippage: number;
  onMaxSlippageChange: (value: number) => void;
  transactionDeadline: number;
  onTransactionDeadlineChange: (value: number) => void;
}

export const Setting: React.FC<SettingProps>  = ({
                          maxSlippage,
                          onMaxSlippageChange,
                          transactionDeadline,
                          onTransactionDeadlineChange
                        }) => {

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <Settings />
          </Button>
        </DialogTrigger>
        <DialogContent showOverlay={false} top={'top-[410px]'}  className="w-[350px]">
          <DialogTitle>Swap settings</DialogTitle>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Max slippage</Label>
              <div className="flex space-x-4">
                <Button>Auto</Button>
                <Input type={'number'}
                       value={maxSlippage}
                       onChange={(e) => onMaxSlippageChange(Number(e.target.value))}
                       iconRight="%"
                ></Input>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Transaction deadline</Label>
              <div className="flex space-x-4">
                <Input className="text-right" type={'number'}
                       value={transactionDeadline}
                       onChange={(e) => onTransactionDeadlineChange(Number(e.target.value))}
                ></Input>
                <Button>minutes</Button>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <div>
              Transaction deadline
            </div>
            <Toggle/>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
