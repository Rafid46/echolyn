"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavItems = () => {
  const pathName = usePathname();
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Companions", href: "/companion" },
    { label: "My Journey", href: "my-journey" },
  ];
  return (
    <nav className="flex items-center gap-5">
      {navItems?.map(({ label, href }) => (
        <Link
          className={cn(
            pathName === href && " font-semibold text-primary_color"
          )}
          href={href}
          key={label}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
};

export default NavItems;
