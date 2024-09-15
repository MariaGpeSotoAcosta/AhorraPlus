import { useForm, useFieldArray } from 'react-hook-form'
import { useEffect, useState } from 'react';

import Form from './Form';

import { useFormInfo } from './FormInfoContext';
import { useGraph } from '../context/GraphContext';
import { useAuth } from '../context/AuthContext';


function MainForm() {
    // useForm
    const { register, handleSubmit, control, setValue, watch, getValues } = useForm({
        defaultValues: {
            earnings: 0,
            namesMonths: [''],
            valuesMonths: [''],
        }
    });

    // user and graph hooks
    const { user } = useAuth();
    const { createGraph } = useGraph();

    // useFormInfo, finance user info
    const {
        earnings, setEarnings,
        monthItems, setMonthItems,
        weekItems, setWeekItems,
        savingsPercent, setSavingsPercent,
        saveForm, getForm,
    } = useFormInfo();
    const [ earningGraphData, setEarningGraphData ] = useState([]);
    const [ savingsGraphData, setSavingsGraphData ] = useState([]);
    const [ errors, setErrors ] = useState([]);

    // month fieldArray
    const monthPropertyName = 'Months'
    const { fields: fieldsNameMonth, append: appendNameMonth, remove: removeNameMonth } = useFieldArray({
        name: `names${monthPropertyName}`,
        control,
    });
    const { fields: fieldsValueMonth, append: appendValueMonth, remove: removeValueMonth } = useFieldArray({
        name: `values${monthPropertyName}`,
        control,
    });
    const monthFieldInfo = {
        fieldsNames: fieldsNameMonth,
        appendNames: appendNameMonth,
        removeNames: removeNameMonth,
        appendValues: appendValueMonth,
        removeValues: removeValueMonth,
    };

    // Parse data, submit data to database and load graphs
    const onSubmit = handleSubmit(async (inputData) => {
        let data = {
            earnings: 0,
            monthItems: [],
            weekItems: [],
            savingsPercent: 0,
        }

        data.earnings = parseInt(inputData.earnings);
        setEarnings(data.earnings);

        for (let i = 0; i < fieldsNameMonth.length; i++) {
            data.monthItems[i] = {
                name: inputData.namesMonths[i],
                value: parseInt(inputData.valuesMonths[i]),
            };
        }
        setMonthItems(data.monthItems);

        data.savingsPercent = parseInt(inputData.savingsPercent);
        setSavingsPercent(data.savingsPercent);

        saveForm(data);

        // for (let i = 0; i < fieldsNameWeek.length; i++) {
        //     data.weekItems[i] = {
        //         name: inputData.namesWeeks[i],
        //         value: parseInt(inputData.valuesWeeks[i]),
        //     };
        // }
        // setWeekItems(data.weekItems);
    
        console.log(data);
        loadGraphs(data);
    });

    // Earnings and savings graphs
    const loadGraphs = (data) => {
        // Calculate all costs
        let costs = data.monthItems.reduce((sum, e) => sum + e.value, 0);
        
        setErrors([]);
        if (data.earnings >= costs) {
            setEarningGraphData([
                { name: 'Earnings', value: data.earnings - costs },
                ...data.monthItems,
            ]);

            let savings = (data.earnings - costs) * savingsPercent / 100;
            setSavingsGraphData([
                { name: 'Earnings', value: data.earnings - costs - savings },
                { name: 'Savings', value: savings },
                ...data.monthItems,
            ]);            
        } else {
            setEarningGraphData([]);
            setSavingsGraphData([]);
            setErrors([{ name: 'no_money', value: 'There isn\'t enouth money' }]);
        }
    }

    useEffect(() => {
        async function getFormInfo() {
            const formInfo = await getForm(user.id);
            console.log(formInfo);

            setEarnings(formInfo.earnings);
            setValue('earnings', formInfo.earnings);

            removeNameMonth();
            removeValueMonth();
            formInfo.monthItems.forEach((element, index) => {
                appendNameMonth(formInfo.monthItems[index].name);
                appendValueMonth(formInfo.monthItems[index].value);
            });
            setMonthItems(formInfo.monthItems);

            setSavingsPercent(formInfo.savingsPercent);
            setValue('savingsPercent', formInfo.savingsPercent);

            loadGraphs(formInfo);
        }
        getFormInfo();
    }, []);

    const watchSavingsPercent = watch('savingsPercent');
    useEffect(() => {
        setSavingsPercent(getValues('savingsPercent'));
    }, [watchSavingsPercent]);

    return (
        <div>
            <button onClick={ async () => { console.log(await getForm(user.id)) } }>Get</button>

            <form onSubmit={ onSubmit }>
                <div>
                    <label htmlFor='earnings'>Earnings:</label>
                    <input id='earnings' type='number' placeholder='Write earnings' { ...register('earnings', { required: true, min: 0, }) } className='mx-2' />
                </div>

                <Form formName='Month Costs' reg={ register } propertyName={ monthPropertyName } fieldsInfo={ monthFieldInfo } />

                <div className='flex'>
                    <label htmlFor='slider'>Percent destined to savings:</label>
                    <input type='range' id='slider' { ...register('savingsPercent', { min: 0, max: 100, }) } className='mx-3'/>
                    <p>{ `${savingsPercent}%` }</p>
                </div>

                <button type='submit' className='bg-red-500 text-white px-3 rounded-md my-5'>Submit</button>
            </form>

            {
                <>
                    <div>
                        {
                            createGraph(monthItems)
                        }
                        {
                            errors.length === 0 || errors.find((error) => { error.name === 'no_money' }) === -1 ? 
                                (<>
                                { createGraph(earningGraphData) }
                                { createGraph(savingsGraphData) }
                                </>)    
                            
                            :
                                (<h1 className='text-red-500'>Not enough money</h1>)
                        }
                    </div>
                </>
            }
        </div>
    )
}

export default MainForm;
