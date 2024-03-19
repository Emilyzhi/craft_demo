import { NextApiRequest, NextApiResponse } from "next";

import prisma from '@/libs/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    const { userId } = req.query;

    if (!userId) {
      throw new Error('Invalid ID');
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        id: Number(userId)
      },
      include: {
        followers: {
            select:{
                id: true
            }
        },
        followings: {
            select:{
                id: true
            }
        },
        tweets: true
    }
    });

    const followersCount = existingUser?.followers.length;
    const followingsCount = existingUser?.followings.length;
    const tweetsCount = existingUser?.tweets.length;


    return res.status(200).json({ ...existingUser, followersCount, followingsCount, tweetsCount });
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
};
