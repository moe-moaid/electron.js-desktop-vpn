import React, {useContext} from 'react';
import { activeTabContext } from '../context/contextDefine';
import About from './settings-tabs/aboutUs';
import Protocol from './settings-tabs/protocolSettings';
import General from './settings-tabs/generalSettings';

export default function RenderSettings() {
  const {activeSetting} = useContext(activeTabContext);
  return (
    <div className=' w-full'>
      {
        activeSetting === 'general' ? <General /> : activeSetting === 'protocol' ? <Protocol /> :  <About />
      }
    </div>
  )
}