import Image from "next/image";
import { IoMdHome } from "react-icons/io";
import { BsThreads } from "react-icons/bs";
import { FaHashtag } from "react-icons/fa6";
import { FaBell } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import FeedCard from "@/components/FeedCard";
import { FaMoneyBillWave } from "react-icons/fa6";
import { CiMoneyBill } from "react-icons/ci";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useCallback } from "react";
import toast from "react-hot-toast";
import graphqlClient from "@/clients/api";
import verifyUserGoogleTokenQ from "@/graphql/query/user";

interface SideBarButton {
  title: string;
  icon: React.ReactNode;
}

const sideBarItems: SideBarButton[] = [
  {
    title: "Home",
    icon: <IoMdHome />,
  },
  {
    title: "Explore",
    icon: <FaHashtag />,
  },
  {
    title: "Notifications",
    icon: <FaBell />,
  },
  {
    title: "Messages",
    icon: <FaEnvelope />,
  },
  {
    title: "Bookmarks",
    icon: <FaBookmark />,
  },
  {
    title: "Monetization",
    icon: <CiMoneyBill />,
  },
  {
    title: "Profile",
    icon: <CgProfile />,
  },
];

export default function Home() {
  const handleLoginwithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;
      if (!googleToken) return  toast.error(`Google token not found.`);
      const {verifyGoogleToken} = await graphqlClient.request(verifyUserGoogleTokenQ, {
        token: googleToken,
      });
      toast.success(`Verified success`);
      console.log(verifyGoogleToken);
      if(verifyGoogleToken)window.localStorage.setItem('__twitter_token',verifyGoogleToken);
    },
    []
  );

  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen px-56">
        <div className="col-span-3 pt-2 px-4 ">
          <div className="text-4xl h-fit w-fit hover:bg-slate-600 rounded-full p-2 cursor-pointer transition-all">
            <BsThreads />
          </div>
          <div className="font-semibold mt-4 text-2xl">
            <div className="mt-4 text-xl font-bold">
              {sideBarItems.map((item) => (
                <li
                  className="flex justify-start items-center gap-4 rounded-full px-5 py-2 w-fit cursor-pointer hover:bg-slate-600 mt-2"
                  key={item.title}
                >
                  <span>{item.icon}</span>
                  <span>{item.title}</span>
                </li>
              ))}
            </div>
            <button className="bg-[#1d9bf0] text-lg rounded-full w-full mt-4 p-4">
              Post
            </button>
          </div>
        </div>
        <div className="col-span-5 border-r-[1px] border-l-[1px] border-slate-600">
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>
        <div className="col-span-3">
          <div className="p-5 bg-slate-700 rounded-lg ">
            <h1 className="my-2 text-2xl">New to SocialPulse ???</h1>
            <GoogleLogin onSuccess={handleLoginwithGoogle} />
          </div>
        </div>
      </div>
    </div>
  );
}
