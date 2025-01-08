'use client';
import Link from 'next/link';
import { MaxWidthWrapper, WalletButton } from './index';
import {  buttonVariants } from './ui/button';
import { usePathname } from 'next/navigation';
import { Repeat2 } from 'lucide-react';


export const Navbar = () => {
  const pathname = usePathname();

  const menuItems = [
    {
      name: 'Trade',
      link: '/',
      url: '/',
      icon: Repeat2,
    }
  ];
  return (
    <>
      <nav
        className="sticky h-16 inset-x-0 top-0 w-full border-gray-200 bg-white/80 backdrop-blur-lg transition-all">
        <MaxWidthWrapper>
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              {/* Logo */}
              <Link href="/"
                    className="flex z-40 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-brand-900 via-brand-600 to-brand-800 text-[24px] mr-[24px] animate-gradient-text">
                Dex
              </Link>
              {/* Menu Items*/}
              <div className="hidden lg:flex items-center h-full space-x-10">
                {menuItems.map((el, i) => (
                  // query: `${el.link}`
                  <Link key={i + 1} href={{ pathname: `${el.url}` }} className={buttonVariants({
                    variant: 'text',
                    className: `flex items-center gap-1 text-[20px] ${pathname === el.url ? 'text-brand-800' : 'text-brand-500'}`,
                  })}>
                    {el.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <WalletButton/>

            </div>
          </div>
        </MaxWidthWrapper>

      </nav>
      {/* Mobile Terminal */}
      <footer
        className=" lg:hidden flex items-center justify-around fixed bottom-0 px-[40px] py-[20px] w-full  bg-[#fff]">
        {menuItems.map((el, i) => (
          // query: `${el.link}`
          <Link key={i + 1} href={{ pathname: `${el.url}` }} className={buttonVariants({
            variant: 'text',
            className: `flex items-center gap-1 text-[26px] ${pathname === el.url ? 'text-brand-800' : 'text-brand-500'}`,
          })}>
            <div className="flex flex-col items-center">
              <el.icon className="w-6 h-6" />
              {el.name}
            </div>
          </Link>
        ))}
      </footer>

    </>
  );
};
