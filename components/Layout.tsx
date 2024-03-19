import React from 'react';
import UserView from './UserView';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="h-screen bg-white">
      <div className="container h-full mx-auto xl:px-30 max-w-6xl">
        <div className="grid grid-cols-6 h-full">
        <div 
            className="
              col-span-2 
              lg:col-span-2 
          ">
             <UserView />
          </div>
         
          <div 
            className="
              col-span-4
              lg:col-span-4 
              border-x-[1px] 
              border-gray-300
          ">
            {children}
          </div>
        </div>
     </div>
    </div>
  )
}

export default Layout;
