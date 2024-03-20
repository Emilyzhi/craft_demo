import axios from "axios";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from 'next/router';
import useCurrentUser from "./useCurrentUser";
import useUser from "./useUser";


const useFollow = (userId: string) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(userId);
  const router = useRouter();

  const unFollow = useCallback(async () => {
    try {
      let request= () => axios.post('/api/unfollow', { userId });
      await request();
      mutateCurrentUser();
      mutateFetchedUser();
      router.push('/')

      toast.success('Success');
    } catch (error) {
      toast.error('Something went wrong');
    }
  }, [currentUser, userId, mutateCurrentUser, mutateFetchedUser]);

  return {
    unFollow,
  }
}

export default useFollow;
