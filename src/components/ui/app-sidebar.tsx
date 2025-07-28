import { useState, useEffect } from "react";
import { Link } from "react-router";
import { FaBars, FaBoxOpen, FaChartPie, FaFileAlt, FaLock, FaTags, FaUserTie } from "react-icons/fa";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import {
  FaHome,
  FaUsers,
  FaShoppingCart,
} from "react-icons/fa";
export function AppSidebar() {
  const [open, setOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 768;
      setIsDesktop(desktop);
      if (!desktop) {
        setExpanded(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const links = [
    {
      to: "/dashboard",
      icon: <FaHome className="h-5 w-5" />,
      label: "Dashboard",
    },
    {
      to: "/sellers",
      icon: <FaUserTie className="h-5 w-5" />, 
      label: "Sellers",
    },
    {
      to: "/customers",
      icon: <FaUsers className="h-5 w-5" />, 
      label: "Customers",
    },
    {
      to: "/employees",
      icon: <FaUserTie className="h-5 w-5" />, 
      label: "Employees",
    },
    {
      to: "/orders",
      icon: <FaShoppingCart className="h-5 w-5" />, 
      label: "Orders",
    },
    {
      to: "/products",
      icon: <FaBoxOpen className="h-5 w-5" />, 
      label: "Products",
    },
    {
      to: "/statistics",
      icon: <FaChartPie className="h-5 w-5" />, 
      label: "Statistics",
    },
    {
      to: "/reports",
      icon: <FaFileAlt className="h-5 w-5" />, 
      label: "Reports",
    },
    {
      to: "/categories",
      icon: <FaTags className="h-5 w-5" />,
      label: "Categories",
    },
      {
    to: "/permissions",
    icon: <FaLock className="h-5 w-5" />,
    label: "Permissions",
  },
  ];

  const SidebarLinks = ({ showText }: { showText: boolean }) => {
    return (
      <div className="flex flex-col p-4 space-y-2">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`flex items-center gap-2 p-2 rounded-md transition-all duration-200 hover:bg-gray-100 ${
              showText ? "justify-start" : "justify-center"
            }`}
          >
            {link.icon}
            {showText && (
              <span className="text-sm font-medium">{link.label}</span>
            )}
          </Link>
        ))}
      </div>
    );
  };

  return (
    <div className="flex">
      {!isDesktop && (
        <>
          <button
            onClick={() => setOpen(true)}
            className="fixed top-4 left-4 z-50 p-2 rounded-md border border-gray-300 bg-white shadow-md"
          >
            <FaBars className="h-5 w-5" />
          </button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent side="left" className="p-0 w-64">
              <SidebarLinks showText={true} />
            </SheetContent>
          </Sheet>
        </>
      )}

      {isDesktop && (
        <div
          className={`h-screen relative bg-white border-r shadow-md transition-all duration-300 ${
            expanded ? "w-64" : "w-16"
          }`}
        >
          <button
            onClick={() => setExpanded(!expanded)}
            className={`p-1 absolute top-4 transform duration-300 -translate-x-1/2 cursor-pointer ${
              expanded ? "left-64" : "left-16"
            }`}
          >
            <FaRegArrowAltCircleRight
              className={`transition-transform ${expanded ? "rotate-180" : ""}`}
            />
          </button>
          <SidebarLinks showText={expanded} />
        </div>
      )}
    </div>
  );
}
