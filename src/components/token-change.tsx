'use client';
import {
  DialogTrigger,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronDown, Search } from 'lucide-react';
import tokenList from '@/config/token-list.json';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import { Token } from '@/interfaces/Token.interface';
interface TokenChangeProps {
  token: Token;
  onTokenChange: (newToken: Token) => void;
}
export const TokenChange: React.FC<TokenChangeProps> = ({ token, onTokenChange }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);


  const filteredTokenList = tokenList.filter(el =>
    el.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    el.ticker.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="text" size="text">
            <Image
              aria-hidden
              src={token.img} // 图片存在 public中
              style={{ objectFit: 'contain', display: 'block' }}
              width={24}
              height={24}
              alt=""
            />
            <div className="ml-[6px]">{token.ticker}</div>
            <ChevronDown />
          </Button>
        </DialogTrigger>

        <DialogContent top={'top-[550px]'}>
          <DialogTitle>Swap settings</DialogTitle>
          <div>
            <Input
              icon={<Search className="text-gray-400" />}
              className="mt-1"
              placeholder="Search Tokens Name"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="space-y-4 mt-[36px] h-[500px] overflow-y-auto">
              {filteredTokenList.map((el, i) => (
                <div key={i} className="flex items-center space-x-6  hover:bg-brand-50 p-2 rounded-md cursor-pointer"
                     onClick={() => {
                       onTokenChange(el);
                       setIsOpen(false);
                     }}
                >
                  <Image
                    aria-hidden
                    src={el.img} // 图片存在 public中
                    style={{ objectFit: 'contain', display: 'block' }}
                    width={50}
                    height={50}
                    alt=""
                    className="rounded-full border-2 border-brand-50"
                  />
                  <div className="space-y-2">
                    <div className="text-brand-950  font-bold">{el.name}</div>
                    <div className="text-brand-600 text-[14px]">{el.ticker}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
