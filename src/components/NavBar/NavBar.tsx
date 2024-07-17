"use client"

import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/navbar"
import { Button } from "@nextui-org/react"
import Link from "next/link"
import { useState } from "react"
import { NavBarProps } from "./NavBar.models"
import { signout } from "~/server/auth/signout"

const NavBar = ({name} : NavBarProps) =>{
    
    const [isMenuOpen, setIsMenuOpen] = useState(false)
   
    return (
        <Navbar onMenuOpenChange={setIsMenuOpen}>
          <NavbarContent>
            <NavbarMenuToggle
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="sm:hidden"
            />
            <NavbarBrand>
              <Link className="font-bold text-inherit" href={"/"}>Prometheus Manager</Link>
            </NavbarBrand>
          </NavbarContent>

          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <NavbarItem>
              <Link color="foreground" href="#">
                Features
              </Link>
            </NavbarItem>
            <NavbarItem isActive>
              <Link href="#" aria-current="page">
                Customers
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link color="foreground" href="#">
                Integrations
              </Link>
            </NavbarItem>
          </NavbarContent>
          { name !== undefined ? (
              <NavbarContent justify="end">{name}</NavbarContent>
            ) : (
            <NavbarContent justify="end">
              <NavbarItem className="hidden sm:flex">
                <Link href="/auth/login">Login</Link>
              </NavbarItem>
              <NavbarItem>
              <Button as={Link} color="primary" href="/auth/signup" variant="flat">
                  Sign Up
                </Button>
              </NavbarItem>
            </NavbarContent> )}
          <NavbarMenu>
            {name !== undefined ? (
              <NavbarMenuItem className="flex flex-col">
                <Link href={"/dashboard"}>Dashboard</Link>
                <div onClick={async()=>{await signout()}}>Log out</div>
              </NavbarMenuItem>
            ): (
                <NavbarMenuItem className="flex flex-col">
                <Link href={"/auth/login"}>Login</Link>
                <Link href={"/dashboard"}>Dashboard</Link>
                <Link href={"/info"}>Info</Link>
                </NavbarMenuItem>
            )}
          </NavbarMenu>
        </Navbar>
    )

}

export default NavBar