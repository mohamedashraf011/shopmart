"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ChangePassword from "@/app/_components/ChangePassword/ChangePassword";
import { useCartContext } from "@/app/context/CartContext";

export default function Navbar() {
  const { data: session, status } = useSession();
  const { cartItemsCount } = useCartContext();
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  return (
    <div className="bg-gray-200 py-5 shadow-md">
      <div className="flex items-center justify-between w-[90%] mx-auto container">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-bag-shopping text-2xl"></i>
          <Link href="/" className="font-medium text-2xl">ShopMart</Link>
        </div>

        <ul className="flex items-center gap-4">
          <li>
            <Link href="/product" className="text-xl nav-hover">
              Products
            </Link>
          </li>
          <li>
            <Link href="/brands" className="text-xl nav-hover">
              Brands
            </Link>
          </li>
          <li>
            <Link href="/categories" className="text-xl nav-hover">
              Categories
            </Link>
          </li>
        </ul>

        <ul className="flex items-center gap-4">
          {status === "authenticated" ? (
            <>
              <li>
                <Link href="/cart" className="relative nav-hover">
                  <i className="fa-solid fa-shopping-cart text-xl"></i>
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                      {cartItemsCount > 99 ? '99+' : cartItemsCount}
                    </span>
                  )}
                </Link>
              </li>
              <li>
                <Link href="/orders" className="nav-hover">
                  <i className="fa-solid fa-box text-xl"></i>
                </Link>
              </li>
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 nav-hover cursor-pointer">
                      <i className="fa-solid fa-user text-xl"></i>
                      <span>Hi {session?.user?.name}</span>
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="end"
                    className="bg-white border border-gray-200 shadow-xl"
                  >
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      onClick={() => setIsChangePasswordOpen(true)}
                      className="cursor-pointer rounded-md hover:bg-gray-100 focus:bg-gray-100 transition-colors duration-150"
                    >
                      <i className="fa-solid fa-key mr-2"></i>
                      Change Password
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="cursor-pointer rounded-md hover:bg-gray-100 focus:bg-gray-100 transition-colors duration-150 text-red-600"
                    >
                      <i className="fa-solid fa-sign-out-alt mr-2"></i>
                      LogOut
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            </>
          ) : (
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button>
                    <i className="fa-solid fa-user text-xl cursor-pointer"></i>
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="bg-white border border-gray-200 shadow-xl"
                >
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    asChild
                    className="cursor-pointer rounded-md hover:bg-gray-100 focus:bg-gray-100 transition-colors duration-150"
                  >
                    <Link href="/login">Login</Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    asChild
                    className="cursor-pointer rounded-md hover:bg-gray-100 focus:bg-gray-100 transition-colors duration-150"
                  >
                    <Link href="/signup">Sign Up</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          )}
        </ul>
      </div>

      <ChangePassword 
        isOpen={isChangePasswordOpen} 
        onClose={() => setIsChangePasswordOpen(false)} 
      />
    </div>
  );
}
