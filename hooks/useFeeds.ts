import useSWR from 'swr';
import fetcher from '@/libs/fetcher';


const useFeeds = () => {
  const { data, error, isLoading, mutate } = useSWR('/api/feeds', fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default useFeeds;