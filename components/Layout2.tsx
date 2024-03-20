import React from 'react';

import FollowView from "@/components/FollowView"
import UserView from '@/components/UserView'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div data-testid="main-layouts" className="h-screen bg-white">
      <div className="container h-full mx-auto xl:px-30 max-w-6xl">
        <div className="grid grid-cols-4 h-full">
          <UserView />
          <div 
            className="
              col-span-3 
              lg:col-span-2 
              border-x-[1px] 
              border-gray-300
          ">
            {children}
          </div>
          <FollowView />
        </div>
     </div>
    </div>
  )
}

export default Layout;
