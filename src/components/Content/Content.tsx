import React, { MutableRefObject, useState } from "react";
import styles from './Content.module.scss';
import DatePicker from "react-datepicker";
import { format } from 'react-string-format';
import {Editor, EditorState} from 'draft-js';
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import "react-datepicker/dist/react-datepicker.css";
import ModalContent from "../Modal/Modal";
import Option from "./Options";
import { default as ReactSelect } from "react-select";

const Content = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = React.useState(null);
    const [stateEditor, setStateEditor] = useState(EditorState.createEmpty());
    const [value, setValue] = useState({
        name: "",
        email: "",
        date: startDate,
        subject: "",
        time: "9:00AM-10:00AM"
    });
    const editor = React.useRef() as MutableRefObject<Editor>;
 
    function focusEditor() {
        editor.current.focus();    
    }
   
    React.useEffect(() => {
      focusEditor()
    }, []);
    
    const handleChange = (e: React.SetStateAction<Date>) => {
        setIsOpen(!isOpen);
        setStartDate(e);
    };
    const handleClick = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };

    const timeOptions = [
        { value: "9:00AM-10:00AM", label: "9:00AM - 10:00AM" },
        { value: "10:00AM-11:00AM", label: "10:00AM - 11:00AM" },
        { value: "11:00AM-12:00PM", label: "11:00AM - 12:00PM" },
        { value: "12:00PM-1:00PM", label: "12:00PM - 1:00PM" },
        { value: "1:00PM-2:00PM", label: "1:00PM - 2:00PM" },
        { value: "2:00PM-3:00PM", label: "2:00PM - 3:00PM" }
      ];


    return (
        <div className={styles["content"]}>
            <p>Are you looking to build a global standard MVP of your product? 
                You've come to the right place! Reach out to us today and let the journey begin!
            </p>
            <span>Submit a request</span>
            <form onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="name">Name</label>
                <input 
                    aria-label="Name"
                    name="name"
                    type="text"
                    value={value.name}
                    onChange={(e) => setValue({...value, name: e.target.value})}
                    placeholder="Enter your name"/>
                <label htmlFor="email">Email Address</label>
                <input 
                    name="email"
                    aria-label="Email"
                    type="email"
                    value={value.email}
                    onChange={(e) => setValue({...value, email: e.target.value})}
                    placeholder="Enter email address"/>
                <label htmlFor="subject">Subject</label>
                <input 
                    name="subject"
                    aria-label="Subject"
                    type="text"
                    value={value.subject}
                    onChange={(e) => setValue({...value, subject: e.target.value})}
                    placeholder="Enter subject"/>
                <label htmlFor="medium">Medium</label>
                <select name="medium">
                    <option value=""></option>
                    <option value="on-site visit">On-site visit</option>
                    <option value="virtual meeting">Virtual meeting</option>
                </select>
                <span>Our address is at: 194, Herbert Macaulay Road, Yaba, Lagos.</span>
                <label htmlFor="date">Schedule date</label>
                <div onClick={handleClick} className={styles["datepicker"]}>
                    {format(startDate.toLocaleDateString(), "d MMMM, yyyy")}
                </div>
                {isOpen && (
                    <DatePicker selected={startDate} onChange={(e:Date) => handleChange(e)} dateFormat="d MMMM, yyyy" inline/>
                )}
                <label htmlFor="time" style={{'marginTop': '32px'}}>Available time slots</label>
                <ReactSelect
                    options={timeOptions}
                    isMulti
                    closeMenuOnSelect={false}
                    hideSelectedOptions={false}
                    components={{
                        Option
                    }}
                    className={styles['react-select']}
                    onChange={(e:any) => setSelected(e)}
                    value={selected}
                />
                <label htmlFor="desciption">Description</label>
                <div onClick={focusEditor} style={{
                    border: '1px solid gray',
                    minHeight: '350px',
                    marginRight: '452px',
                    borderRadius: '4px',
                    padding: '4px'
                }}>
                    <Editor
                        ref={editor}
                        editorState={stateEditor}
                        onChange={(e) => setStateEditor(e)}
                    />
                </div>
                <p>Please enter the details of your request. A member of our support staff will respond as soon as possible.</p>
                <Popup 
                    lockScroll={true} 
                    contentStyle={
                        {
                            background: 'none', 
                            padding: '0', 
                            border: 'none', 
                            width: 'auto', 
                            maxHeight: 'calc(100vh - 6rem)', 
                            overflowY: 'scroll', 
                        }
                    } 
                    repositionOnResize={true} 
                    overlayStyle={
                        {
                            background: 'rgba(0, 0, 0, 0.7)'
                        }
                    } 
                    modal 
                    trigger={<button className={styles["button"]} onClick={(e) => e.preventDefault()}>Submit</button>}
                    className={styles['my-popup']} 
                >
                    <ModalContent value={value}/>
                    
                </Popup>
            </form>
        </div>
    );
}


export default Content;