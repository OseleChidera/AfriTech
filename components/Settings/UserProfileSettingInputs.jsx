import React, {useState} from 'react'



const UserProfileSettingInputs = ({ SettingKey, title, value, index, handleInputChange }) => {
    const [isEditing, setIsEditing] = useState(null);
    const [inputValue, setInputValue] = useState(value);

    function selectEditing(index) {
        console.log("edit : " + SettingKey + " " + inputValue)
        setIsEditing(true)
        document.querySelectorAll('.user-setting-item').forEach((item) => {
            item.querySelector('input').disabled = true;
        })
        // console.log(document.querySelectorAll('.user-setting-item')[index].querySelector('input'))
        document.querySelectorAll('.user-setting-item')[index].querySelector('input').classList.add = 'input-active'
        document.querySelectorAll('.user-setting-item')[index].querySelector('input').disabled = false
    }

    function handleSave(SettingKey) {
        console.log("save : " + SettingKey + " " + inputValue)
        setIsEditing(false)
        document.querySelectorAll('.user-setting-item')[index].querySelector('input').disabled = true
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
                        className="w-1/2 border border-black "
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

export default UserProfileSettingInputs