import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    const { currentUser } = await serverAuth(req, res);
    console.log(currentUser,'current in feeds')

    // find related user info
    try {
        let userIds = currentUser.followings;
        userIds.push({"id": currentUser.id});

        const feeds =await Promise.all(userIds.map(async (userId) => {
            
            const userTweets=await prisma.tweet.findMany({
              where: {
                userId: Number(userId.id),
              },
              include: {
                user: true,
              },
              orderBy: {
                createdAt: 'desc'
              },
            });
            return userTweets;
          }));
          const sorted = feeds.flat().sort((a,b)=>{
            const timeA = new Date(a.createdAt);
            const timeB = new Date(b.createdAt);
            return timeB - timeA;
          });

          return res.status(200).json(sorted);
        }catch (error) {
            console.log(error);
          }
   
  } catch (error) {
    console.log(error);
    return res.status(400).end();
}
}