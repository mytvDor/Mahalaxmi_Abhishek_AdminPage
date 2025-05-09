import { useState, useEffect } from "react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

export default function Navbar() {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState("/");

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  const isActive = (path) => {
    return currentPath === path;
  };

  const getNavLinkClass = (path) => {
    const baseClasses =
      "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-lime-400 hover:text-gray-900 focus:bg-lime-400 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50";

    return isActive(path)
      ? `${baseClasses} bg-lime-400 text-gray-900 dark:bg-gray-800 dark:text-gray-50`
      : `${baseClasses} bg-white dark:bg-gray-950`;
  };

  const getMobileLinkClass = (path) => {
    const baseClasses = "flex w-full items-center py-2 text-lg font-semibold";

    return isActive(path)
      ? `${baseClasses} text-lime-600 dark:text-lime-400`
      : baseClasses;
  };

  return (
    <header className="flex h-14 w-full shrink-0 items-center px-4 md:px-6 justify-between">
      {/* Website Logo and Name on the left */}
      <div className="flex items-center">
        <Link to="/" prefetch="false" className="flex items-center">
          <MountainIcon className="h-6 w-6 mr-2" />
          <span className="font-bold text-lg">WebCraft</span>
        </Link>
      </div>

      {/* Desktop Navigation - Center */}
      <NavigationMenu className="hidden lg:flex mx-auto">
        <NavigationMenuList>
          <NavigationMenuLink asChild>
            <Link to="/" className={getNavLinkClass("/")} prefetch="false">
              Home
            </Link>
          </NavigationMenuLink>

          <NavigationMenuLink asChild>
            <Link
              to="/booking"
              className={getNavLinkClass("/booking")}
              prefetch="false"
            >
              Book Abhishek
            </Link>
          </NavigationMenuLink>
          {/* 
          <NavigationMenuLink asChild>
            <Link
              to="/saree"
              className={getNavLinkClass("/saree")}
              prefetch="false"
            >
              Saree
            </Link>
          </NavigationMenuLink> */}

          {/* sareecode */}

          {/* <NavigationMenuLink asChild>
            <Link
              to="/services"
              className={getNavLinkClass("/services")}
              prefetch="false"
            >
              Services
            </Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <Link
              to="/portfolio"
              className={getNavLinkClass("/portfolio")}
              prefetch="false"
            >
              Portfolio
            </Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <Link
              to="/contact"
              className={getNavLinkClass("/contact")}
              prefetch="false"
            >
              Contact
            </Link>
          </NavigationMenuLink> */}
        </NavigationMenuList>
      </NavigationMenu>

      {/* Mobile Menu - Right Side */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="p-5">
          <div className="flex items-center mb-6">
            <MountainIcon className="h-6 w-6 mr-2" />
            <span className="font-bold text-lg">WebCraft</span>
          </div>
          <div className="grid gap-2 py-6">
            <Link to="/" className={getMobileLinkClass("/")} prefetch="false">
              Home
            </Link>
            <Link
              to="/booking"
              className={getMobileLinkClass("/booking")}
              prefetch="false"
            >
              Booking Abhishek
            </Link>
            {/* <Link
              to="/saree"
              className={getMobileLinkClass("/saree")}
              prefetch="false"
            >
              Ai
            </Link>
            <Link
              to="/services"
              className={getMobileLinkClass("/services")}
              prefetch="false"
            >
              Services
            </Link>
            <Link
              to="/portfolio"
              className={getMobileLinkClass("/portfolio")}
              prefetch="false"
            >
              Portfolio
            </Link>
            <Link
              to="/contact"
              className={getMobileLinkClass("/contact")}
              prefetch="false"
            >
              Contact
            </Link> */}
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
