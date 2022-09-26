import { AiOutlineCalendar, AiOutlineShoppingCart, AiOutlineAreaChart, AiOutlineBarChart, AiOutlineStock } from 'react-icons/ai';
import { FiShoppingBag, FiEdit, FiPieChart, FiBarChart, FiCreditCard, FiStar, FiShoppingCart } from 'react-icons/fi';
import { BsKanban, BsBarChart, BsBoxSeam, BsCurrencyDollar, BsShield, BsChatLeft } from 'react-icons/bs';
import { BiColorFill, BiUser, BiCollection } from 'react-icons/bi';
import { IoMdContacts } from 'react-icons/io';
import { RiContactsLine, RiStockLine, RiMoneyDollarCircleLine, RiFolder2Line } from 'react-icons/ri';
import { MdOutlineSupervisorAccount, MdAssignment, MdOutlineAdminPanelSettings, MdOutlineAccessibilityNew } from 'react-icons/md';
import { HiOutlineRefresh } from 'react-icons/hi';
import { TiTick } from 'react-icons/ti';
import { GiLouvrePyramid } from 'react-icons/gi';
import { GrLocation } from 'react-icons/gr';

export const Adminlinks = [
    {
      title: 'Dashboard',
      links: [
        {
          name: 'Overview',
          link: 'overview',
          icon: <MdAssignment/>,
        },
        {
          name: 'Admin Profile',
          link: 'adminprofile',
          icon: <MdOutlineAdminPanelSettings />,
        },
      ],
    },
  
    {
      title: 'Monitor',
      links: [
        {
          name: 'Students',
          link: 'students',
          icon: <MdOutlineAccessibilityNew />,
        },
        {
          name: 'Teachers',
          link: 'teachers',
          icon: <BiUser />,
        },
        {
          name: 'Classes',
          link: 'classes',
          icon: <BiCollection />,
        },
      ],
    },
    {
      title: 'Financials',
      links: [
        {
          name: 'Financial Center',
          link: 'financialcenter',
          icon: <RiMoneyDollarCircleLine />,
        },
      ],
    },
    {
      title: 'Files',
      links: [
        {
          name: 'Teachers Box',
          link: 'teachersboxadmin',
          icon: <RiFolder2Line />,
        },
      ],
    },
  ];

  export const TeacherLinks = [
    {
      title: 'Dashboard',
      links: [
        {
          name: 'Overview',
          link: 'overview',
          icon: <MdAssignment/>,
        },
        {
          name: 'Teacher Profile',
          link: 'teacherprofile',
          icon: <MdOutlineAdminPanelSettings />,
        },
      ],
    },
  
    {
      title: 'Teachers Tools',
      links: [
        {
          name: 'My Students',
          link: 'mystudents',
          icon: <MdOutlineAccessibilityNew />,
        },
        {
          name: 'My Classes',
          link: 'myclasses',
          icon: <BiUser />,
        },
        {
          name: 'My Payroll',
          link: 'mypayroll',
          icon: <BiCollection />,
        },
      ],
    },
    {
      title: 'Files',
      links: [
        {
          name: 'Teachers Box',
          link: 'teachersboxteacher',
          icon: <RiFolder2Line />,
        },
      ],
    },
  ];