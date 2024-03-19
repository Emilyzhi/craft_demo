import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import Button from "../Button";
import useFollow from "@/hooks/useFollow";

interface UserBioProps {
  userId: string;
}

const UserBio: React.FC<UserBioProps> = ({ userId }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedUser } = useUser(userId);
  const { unFollow } = useFollow(userId);


  return ( 
    <div className="pb-4">
      <div className="flex justify-end p-2">
      {/* <div className="flex flex-col"> */}       
          <p className="text-black text-3xl font-semibold">
            {fetchedUser?.name}
          </p>
          <p className="text-md text-2xl text-neutral-500 pt-1">
            @{fetchedUser?.username}
          </p>
          {/* </div> */}
      </div>
      <div className="mt-8">
        {/* user bio  */}
        {/* <p className="flex px-4 text-black">
          {fetchedUser?.bio}
        </p> */}
        <div className="flex px-4 border-t-[1px] border-gray-300 flex-row items-center pt-5 mt-4 gap-6">
          <div className="flex flex-row items-center gap-1">
            <p className="text-black">{fetchedUser?.tweetsCount || 0}</p>
            <p className="text-neutral-500">Tweets</p>
          </div>
          <div className="flex flex-row items-center gap-1">
            <p className="text-black">{fetchedUser?.followingsCount || 0}</p>
            <p className="text-neutral-500">Followings</p>
          </div>
          <div className="flex flex-row items-center gap-1">
            <p className="text-black">{fetchedUser?.followersCount || 0}</p>
            <p className="text-neutral-500">Followers</p>
          </div>
        </div>
      </div>
    </div>
   );
}
 
export default UserBio;