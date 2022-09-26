import { AiOutlineCalendar, AiOutlineShoppingCart, AiOutlineAreaChart, AiOutlineBarChart, AiOutlineStock } from 'react-icons/ai';
import { FiShoppingBag, FiEdit, FiPieChart, FiBarChart, FiCreditCard, FiStar, FiShoppingCart } from 'react-icons/fi';
import { BsKanban, BsBarChart, BsBoxSeam, BsCurrencyDollar, BsShield, BsChatLeft } from 'react-icons/bs';
import { BiColorFill } from 'react-icons/bi';
import { IoMdContacts } from 'react-icons/io';
import { RiContactsLine, RiStockLine } from 'react-icons/ri';
import { MdOutlineSupervisorAccount } from 'react-icons/md';
import { HiOutlineRefresh } from 'react-icons/hi';
import { TiTick } from 'react-icons/ti';
import { GiLouvrePyramid } from 'react-icons/gi';
import { GrLocation } from 'react-icons/gr';

export const studentGrid = [
  { type: 'checkbox', width: '50' },
    {
      field: 'firstName',
      headerText: 'First Name',
      textAlign: 'Center',
      width: '100',
    },
    {
      field: 'lastName',
      headerText: 'Surname',
      textAlign: 'Center',
      width: '100',
    },
    {
      field: 'level',
      headerText: 'Level',
      textAlign: 'Center',
      width: '100',
    },
    {
      field: 'email',
      headerText: 'Email',
      textAlign: 'Center',
      width: '100',
    },
    {
      field: 'phone',
      headerText: 'Phone',
      textAlign: 'Center',
      width: '100',
    },
    {
      field: 'currentAverage',
      headerText: 'Current Average',
      textAlign: 'Center',
      width: '100',
    },
  ];
  
export const studentGrid2 = [
    {
      field: 'FirstName',
      headerText: 'First Name',
      textAlign: 'Center',
      width: '100',
    },
    {
      field: 'Surname',
      headerText: 'Surname',
      textAlign: 'Center',
      width: '100',
    },
    {
      field: 'Level',
      headerText: 'Level',
      textAlign: 'Center',
      width: '100',
    },
    {
      field: 'Email',
      headerText: 'Email',
      textAlign: 'Center',
      width: '100',
    },
    {
      field: 'Number',
      headerText: 'Number',
      textAlign: 'Center',
      width: '100',
    },
    {
      field: 'Current Average',
      headerText: 'CurrentAverage',
      textAlign: 'Center',
      width: '100',
    },
  ];
  
export const classGrid = [
  { type: 'checkbox', width: '50' },
    {
      field: 'client',
      headerText: 'Client',
      textAlign: 'Center',
      width: '100',
    },
    {
      field: 'group',
      headerText: 'Group',
      textAlign: 'Center',
      width: '100',
    },
    {
      field: 'startDate',
      headerText: 'Start Date',
      textAlign: 'Center',
      width: '100',
    },
    {
      field: 'endDate',
      headerText: 'End Date',
      textAlign: 'Center',
      width: '100',
    },
    {
      field: 'level',
      headerText: 'Level',
      textAlign: 'Center',
      width: '100',
    },
    {
      field: 'numberOfStudents',
      headerText: 'No. Of Students',
      textAlign: 'Center',
      width: '100',
    },
    {
      field: 'numberOfHours',
      headerText: 'Hours Per Week',
      textAlign: 'Center',
      width: '100',
    },
    
  ];

export const classPayrollGrid = [
    
      {
        field: 'client',
        headerText: 'Client',
        textAlign: 'Center',
        width: '100',
      },
      {
        field: 'date',
        headerText: 'Date',
        textAlign: 'Center',
        width: '100',
      },
      {
        field: 'sessionHours',
        headerText: 'Session Hours',
        textAlign: 'Center',
        width: '100',
      },
      {
        field: 'hourlyRate',
        headerText: 'Hourly Rate',
        textAlign: 'Center',
        width: '100',
      },
      {
        field: 'attendance',
        headerText: 'Attendance',
        textAlign: 'Center',
        width: '100',
      },
      {
        field: 'total',
        headerText: 'Total',
        textAlign: 'Center',
        width: '100',
      },
            
    ];
  
export const teacherGrid = [
  { type: 'checkbox', width: '50' },
    {
      field: 'IMAGE',
      headerText: 'IMAGE',
      textAlign: 'Center',
      width: '100',
    },
    {
      field: 'firstName',
      headerText: 'First Name',
      textAlign: 'Center',
      width: '100',
      
    },
    {
      field: 'lastName',
      headerText: 'Surname',
      textAlign: 'Center',
      width: '100',
    },
    {
      field: 'email',
      headerText: 'Email',
      textAlign: 'Center',
      width: '100',
    },
    {
      field: 'numberOfClasses',
      headerText: 'No. Of Classes',
      textAlign: 'Center',
      width: '120',
    },
    {
      field: 'phone',
      headerText: 'Phone ',
      textAlign: 'Center',
      width: '120',
    },
    {
      field: 'admin',
      headerText: 'Admin?',
      textAlign: 'Center',
      width: '100',
    },
  ];

export const adminGrid = [
    { type: 'checkbox', width: '50' },
      {
        field: 'IMAGE',
        headerText: 'IMAGE',
        textAlign: 'Center',
        width: '100',
      },
      {
        field: 'firstName',
        headerText: 'First Name',
        textAlign: 'Center',
        width: '100',
        
      },
      {
        field: 'lastName',
        headerText: 'Surname',
        textAlign: 'Center',
        width: '100',
      },
      {
        field: 'email',
        headerText: 'Email',
        textAlign: 'Center',
        width: '100',
      },
      {
        field: 'phone',
        headerText: 'Phone',
        textAlign: 'Center',
        width: '120',
      },
      
      
      
  ];

export const scheduleGrid = [
  { type: 'checkbox', width: '50' },
    {
      field: 'Monday',
      headerText: 'Monday',
      textAlign: 'Center',
      width: '100',
    },
    {
      field: 'Tuesday',
      headerText: 'Tuesday',
      width: '100',
      textAlign: 'Center',
    },
    { field: 'Wednesday',
      headerText: 'Wednesday',
      width: '100',
      textAlign: 'Center',
    },
    {
      field: 'Thursday',
      headerText: 'Thursday',
      textAlign: 'Center',
      width: '100'
    },
    {
      headerText: 'Friday',
      field: 'Friday',
      textAlign: 'Center',
      width: '100',
    },
    {
      field: 'Saturday',
      headerText: 'Saturday',
      width: '100',
      textAlign: 'Center',
    },
  
    {
      field: 'Sunday',
      headerText: 'Sunday',
      width: '100',
      textAlign: 'Center',
    },
  ];

export const languageLevels = [
  'A1',
  'A2',
  'B1',
  'B1+',
  'B2',
  'C1',
  'C2'
]

export const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]

export const barChartData = [
  [
    { x: 'Jan', y: 1300 },
    { x: 'Feb', y: 1456 },
    { x: 'Mar', y: 1234 },
    { x: 'Apr', y: 1678 },
    { x: 'May', y: 1234 },
    { x: 'Jun', y: 1234 },
    { x: 'July', y: 1789 },
  ],
  [
    { x: 'Jan', y: 896 },
    { x: 'Feb', y: 675 },
    { x: 'Mar', y: 978 },
    { x: 'Apr', y: 567 },
    { x: 'May', y: 876 },
    { x: 'Jun', y: 654 },
    { x: 'July', y: 567 },
  ],
];


export const barChartCustomSeries = [

  { dataSource: barChartData[0],
    xName: 'x',
    yName: 'y',
    name: 'Incoming',
    type: 'Column',
    background: 'blue',
  },

  { dataSource: barChartData[1],
    xName: 'x',
    yName: 'y',
    name: 'Outgoing',
    type: 'Column',
    background: 'red',
  },

];

export const overviewGrid = [
  { type: 'checkbox', width: '50' },
    {
      field: 'client',
      headerText: 'Client',
      textAlign: 'Center',
      width: '100',
    },
    {
      field: 'group',
      headerText: 'Group',
      textAlign: 'Center',
      width: '100',
    },
    {
      field: 'startTime',
      headerText: 'StartTime',
      textAlign: 'Center',
      width: '100',
    },
    {
      field: 'endTime',
      headerText: 'EndTime',
      textAlign: 'Center',
      width: '100',
    },
    {
      field: 'level',
      headerText: 'Level',
      textAlign: 'Center',
      width: '100',
    },
    {
      field: 'numberOfStudents',
      headerText: 'Number of Students',
      textAlign: 'Center',
      width: '100',
    },
    
  ];

  