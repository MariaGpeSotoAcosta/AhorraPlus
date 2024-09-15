import { createContext, useState, useContext } from 'react';
import { saveFormRequest, getFormRequest } from '../api/form';

export const FormInfoContext = createContext();

export const useFormInfo = () => {
    const context = useContext(FormInfoContext);
    if (!context) {
        throw new Error('useFormInfo must be used within an FormInfoProvider');
    }
    return context;
};

export const FormInfoProvider = ({ children }) => {    
    const [ earnings, setEarnings ] = useState(0);
    const [ monthItems, setMonthItems ] = useState([]);
    const [ weekItems, setWeekItems ] = useState([]);
    const [ savingsPercent, setSavingsPercent ] = useState(0);

    const saveForm = async (formData) => {
        const res = await saveFormRequest(formData);
    };

    const getForm = async (userId) => {
        const res = await getFormRequest(userId);
        return res.data;
    };

    return (
        <FormInfoContext.Provider value={{
            earnings,
            setEarnings,
            
            monthItems,
            setMonthItems,

            weekItems,
            setWeekItems,

            savingsPercent,
            setSavingsPercent,

            saveForm, getForm
        }}>
            { children }
        </FormInfoContext.Provider>
    )
};
