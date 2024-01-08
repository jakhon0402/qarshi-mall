import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChartBarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Squares2X2Icon,
  UserGroupIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

export const sidebarMenus = [
  {
    pathName: "/incomes",
    name: "Kirim",
    icon: <ArrowDownIcon className='w-[21px] stroke-[1.5px]' />,
  },
  {
    pathName: "/outgoings",
    name: "Chiqim",
    icon: <ArrowUpIcon className='w-[21px] stroke-[1.5px]' />,
  },
  {
    pathName: "/statistics",
    name: "Statistika",
    icon: <ChartBarIcon className='w-[21px] stroke-[1.5px]' />,
  },
  {
    pathName: "/categories",
    name: "Kategoriyalar",
    icon: <Squares2X2Icon className='w-[21px] stroke-[1.5px]' />,
  },
  {
    pathName: "/employees",
    name: "Xodimlar",
    icon: <UserGroupIcon className='w-[21px] stroke-[1.5px]' />,
  },
  {
    pathName: "/inventory",
    name: "Inventory",
    icon: <WrenchScrewdriverIcon className='w-[21px] stroke-[1.5px]' />,
  },
];