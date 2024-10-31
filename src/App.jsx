import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ListTds from './components/ListTDs'
import TdDetails from './components/TdDetails'

function App() {
  const [companyId, setCompanyId] = useState(null)

  useEffect(() => {
    // כשהאתר מוכן, הוא שולח להורה שלו (ל php)
    // שהוא מוכן ואז ההורה ישלח קוקיז לזיהוי
    window.parent.postMessage({ pageCreateTdLoaded: true }, "https://portal.tak.co.il");

    // Event listener for messages from the parent window
    // הפונקציה שקבלת את הקוקיז
    const messageHandler = (event) => {
      if (event.origin === 'https://portal.tak.co.il') { 
      if (event.data.cookieName) {
          // שמירת הקוקיז
          setCompanyId(event.data.cookieName);
        }
      }
    };

    window.addEventListener('message', messageHandler);
    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('message', messageHandler);
    };
  }, []);

  return (
    <>
    {/* <ListTds /> */}
     {/* <TdDetails />  */}
    {companyId ? <TdDetails companyId={companyId}/> : <>404 not found</>}
    </>
  )
}

export default App
