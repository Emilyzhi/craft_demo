import { ClipLoader } from "react-spinners";

import useUser from "@/hooks/useUser";
import { useSession } from "next-auth/react";

import UserBio from "@/components/users/UserBio";
import UserHero from "@/components/users/UserHero";
import Logout from "./users/Logout";


const defaultUserId = 1;
const UserView = () => {
  const { data: session, status, update } = useSession()
  const userId = session?.user?.userId ?? defaultUserId;
 

  const { data: fetchedUser, isLoading } = useUser(userId as string);

  if (isLoading || !fetchedUser) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  return (
    <>
      <div className="col-span-1 h-full pr-4 md:pr-6">
        <div className="flex flex-col items-end">
          <div className="space-y-2 lg:w-[400px]">
            <UserHero userId={userId as string} />
            <UserBio userId={userId as string} />
            <Logout/>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserView;
