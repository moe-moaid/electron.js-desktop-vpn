import React, { useEffect, useRef, useState } from 'react';

export default function OTPInput({ length, onChange, status }) {
    const [otp, setOtp] = useState(new Array(length).fill(''));
    const inputRefs = useRef([]);

    function handleChange(e, index) {
        const value = e.target.value;
        if (!isNaN(value) && value.length <= 1) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            onChange(newOtp.join(''));

            if (value && index < length - 1) {
                inputRefs.current[index + 1].focus();
            }
        }
    }

    function handleKeyDown(e, index) {
        if (e.key === 'Backspace' || e.key === 'Delete') {
            if (otp[index]) {
                const newOtp = [...otp];
                newOtp[index] = '';
                setOtp(newOtp);
                onChange(newOtp.join(''));
            } else if (index > 0) {
                inputRefs.current[index - 1].focus();
            }
        } else if (e.key === 'ArrowRight' && index < length - 1) {
            inputRefs.current[index + 1].focus();
        } else if (e.key === 'ArrowLeft' && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    }

    function handleClick(index) {
        const emptyIndex = otp.indexOf('');
        if (emptyIndex !== -1 && emptyIndex < index) {
            inputRefs.current[emptyIndex].focus();
        } else {
            inputRefs.current[index].focus();
        }
    }

    function handlePaste(e) {
        const pasteData = e.clipboardData.getData('text');
        if (/^\d*$/.test(pasteData)) { // Ensure the pasted data is numeric
            const newOtp = [...otp];
            const pastedData = pasteData.slice(0, length); // Trim to fit length
            for (let i = 0; i < pastedData.length; i++) {
                newOtp[i] = pastedData[i];
            }
            setOtp(newOtp);
            onChange(newOtp.join(''));
            // Move focus to the first empty input
            const firstEmptyIndex = newOtp.findIndex(value => !value);
            if (firstEmptyIndex !== -1) {
                inputRefs.current[firstEmptyIndex].focus();
            }
        }
    }

    useEffect(() => {
        inputRefs.current[0].focus();
    }, [])

    return (
        <div className='flex space-x-3'>
            {otp.map((data, index) => (
                <input
                    className={`w-[60px] h-[60px] text-center text-[20px] rounded-lg border ${status && status.status === false ? 'border-[#ED1C24]' : 'border-[#48516B]'} bg-transparent stroke-none outline-none text-[#F5F5F5] font-bold`}
                    key={index}
                    type="text"
                    value={otp[index]}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onClick={() => handleClick(index)}
                    onPaste={(e) => handlePaste(e)}
                    ref={(el) => (inputRefs.current[index] = el)}
                />
            ))}
        </div>
    );
}

