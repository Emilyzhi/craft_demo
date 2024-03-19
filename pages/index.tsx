import TweetFeed from "@/components/tweets/TweetFeed"
import Form from "@/components/Form"
import {getSession } from 'next-auth/react'
import Header from "@/components/Header";
import { GetServerSidePropsContext } from 'next';


export async function getServerSideProps(context:GetServerSidePropsContext) {
  const session = await getSession(context)
  if(!session){
    return {
      redirect:{
        destination:'/login',
        pernanent: false
      }
    }
  }
  return {
    props:{ session}
  }
}
export default function Home(){
  return (
    <>
    <Form placeholder="What's happening?" />
    <Header label="Recent Tweets" />
    <TweetFeed />
  </>
  )
}
