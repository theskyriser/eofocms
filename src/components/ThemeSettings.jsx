import React from 'react'
import {MdOutlineCancel} from 'react-icons/md'
import {BsCheck} from 'react-icons/bs'
import { TooltipComponent } from '@syncfusion/ej2-react-popups'

import {themeColors} from '../data/dummy'
import { useSelector } from 'react-redux/es/exports'
import { useDispatch } from 'react-redux'
import { setColor } from '@syncfusion/ej2/treemap'

import { setThemeSettingsAction } from '../../../SchoolApp/src/redux/actions/appState'
import { setScreenSizeAction } from '../../../SchoolApp/src/redux/actions/appState'
import { setCurrentColorAction } from '../../../SchoolApp/src/redux/actions/appState'
import { setCurrentModeAction } from '../../../SchoolApp/src/redux/actions/appState'

const ThemeSettings = () => {

  const currentMode = useSelector(state => state.appState.currentMode)
  const currentColor = useSelector(state => state.appState.currentColor)
  const dispatch = useDispatch()
  

  return (
    <div className='bg-half-transparent w-screen fixed nav-item top-0 right-0'>
      <div className='float-right h-screen dark:text-gray-200 bg-white dark:[#484B52] w-400'>
        <div className='flex justify-between items-center p-4 ml-4'>
          <p className='font-semibold text-xl'>
            Settings
          </p>
          <button type="button" onClick={() => dispatch(setThemeSettingsAction(false))} style={{color: "rgb(153, 171, 180)", borderRadius: '50%'}} className="text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray">
            <MdOutlineCancel/>
          </button>
        </div>
        <div className='fex-col  border-t-1 border-color p-4 ml-4'>
          <p className='font-semibold text-lg'>
            Theme Options
          </p>

          <div className='mt-4'>
            <input type="radio" id="light" name="theme" value="Light" className='cursor-pointer' onChange={(e) => dispatch(setCurrentModeAction(e))} checked={currentMode === 'Light'}/>
            <label htmlFor='light' className='ml-2 text-lg cursor-pointer'>
                Light
            </label>
          </div>

          <div className='mt-4'>
            <input type="radio" id="dark" name="theme" value="Dark" className='cursor-pointer' onChange={(e) => dispatch(setCurrentModeAction(e))} checked={currentMode === 'Dark'}/>
            <label htmlFor='dark' className='ml-2 text-lg cursor-pointer'>
                Dark
            </label>
          </div>
        </div>
        <div className='fex-col  border-t-1 border-color p-4 ml-4'>
          <p className='font-semibold text-lg'>
            Theme Colours
          </p>
          <div className='flex gap-3'>
            {themeColors.map((item, index) => (
              <TooltipComponent key={index} content={item.name} position='TopCenter'>
                <div className='relative mt-2 cursor-pointer flex gap-5 items-center'>
                  <button type="button" className='h-10 w-10 rounded-full cursor-pointer' style={{backgroundColor: item.color}} onClick={() => dispatch(setCurrentColorAction(item.color))}>
                    <BsCheck className={`ml-2 text-2xl text-white ${item.color === currentColor ? 'block' : 'hidden'}`}/>
                  </button>
                </div>
              </TooltipComponent>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThemeSettings