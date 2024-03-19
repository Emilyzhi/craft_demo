import TweetItem from './TweetItem';
import useFeeds from '@/hooks/useFeeds';
import { useSession, getSession } from "next-auth/react"


interface TweetFeedProps {
  userId?: string;
}

const TweetFeed: React.FC<TweetFeedProps> = ({ userId }) => {
  const { data: session, status, update } = useSession()
  userId = session?.user?.userId;
 
  const { data: feeds = [] } = useFeeds(userId);



  return (
    <>
      {feeds&& feeds.map((post: Record<string, any>,) => (
        <TweetItem userId={userId} key={post.id} data={post} />
      ))}
    </>
  );
};

export default TweetFeed;
