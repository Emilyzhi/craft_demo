import { NextApiRequest, NextApiResponse } from "next";

import prisma from '@/libs/prismadb';
import serverAuth from "@/libs/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    const { userId } = req.body;
    console.log(userId,'userId in follwing api')

    const { currentUser } = await serverAuth(req, res);
    console.log(currentUser,'currentUser in follwing api')

    if (!userId) {
      throw new Error('Invalid ID');
    }
      // NOTIFICATION PART START
    await prisma.user.update({
        where: {
        id: Number(currentUser.id),
        },
        data: {
        followings: {
            disconnect: { id: Number(userId) } // 从关注列表中断开关注目标用户的关系
            }
        }
    });
    const updatedUser = await prisma.user.update({
        where: { id: Number(userId) },
        data: {
            followers: {
            disconnect: { id: Number(currentUser.id )} // 从粉丝列表中断开关注者的关系
            }
        }
        });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}