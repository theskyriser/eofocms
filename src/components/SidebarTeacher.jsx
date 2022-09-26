import React from 'react'

import {Link, NavLink} from 'react-router-dom'
import {SiShopware} from 'react-icons/si'
import {MdOutlineCancel} from 'react-icons/md'
import { TooltipComponent } from '@syncfusion/ej2-react-popups'
import { Adminlinks, TeacherLinks } from '../data/links'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux/es/exports'
import { activeMenuAction } from '../redux/actions/appState'
import {ReactComponent as EELogo} from '../images/eelogosvg.svg'

const SidebarTeacher = () => {
  const dispatch = useDispatch()
  const activeMenu = useSelector(state => state.appState.activeMenu);
  const currentColor = useSelector(state => state.appState.currentColor);
  const screenSize = useSelector(state => state.appState.screenSize);

  const handleCloseSideBar = () => {
    if(activeMenu && screenSize <= 900) {
      dispatch(activeMenuAction(false))
    }
  } 

  const activeLink = "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2"
  const normalLink = "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-gray-700 text-md dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2"
  return (
    <div className='ml-3 h-screen md:overflow-hidden 
    overflow-auto md:hover:overflow-auto pb-10 dark:bg-secondary-dark-bg'>
      {activeMenu && (<> 
      <div className='flex justify-between 
      items-center'>
        <Link to="/"  onClick={() => handleCloseSideBar} className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"> 
          <EELogo/> <span> English From England </span>
        </Link>
        
        <TooltipComponent content="Menu" position='BottomCenter'>
          <button type="button" onClick={() => dispatch(activeMenuAction(!activeMenu))} 
          className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden">
            <MdOutlineCancel/>
          </button>
        </TooltipComponent>
        
      </div>
      <div className='font-semibold text-center'>
        <span> TEACHER </span>
      </div>
     
      <div className='mt-10'>
        {TeacherLinks.map((item) => (
          <div key={item.title}>
            <p className='text-gray-400 m-3 mt-4 uppercase'>
              {item.title}
            </p>
            {item.links.map((link) => (
              <NavLink to={`/teacher/${link.link}`} key={link.link} onClick={() => handleCloseSideBar} 
              style={({isActive}) => ({backgroundColor: isActive ? currentColor: ''})}
              className={({isActive}) => (
                isActive ? activeLink : normalLink
            )}>
                {link.icon}
                <span className="capitalize">
                  {link.name}
                </span>
              </NavLink>
            ))}
          </div>
        ))}
      </div>
        </>)}
    </div>
  )
}

export default SidebarTeacher