import React, {useState} from 'react';

const MyContext = React.createContext();

const MyContextProvider = (props) => {
    const [sharedData, setSharedData] = useState("current");

    const updateSharedData = (newValue) => {
        setSharedData(newValue);
    };

    return (
        <MyContext.Provider value={{sharedData, updateSharedData}}>
            {props.children}
        </MyContext.Provider>
    );
};

export {MyContext, MyContextProvider};