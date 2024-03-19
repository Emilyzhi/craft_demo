import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai';
import { formatDistanceToNowStrict } from 'date-fns';
import useCurrentUser from '@/hooks/useCurrentUser';

import Avatar from '../Avatar';
interface TweetItemProps {
  data: Record<string, any>;
  userId?: string;
}

const TweetItem: React.FC<TweetItemProps> = ({ data = {}, userId }) => {
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();

  const goToUser = useCallback((ev: any) => {
    ev.stopPropagation();
    router.push(`/users/${data.user.id}`)
  }, [router, data.user.id]);




  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data.createdAt])

  return (
    <div 
      className="
        border-b-[1px] 
        border-gray-300 
        p-5 
        transition
      ">
      <div className="flex flex-row items-start gap-3">
        <Avatar userId={data.user.id} />
        <div>
          <div className="flex flex-row items-center gap-2">
            <p 
              onClick={goToUser} 
              className="
                text-black 
                font-semibold 
                cursor-pointer 
                hover:underline
            ">
              {data.user.name}
            </p>
            <span 
              onClick={goToUser} 
              className="
                text-neutral-500
                cursor-pointer
                hover:underline
                hidden
                md:block
            ">
              @{data.user.username}
            </span>
            <span className="text-gray-300 text-sm">
              {createdAt}
            </span>
          </div>
          <div className="text-black mt-1">
            {data.content}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TweetItem;
