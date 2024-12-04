import styles from "./Input.module.css"
import React, { forwardRef } from "react";

const Input = forwardRef(({ name, text, type, placeholder, value, onChange}, ref) => {
    return (
        <div>
            <label htmlFor={name} className={styles.label}>{text}</label>
            <input type={type} placeholder={placeholder} 
            name={name} className={styles.input} 
            ref={ref} value={value} onChange={onChange} />
        </div>
    )
}); 

export default Input; 