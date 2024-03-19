import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import Button from "../Button";
import useFollow from "@/hooks/useFollow";

interface UserProProps {
  userId: string;
}

const UserPro: React.FC<UserProProps> = ({ userId }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedUser } = useUser(userId);
  const { unFollow } = useFollow(userId);


  return ( 
    <div className="pb-4">
      <div className="flex justify-end p-2 mr-4">     
          <p className="text-black text-3xl font-semibold">
            {fetchedUser?.name}
          </p>
      </div>
      <div className="mt-8">
        <div className="flex justify-between mr-4">
          <p className="flex px-4 text-black items-end">
            {fetchedUser?.bio}
          </p>
          {currentUser?.id != userId && (
              <Button
                onClick={unFollow} 
                label='Unfollow'
              />
          )}
          </div>
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
 
export default UserPro;