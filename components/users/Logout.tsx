import { useRouter } from "next/router";
import { signOut } from 'next-auth/react';
import Button from "../Button"

const Logout = () => {
  const router = useRouter();
  
  return (
    <div className="flex items-end justify-end mr-6">
      <div 
        onClick={() => router.push('/')}
        className="
          rounded-md
          h-14
          w-14
          p-4 
          flex 
          items-center 
          justify-center 
          hover:bg-blue-300 
          hover:bg-opacity-10 
          cursor-pointer
      ">
        <Button
              onClick={() => signOut()}
              label="Logout"
            />
      </div>
    </div>
  );
};

export default Logout;
