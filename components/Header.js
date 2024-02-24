import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useEffect, useState } from "react";
import { useAccount, useBalance } from "wagmi";
import Image from "next/image";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";
//
import { ParticleNetwork } from "@particle-network/auth";
import { EthereumSepolia } from "@particle-network/chains";
import { RiTwitterXLine } from "react-icons/ri";
import { FaGoogle } from "react-icons/fa";
//
const config = {
  projectId: process.env.REACT_APP_PROJECT_ID,
  clientKey: process.env.REACT_APP_CLIENT_KEY,
  appId: process.env.REACT_APP_APP_ID,
};

const particle = new ParticleNetwork({
  ...config,
  chainName: EthereumSepolia.name,
  chainId: EthereumSepolia.id,
  wallet: { displayWalletEntry: true, uiMode: "dark" },
});

particle.setERC4337(true);

const handleLogin = async (preferredAuthType) => {
  try {
    const user = !particle.auth.isLogin()
      ? await particle.auth.login({ preferredAuthType })
      : particle.auth.getUserInfo();
    setUserInfo(user);
  } catch (error) {
    console.error(error);
    setUserInfo(null);
  }
};

const handleLogout = async () => {
  try {
    await particle.auth.logout();
    setUserInfo(null);
  } catch (error) {
    console.error(error);
    setUserInfo(null);
  }
};
//
export default function Header() {
  const [userInfo, setUserInfo] = useState(null);

  return (
    <nav className="bg-heroImage bg-cover bg-center height: 60px p-3 border-b-2 flex flex-row justify-between items-center ">
      <div className="flex-none gap-4 items-center">
        <Image
          className="float-left"
          src="/2024 year of the dragon.png"
          alt="2024 year of the dragon logo"
          height={100}
          width={100}
        />
        <Link className="justify-between items-center " as={NextLink} href="/">
          <h1 className="pt-6 px-6 font-bold text-3xl float-left">
            Dragon Mint
          </h1>
        </Link>
      </div>

      <div>
        {!userInfo ? (
          <div>
            <button onClick={() => handleLogin("google")}>
              <FaGoogle />
            </button>
            <button onClick={() => handleLogin("twitter")}>
              <RiTwitterXLine />
            </button>
          </div>
        ) : (
          <div>
            <button onClick={() => handleLogout()}>Logout</button>
          </div>
        )}
      </div>

      <div className="flex-none gap-4 items-center">
        <ConnectButton className="p-5 border-b-8  flex flex-row justify-between items-center float-right" />
      </div>
    </nav>
  );
}
