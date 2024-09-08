"use client";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";

const Navbar = () => {
  const currentPath = usePathname();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <nav className="flex items-center border-b h-14 gap-5 ml-5">
      <AiFillBug className="text-2xl text-black" size={25} />

      <ul className="flex gap-3">
        {links.map((link) => (
          <li
            key={link.label}
            className={classNames(
              "text-base font-medium",
              currentPath === link.href ? "text-zinc-900" : "text-zinc-500",
              "hover:text-zinc-800 transition-colors"
            )}
          >
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
