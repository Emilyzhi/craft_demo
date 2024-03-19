import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    const { tweetId } = req.query;

    if (!tweetId) {
      throw new Error('Invalid ID');
    }

    const tweet = await prisma.tweet.findUnique({
      where: {
        id: Number(tweetId),
      },
      include: {
        user: true,
      },
    });

    return res.status(200).json(tweet);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
