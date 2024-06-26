"use client";
import { useState } from "react";
import Image from "next/image";
import icon from "../assets/icon.png";
import { useRouter } from "next/navigation";
import { useDataContext } from "@/context/dataContext";
import Link from "next/link";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="fixed h-[65px] flex justify-between items-center py-9 md:py-12 px-6 xl:px-16 w-full bg-[rgba(255,255,255,0.3)] z-50 backdrop-blur-md headerbar shadow-[rgba(0,0,0,0.1)_0_1px_10px]">
      <Link href="/">
        <Logo />
      </Link>
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="text-3xl">
          &#9776;
        </button>
      </div>
      <div className="hidden md:flex">
        <Userbuttons />
      </div>
      {menuOpen && (
        <div className="absolute py-4  top-[5rem] right-6 w-[60%] bg-[#99c6bf] shadow-lg shadow-slate-400 backdrop-blur-3xl flex flex-col items-center md:hidden">
          <Userbuttons />
        </div>
      )}
    </div>
  );
}

function Logo() {
  return (
    <div className="m-2 flex justify-center items-center gap-4">
      <Image src={icon} alt="Icon" width={200} height={200} className="w-[3.5rem] lg:w-[4rem]" />
      <div className="py-3 text-2xl hidden md:block">Hairify</div>
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
    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
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
      <div className="text-xl py-2 px-4 border-2 border-black hover:border-b-2 hover:bg-gray-200 my-2 transition-all">
        {text}
      </div>
    </button>
  );
}
