import React, { useState } from 'react'



const UserInfoUpdateComponent = ({ SettingKey, title, value, index, handleInputChange }) => {
    const [isEditing, setIsEditing] = useState(null);
    const [inputValue, setInputValue] = useState(value);

    function selectEditing(index) {
        console.log("edit : " + SettingKey + " " + inputValue);
        setIsEditing(true);

        // Disable all inputs first
        document.querySelectorAll('.user-setting-item input').forEach((input) => {
            input.disabled = true;
            input.classList.remove('input-active');
        });

        // Enable the specific input
        const inputElement = document.querySelectorAll('.user-setting-item input')[index];
        inputElement.disabled = false;
        inputElement.classList.add('input-active');
    }


    function handleSave(SettingKey) {
        console.log("save : " + SettingKey + " " + inputValue);
        setIsEditing(false);

        // Disable all inputs using querySelectorAll
        document.querySelectorAll('.user-setting-item input').forEach((input) => {
            input.disabled = true;
            input.classList.remove('input-active');
        });

        // Call your handleInputChange function
        handleInputChange(SettingKey, inputValue);
    }

    return (
        <div className="flex justify-between items-center w-[95%] mx-auto p-2 py-4 box-shadow rounded-md user-setting-item bank">
            {
                <div id="left" className='flex flex-col text-[#005377] w-full '>
                    <h3 className="text-bold capitalize">{title}:</h3>
                    <input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="w-1/2 border border-black input"
                        disabled={true}
                    />
                </div>
            }
            <div id="right">
                {isEditing ? (
                    <button className='border border-black px-3 py-2 rounded-md capitalize cursor-pointer saveBtn' onClick={() => handleSave(SettingKey)}>
                        save
                    </button>
                ) : (
                    <button
                        className='border border-black px-3 py-2 rounded-md capitalize cursor-pointer'
                        onClick={() => selectEditing(index)}
                        disabled={isEditing}
                    >
                        edit
                    </button>
                )}
            </div>
        </div>
    );
}

export default UserInfoUpdateComponent