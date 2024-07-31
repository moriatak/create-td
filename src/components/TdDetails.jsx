
import React, { useEffect, useState } from 'react';
import './TdDetails.css';
import Modal from './Modal';

const TdDetails = ({tokenTd}) => {  
    const [textModal, setTextModal] = useState('');
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

    const [errorsMsg, setErrorsMsg] = useState({});

    const validateInput = (name, value, type) => {
        const textRegex = /^[a-zA-Z\s\u0590-\u05FF0-9.,!?*&)(]+$/;
        const mailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        let error = '';
        if(type == 'text'){
            return textRegex.test(value);
        } else if(type == 'email' ){
            error = mailRegex.test(value) ? '' : 'מייל לא תקין';
        }
        setErrorsMsg((prevErrors) => ({ ...prevErrors, [name]: error }));
    }

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        const validate = validateInput(name, value, type);
        if(type == 'text' && value != '' && !validate){
            return
        }
        if (name === 'nameProcess') setNameProcess(value);
        else if (name === 'mail') setMail(value);
        else if (name === 'title1') setTitle1(value);
        else if (name === 'title2') setTitle2(value);
        else if (name === 'description') setDescription(value);
        else if (name === 'description2') setDescription2(value);
    }

    const validateExistAllData = () => {
        let tempErrors = {};

        if (!nameProcess) tempErrors.nameProcess = "שם פנימי נדרש";
        if (!mail) tempErrors.mail = "מייל נדרש";
        else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(mail)) tempErrors.mail = "מייל לא תקין";
        if (!title1) tempErrors.title1 = "כותרת נדרשת";
        if (!title2) tempErrors.title2 = "כותרת משנה נדרשת";
        if (!description) tempErrors.description = "טקסט הסבר נדרש";
        if (!description2) tempErrors.description2 = "טקסט הסבר לטפסים נדרש";

        setErrorsMsg(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleChange = (event) => {
        const [value, name, type] = event
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
                        // setFormData(jsonResponse.message)
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

    // The function get data from sql
    const saveDB = async (tokenTd = 'MLC') => { //todo delete defult
        if (loading) {
            return
        }
        setLoading(true);
        const dataExist = validateExistAllData();
        if(!dataExist){
            setLoading(false);
            return
        }
        const searchParams = new URLSearchParams(window.location.search);
        const processId = searchParams.get('p_id')

        const apiKey = "7sKFf8@Af:+v4Ym|Ef*L^$8";
        const apiUrl = "https://tak.co.il/app/takzivit/portal/pages/admin_page/processes/settings_process/server.php";
        const formData = new FormData();
        // formData.append("get_data_of_start", "true");
        formData.append("update_settings", "true");
        formData.append("apiKey", apiKey);
        formData.append("token", tokenTd);
        formData.append("p_id", processId);
        const dataSettings = {
            Name: nameProcess,
            Kot1: title1,
            Kot2: title2,
            Description: description,
            Description2: description2,
            Logo: logo,
            EMailToEnd: mail
        }
        formData.append("dataSettings", JSON.stringify(dataSettings));

        try {
            const response = await fetch(apiUrl, {
                method: "POST", body: formData,
            });
            if (response.ok) {
                const jsonResponse = await response.json();
                if (jsonResponse.success) {
                    setTextModal('המידע נשמר בהצלחה');
                    setLoading(false);
                } else {
                    setError(true);
                    setLoading(false);
                }
            } else {
                setError(true);
                setLoading(false);
            }
        } catch (error) {
            console.log("error", error);
            setError(true);
            setLoading(false);
        }
    }

    return (
        <div className='container'>
            <div className='title'>הגדרות כלליות - תהליכים</div>
            <div>
                <div>שם פנימי לתהליך (לשימוש החברה בלבד):</div>
                <input
                    type="text"
                    name="nameProcess"
                    value={nameProcess}
                    onChange={handleInputChange}
                />
                {errorsMsg.nameProcess && <span className="error">{errorsMsg.nameProcess}</span>}
            </div>
        
            {/* <div>
                <div>תמונת לוגו שתופיע בדף הקמפיין</div>
                <input
                    type="text"
                    value={logo}
                    onChange={(e)=> setLogo(e.target.value)}
                />
            </div> */}
        
            <div>
                <div>בסיום התהליך, הטפסים החתומים ישלחו למייל הלקוח ולמייל הארגון, הכנס פה את מייל הארגון:</div>
                <input
                    type="email"
                    value={mail}
                    name='mail'
                    onChange={handleInputChange}
                />
                {errorsMsg.mail && <span className="error">{errorsMsg.mail}</span>}

        </div>
        
        <div>
                <div>כותרת לתהליך</div>
                <input
                    type="text"
                    value={title1}
                    name="title1"
                    onChange={handleInputChange}
                />
                {errorsMsg.title1 && <span className="error">{errorsMsg.title1}</span>}

        </div>
        
        <div>
                <div>כותרת משנה</div>
                <input
                    type="text"
                    value={title2}
                    name="title2"
                    onChange={handleInputChange}
                />
                {errorsMsg.title2 && <span className="error">{errorsMsg.title2}</span>}
        </div>
        
        <div>
                <div>טקסט הסבר לתחילת תהליך, להרשמה</div>
                <input
                    type="text"
                    value={description}
                    name="description"
                    onChange={handleInputChange}
                />
                {errorsMsg.description && <span className="error">{errorsMsg.description}</span>}
        </div>
        
        <div>
                <div>טקסט הסבר לטפסים</div>
                <input
                    type="text"
                    value={description2}
                    name="description2"
                    onChange={handleInputChange}
                />
                {errorsMsg.description2 && <span className="error">{errorsMsg.description2}</span>}
        </div>
        <button className="button_save" onClick={saveDB}>שמור</button>
        {!!textModal && <Modal 
            closeModal={()=>setTextModal('')}
            textModal={textModal}
            />}
        {!!error && <Modal 
            closeModal={()=>setError(false)}
            textModal={'אירעה שגיאה, אנא נסה שנית'}
            />}
        </div>
        
    );
};

export default TdDetails;
