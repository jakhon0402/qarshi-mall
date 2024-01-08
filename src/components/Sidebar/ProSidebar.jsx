import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { useDispatch } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { sidebarMenus } from "./data";
import { uniqueId } from "lodash";
import { logout } from "../../pages/Login/authSlice";
import Logo from "../Logo";

const ProSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const currPath = useLocation().pathname;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className='relative h-[calc(100vh_-_0px)] flex flex-none'>
      <button
        onClick={() => setCollapsed(!collapsed)}
        className='absolute top-[130px] right-0 translate-x-[50%] z-50 bg-primary p-1 rounded-full'
      >
        {collapsed ? (
          <ChevronRightIcon className='w-[15px] stroke-[2px] stroke-white' />
        ) : (
          <ChevronLeftIcon className='w-[15px] stroke-[2px] stroke-white' />
        )}
      </button>
      <Sidebar
        collapsed={collapsed}
        width={"230px"}
        rootStyles={{ overflow: "visible", zIndex: "1" }}
        className='flex flex-col h-full gap-5 font-madefor'
      >
        <Menu
          className='flex flex-col h-full relative'
          menuItemStyles={{
            root: {
              fontSize: "14px",
              fontWeight: 400,
            },
            button: ({ level, active, disabled }) => {
              // only apply styles on first level elements of the tree
              if (level === 0)
                return {
                  "&:hover": {
                    backgroundColor: active ? "#1A38304D" : "#1A38304D",
                    color: !active ? "#1A3830" : "#1A3830",
                  },
                  //   padding: "30px",

                  color: active ? "#1A3830" : "#1A3830",
                  backgroundColor: active ? "#1A383026" : undefined,
                };
            },
          }}
        >
          <div className='flex justify-center items-center mx-5 mt-10 mb-10'>
            <div className='bg-primary w-fit p-2 rounded-2xl'>
              {" "}
              <Logo width='40px' height='40px' />
            </div>
            {/* <img
              className={
                collapsed ? "w-[150px] rounded-lg shadow-xl" : "w-[150px]"
              }
              src={!collapsed ? logo1 : logo2}
            /> */}
          </div>
          {sidebarMenus.map((el, index) => (
            <MenuItem
              style={{ fontWeight: "bolder" }}
              key={uniqueId()}
              active={currPath.startsWith(el.pathName)}
              component={<NavLink to={el.pathName} />}
              icon={el.icon}
            >
              {el.name}
            </MenuItem>
          ))}

          <div
            style={{ justifyContent: collapsed ? "center" : "start" }}
            className='flex items-center absolute bottom-0 w-full px-8 py-5'
          >
            <button
              onClick={() => {
                dispatch(logout());
                navigate("/login");
              }}
              className='flex flex-row items-center gap-3'
            >
              <div className='p-2 bg-sakiyna-400 rounded-full text-primary'>
                <ArrowRightOnRectangleIcon className='w-[20px] stroke-[1.8px]' />
              </div>
              {!collapsed && (
                <span className='text-[14px] font-bold'>Chiqish</span>
              )}
            </button>
          </div>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default ProSidebar;
