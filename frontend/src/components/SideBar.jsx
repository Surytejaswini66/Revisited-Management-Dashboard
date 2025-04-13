import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom"; // 🆕 Added Outlet
import { BiChat } from "react-icons/bi";
import { FaBell, FaSearch, FaChevronDown, FaChevronRight, FaCogs } from "react-icons/fa";
import { FiTable } from "react-icons/fi";
import { GoGraph } from "react-icons/go";
import { MdOutlineHeadsetMic, MdSpaceDashboard } from "react-icons/md";
import { TbLayoutSidebarLeftCollapse, TbLayoutSidebarLeftExpand } from "react-icons/tb";
import { TiCalendar } from "react-icons/ti";

const SideBar = () => {
  const [open, setOpen] = useState(true);
  const [subMenus, setSubMenus] = useState({
    inbox: false,
    settings: false,
    info: false, // 🆕 added for "Other Information"
  });

  const toggleSubMenu = (menu) => {
    setSubMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const Menus = [
    { title: "Dashboard", icon: <MdSpaceDashboard />, path: "/dashboard" },
    { title: "Products", icon: <FiTable />, path: "/products" },
    { title: "Categories", icon: <TiCalendar />, path: "/categories" },
    { title: "Customers", icon: <MdOutlineHeadsetMic />, path: "/customers" },
    { title: "Reports", icon: <GoGraph />, path: "/reports" },
    { title: "Coupons", icon: <FaCogs />, path: "/coupons" },
    {
      title: "Inbox",
      icon: <BiChat />,
      subMenu: [
        { name: "Requested Messages", path: "/inbox/requested" },
        { name: "Unread Messages", path: "/inbox/unread" },
        { name: "All Messages", path: "/inbox/all" },
      ],
      key: "inbox",
    },
    {
      title: "Other Information",
      icon: <MdOutlineHeadsetMic />,
      subMenu: [
        { name: "Knowledge Base", path: "/info/knowledge-base" },
        { name: "Product Updates", path: "/info/product-updates" },
      ],
      key: "info",
    },
    {
      title: "Settings",
      icon: <FaCogs />,
      subMenu: [
        { name: "Personal Settings", path: "/settings/personal" },
        { name: "Global Settings", path: "/settings/global" },
      ],
      key: "settings",
    },
  ];

  return (
    <div className="w-full flex">
      {/* Sidebar */}
      <div className={`${open ? "w-72 p-5" : "w-20 p-4"} bg-zinc-900 h-screen pt-8 relative duration-300 ease-in-out`}>
        <div
          className={`absolute cursor-pointer -right-4 top-9 w-8 h-8 p-0.5 bg-zinc-50 border-zinc-50 border-2 rounded-full text-xl flex items-center justify-center ${!open && "rotate-180"} transition-all ease-in-out duration-300`}
          onClick={() => setOpen(!open)}
        >
          {open ? <TbLayoutSidebarLeftExpand /> : <TbLayoutSidebarLeftCollapse />}
        </div>

        <div className="flex gap-x-4 items-center">
          <img
            src="https://cdn.pixabay.com/photo/2017/02/18/19/20/logo-2078018_640.png"
            alt="logo"
            className={`w-10 h-10 rounded-full object-cover object-center cursor-pointer ease-in-out duration-3 ${open && "rotate-[360deg]"}`}
          />
          <h1 className={`text-zinc-50 origin-left font-semibold text-xl duration-200 ease-in-out ${!open && "scale-0"}`}>
            Admin Dashboard
          </h1>
        </div>

        <ul className="pt-6 space-y-0.5">
          {Menus.map((Menu, index) => (
            <li key={index} className={`flex flex-col rounded-md py-3 px-4 cursor-pointer text-zinc-50 hover:bg-zinc-800/50 transition-all duration-300 ${Menu.gap ? "mt-9" : "mt-2"}`}>
              <div
                className="flex items-center justify-between gap-x-4"
                onClick={() => Menu.subMenu ? toggleSubMenu(Menu.key) : null}
              >
                <Link to={Menu.path || "#"} className="flex items-center gap-2">
                  <span className="text-lg">{Menu.icon}</span>
                  <span className={`${!open && "hidden"}`}>{Menu.title}</span>
                </Link>
                {Menu.subMenu && (
                  <span className="ml-auto">
                    {subMenus[Menu.key] ? <FaChevronDown /> : <FaChevronRight />}
                  </span>
                )}
              </div>

              {Menu.subMenu && subMenus[Menu.key] && (
                <ul className="pl-3 pt-4 text-zinc-300">
                  {Menu.subMenu.map((subItem, subIndex) => (
                    <Link key={subIndex} to={subItem.path}>
                      <li className="text-sm flex items-center gap-x-2 py-3 px-2 hover:bg-zinc-800 rounded-lg">
                        <FaChevronRight className="text-xs" />
                        {subItem.name}
                      </li>
                    </Link>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Main layout */}
      <div className="h-screen flex-1 bg-zinc-100 space-y-6 overflow-auto">
        <div className="w-full h-[8ch] px-12 bg-zinc-50 shadow-md flex items-center justify-between">
          <div className="w-96 border border-zinc-300 rounded-full h-11 flex items-center justify-center">
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 h-full rounded-full outline-none border-none bg-zinc-50 px-4"
            />
            <button className="px-4 h-full flex items-center justify-center text-base text-zinc-600 border-l border-zinc-300">
              <FaSearch />
            </button>
          </div>
          <div className="flex items-center gap-x-8">
            <button className="relative">
              <div className="w-5 h-5 bg-zinc-50 flex items-center justify-center absolute -top-1.5 -right-2.5 rounded-full p-0.5">
                <span className="bg-red-600 text-white rounded-full w-full h-full flex items-center justify-center text-xs">3</span>
              </div>
              <FaBell className="text-xl" />
            </button>
            <img
              src="https://cdn.pixabay.com/photo/2016/11/21/11/17/model-1844729_640.jpg"
              alt="profile"
              className="w-11 h-11 rounded-full object-cover object-center cursor-pointer"
            />
          </div>
        </div>

        <div className="w-full px-12">
          <Outlet /> {/* 🆕 render nested routes */}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
