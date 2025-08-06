/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import FloatingDeck from "./ui/FloatingDeck";
import { Home, User } from "lucide-react";
import { MdAssistant } from "react-icons/md";

const NavItems = () => {
  const pathName = usePathname();
  // const navItems = [
  //   { label: "Home", href: "/" },
  //   { label: "Companions", href: "/companions" },
  //   { label: "My Journey", href: "/my-journey" },
  // ];
  const navItems: any = [
    {
      title: "Home",
      href: "/",
      icon: (
        <Home className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
    },

    {
      title: "Companions",
      href: "/companions",
      icon: (
        <MdAssistant className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
    },
    {
      title: "My journey",
      href: "/",
      icon: (
        <User className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
    },
  ];
  return (
    // <nav className="flex items-center gap-5">
    //   {navItems?.map(({ label, href }) => (
    //     <Link
    //       className={cn(
    //         pathName === href && " font-semibold text-primary_color"
    //       )}
    //       href={href}
    //       key={label}
    //     >
    //       {label}
    //     </Link>
    //   ))}
    // </nav>
    <div className="mt-5">
      <FloatingDeck items={navItems} />
    </div>
  );
};

export default NavItems;
