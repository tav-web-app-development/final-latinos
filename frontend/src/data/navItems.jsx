import { IoSettings } from "react-icons/io5";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";

const navMenu = [
    {
        name: "Dashboard",
        icon: <MdDashboard size='30'/>,
        path: '/'
    },
    {
        name: "Reports",
        icon: <HiOutlineDocumentReport size='30'/>,
        path: '/reports'
    },
    {
        name: "Settings",
        icon: <IoSettings size='30'/>,
        path: '/settings'
    }
]

export default navMenu