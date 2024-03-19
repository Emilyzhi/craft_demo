import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";

import useUser from "@/hooks/useUser";

import Header from "@/components/Header";
import UserPro from "@/components/users/UserPro";
import UserHero from "@/components/users/UserHero";



const UserProfile = () => {
  const router = useRouter();
  const { userId } = router.query;

  const { data: fetchedUser, isLoading } = useUser(userId as string);

  if (isLoading || !fetchedUser) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    )
  }

  return (
    <>
      <Header showBackArrow label={fetchedUser?.name} />
      <UserHero userId={userId as string} />
      <UserPro userId={userId as string} />
    </>
   );
}
 
export default UserProfile;