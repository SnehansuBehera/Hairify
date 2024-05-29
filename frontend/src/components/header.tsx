"use client";
import { useState } from "react";
import Image from "next/image";
import icon from "../assets/icon.png";
import { useRouter } from "next/navigation";
import { useDataContext } from "@/context/dataContext";
import Link from "next/link";

export default function Header() {
  return (
    <div className="fixed h-[65px] flex justify-between w-full bg-[rgba(255,255,255,0.3)] z-50 backdrop-blur-md headerbar shadow-[rgba(0,0,0,0.1)_0_1px_10px]">
      <Logo />
      <Userbuttons />
    </div>
  );
}
function Logo() {
  return (
    <div className="m-2 flex">
      <Link href="/" className="flex gap-2">
        <Image src={icon} alt="Icon" className="h-full w-auto" />
        <div className="py-3 text-xl hidden md:block">Hairify</div>
      </Link>
    </div>
  );
}

function Userbuttons() {
  const { authState } = useDataContext();

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="flex items-center justify-center gap-4 sm:gap-6">
      {authState === "loggedin" ? (
        <HeaderButton text="Logout" url="" onClickFunction={handleLogout} />
      ) : (
        <HeaderButton text="Login" url="/login" />
      )}
      {authState === "loggedin" && (
        <HeaderButton text="Dashboard" url="/dashboard" />
      )}
    </div>
  );
}

function HeaderButton({
  text,
  url,
  onClickFunction,
}: {
  text: string;
  url: string;
  onClickFunction?: () => any;
}) {
  const router = useRouter();

  const handleOnClick = (e: any, url: any) => {
    e.preventDefault();
    if (onClickFunction != undefined) {
      onClickFunction();
    } else {
      router.push(url.toString());
    }
  };

  return (
    <button
      onClick={(e) => handleOnClick(e, url)}
      className="no-underline text-black"
      key={text}
    >
      <div className="py-1 px-3 sm:py-2 sm:px-3 md:text-xl md:py-2 md:px-4 border-2 border-black hover:border-b-2 hover:bg-gray-200 my-2 transition-all">
        {text}
      </div>
    </button>
  );
}
