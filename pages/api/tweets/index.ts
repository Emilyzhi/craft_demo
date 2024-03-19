import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    
    if (req.method === 'POST') {
      const { currentUser } = await serverAuth(req, res);
      const { content } = req.body;

      const tweet = await prisma.tweet.create({
        data: {
          content: req.body.body,
          userId: currentUser.id
        },
        include:{
          user: true
        }
      });

      return res.status(200).json(tweet);
    }

    if (req.method === 'GET') {
      const { userId } = req.query;
      console.log(userId,'userId as paramer in get tweet')

      let tweets;

      if (userId ) {
        tweets = await prisma.tweet.findMany({
          where: {
            userId:Number(userId)
          },
          include: {
            user: true,
          },
          orderBy: {
            createdAt: 'desc'
          },
        });
      } else {
        tweets = await prisma.tweet.findMany({
          include: {
            user: true,
          },
          orderBy: {
            createdAt: 'desc'
          }
        });
      }

      return res.status(200).json(tweets);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}