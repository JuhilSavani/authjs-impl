"use client";

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  
  console.log(`%c
    888888b.                                            888                     
    888  "88b                                           888                     
    888  .88P                                           888                     
    8888888K.   .d88b.  888  888  .d88b.  88888b.   .d88888                     
    888  "Y88b d8P  Y8b 888  888 d88""88b 888 "88b d88" 888                     
    888    888 88888888 888  888 888  888 888  888 888  888                     
    888   d88P Y8b.     Y88b 888 Y88..88P 888  888 Y88b 888                     
    8888888P"   "Y8888   "Y88888  "Y88P"  888  888  "Y88888                     
                            8888                                              
                        Y8b d88P                                               
                        "Y88PP"

                               888                           888    888      888
                               888                           888    888      888
                               888                           888    888      888
    88888b.   .d88b.  888  888 888888       8888b.  888  888 888888 88888b.  888
    888 "88b d8P  Y8b 'Y8bd8P' 888             "88b 888  888 888    888 "88b 888
    888  888 88888888   X88K   888  888888 .d888888 888  888 888    888  888 Y8P
    888  888 Y8b.     .d8""8b. Y88b.       888  888 Y88b 888 Y88b.  888  888  " 
    888  888  "Y8888  888  888  "Y888      "Y888888  "Y88888  "Y888 888  888 888
  `, "font-family:monospace; color: orange;");

  const pathname = usePathname();
  if (pathname === '/sign-in' || pathname === '/sign-up' || pathname === '/email-verification') return null;
  return (
    <header className='navbar'>
      <ul>
        <li>
          <Button variant="link">
            <Link href="/">Home</Link>
          </Button>
        </li>
        <li>
          <Button variant="link">
            <Link href="/profile">Profile</Link>
          </Button>
        </li>
        <li>
          <Button variant="link">
            <Link href="/settings">Settings</Link>
          </Button>
        </li>
      </ul>
    </header>
  )
}