"use client";

import { useRouter } from "next/navigation";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button, Divider, divider } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import { NavBarProps } from "./NavBar.models";
import { CiLogout } from "react-icons/ci";
import { FaRegCircleUser } from "react-icons/fa6";
import axios from "axios";

const NavBar = ({ name }: NavBarProps) => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async () => {
    const req = axios.get("/api/auth/signout");
    const response = (await req).data;
    if (response.success) {
      location.reload();
    }
  };

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="bg-[#0a0a0a]">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link className="font-bold text-inherit" href={"/"}>
            Prometheus Manager
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {name !== undefined ? (
        <NavbarContent justify="end">
          <div className="mr-3 flex cursor-pointer flex-row text-white hover:text-gray-300">
            <FaRegCircleUser className="mr-1.5 mt-1" />
            <Link href={"/dashboard"}>My profile </Link>
          </div>
          <NavbarItem className="hidden sm:flex">
            <Button
              color="danger"
              variant="flat"
              onClick={async () => {
                handleSignOut();
              }}
            >
              <CiLogout className="" />
              Logout
            </Button>
          </NavbarItem>
        </NavbarContent>
      ) : (
        <NavbarContent justify="end">
          <NavbarItem className="hidden sm:flex">
            <Link href="/auth/login">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button
              as={Link}
              color="primary"
              href="/auth/signup"
              variant="flat"
            >
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      )}
      <NavbarMenu>
        {name !== undefined ? (
          <NavbarMenuItem className="flex flex-col">
            <Link href={"/dashboard"}>Dashboard</Link>
            <div
              onClick={async () => {
                await handleSignOut();
              }}
              className="flex flex-row"
            >
              <CiLogout className="mr-1 mt-1" />
              Log out
            </div>
          </NavbarMenuItem>
        ) : (
          <NavbarMenuItem className="flex flex-col">
            <Link href={"/auth/login"}>Login</Link>
            <Link href={"/dashboard"}>Dashboard</Link>
            <Link href={"/info"}>Info</Link>
          </NavbarMenuItem>
        )}
      </NavbarMenu>
    </Navbar>
  );
};

export default NavBar;
