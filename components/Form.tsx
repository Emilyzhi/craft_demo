import axios from 'axios';
import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';

import useCurrentUser from '@/hooks/useCurrentUser';
import useFeeds from '@/hooks/useFeeds';
import useTweets from '@/hooks/useTweets';
import useTweet from '@/hooks/useTweet';
import Avatar from './Avatar';
import Button from './Button';

interface FormProps {
  placeholder: string;
  isComment?: boolean;
  tweetId?: string;
}

const Form: React.FC<FormProps> = ({ placeholder, isComment, tweetId }) => {
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutateFeeds } = useFeeds();

  const [body, setBody] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      console.log(body, 'body')
      const url = isComment ? `/api/comments?postId=${tweetId}` : '/api/tweets';

      await axios.post(url, { body });
      toast.success('Tweet created');
      setBody('');
      
      mutateFeeds();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [body, isComment, tweetId, mutateFeeds]);

  return (
    <div className="border-b-[1px] border-gray-300 px-5 py-2">
        <div className="flex flex-row gap-4">
          <div>
            <Avatar userId={currentUser?.id} />
          </div>
          <div className="w-full">
            <textarea
              disabled={isLoading}
              onChange={(event) => setBody(event.target.value)}
              value={body}
              className="
                disabled:opacity-80
                peer
                resize-none 
                mt-3 
                w-full 
                bg-white 
                ring-0 
                outline-none 
                text-[20px] 
                placeholder-gray-500 
                text-black
              "
              placeholder={placeholder}>
            </textarea>
            <hr 
              className="
                opacity-0 
                peer-focus:opacity-100 
                h-[1px] 
                w-full 
                border-gray-800 
                transition"
            />
            <div className="mt-4 flex flex-row justify-end">
              <Button disabled={isLoading || !body} onClick={onSubmit} label="Post" />
            </div>
          </div>
        </div>
    </div>
  );
};

export default Form;
