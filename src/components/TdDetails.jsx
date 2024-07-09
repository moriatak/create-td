
import React, { useEffect, useState } from 'react';
import './TdDetails.css';

const TdDetails = ({tokenTd}) => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState('')
  const [nameProcess, setNameProcess] = useState('');
  const [title1, setTitle1] = useState('');
  const [title2, setTitle2] = useState('');
  const [description, setDescription] = useState('');
  const [description2, setDescription2] = useState('');
  const [logo, setLogo] = useState('');
  const [mail, setMail] = useState('');
//   const { updateIdProcess } = useData();
  const [error, setError] = useState(false);


  const handleChange = (event) => {
    setText(event.target.value);
  };


    useEffect(() => {
        getDataTd();
    }, [])

  // The function get data from sql
    const getDataTd = async (tokenTd = 'MLC') => { //todo delete defult
    if (loading) {
        return
    }
    setLoading(true);
    const searchParams = new URLSearchParams(window.location.search);
    const processId = searchParams.get('p_id')

    const apiKey = "7sKFf8@Af:+v4Ym|Ef*L^$8";
    const apiUrl = "https://tak.co.il/td/api/server.php";
    const formData = new FormData();
    // formData.append("get_data_of_start", "true");
    formData.append("get_data_of_start_by_id", "true");
    formData.append("apiKey", apiKey);
    formData.append("token", tokenTd);
    formData.append("p_id", processId);

    try {
        const response = await fetch(apiUrl, {
            method: "POST", body: formData,
        });
        if (response.ok) {
            const jsonResponse = await response.json();
            if (jsonResponse.success) {
                if (jsonResponse.message) {
                    const { Name, Kot1, Kot2, Description, Description2, Logo, TdSetID, EMailToEnd } = jsonResponse.message;
                    setNameProcess(Name);
                    setTitle1(Kot1);
                    setTitle2(Kot2);
                    setDescription(Description);
                    setDescription2(Description2)
                    setLogo(Logo);
                    setLoading(false);
                    // updateIdProcess(TdSetID);
                    setMail(EMailToEnd);
                }
            } else {
                setError(true);
             }
        } else {
            setError(true);
         }
    } catch (error) {
        console.log("error", error);
        setError(true);
    }
}

  return (
    <div className='container'>
        <div className='title'>הגדרות כלליות - תהליכים</div>
        <div>
            <div>שם פנימי לתהליך (לשימוש החברה בלבד):</div>
            <input
                type="text"
                value={nameProcess}
                onChange={(e)=> setNameProcess(e.target.value)}
            />
        </div>
    
        <div>
            <div>תמונת לוגו שתופיע בדף הקמפיין</div>
            <input
                type="text"
                value={logo}
                onChange={(e)=> setLogo(e.target.value)}
            />
        </div>
       
        <div>
            <div>בסיום התהליך, הטפסים החתומים ישלחו למייל הלקוח ולמייל הארגון, הכנס פה את מייל הארגון:</div>
            <input
                type="text"
                value={mail}
                onChange={(e)=> setMail(e.target.value)}
            />
       </div>
       
       <div>
            <div>כותרת לתהליך</div>
            <input
                type="text"
                value={title1}
                onChange={(e)=> setTitle1(e.target.value)}
            />
       </div>
       
       <div>
            <div>כותרת משנה</div>
            <input
                type="text"
                value={title2}
                onChange={(e)=> setTitle2(e.target.value)}
            />
       </div>
       
       <div>
            <div>טקסט הסבר לתחילת תהליך, להרשמה</div>
            <input
                type="text"
                value={description}
                onChange={(e)=> setDescription(e.target.value)}
            />
       </div>
       
       <div>
            <div>טקסט הסבר לטפסים</div>
            <input
                type="text"
                value={description2}
                onChange={(e)=> setDescription2(e.target.value)}
            />
       </div>

    </div>
    
  );
};

export default TdDetails;
