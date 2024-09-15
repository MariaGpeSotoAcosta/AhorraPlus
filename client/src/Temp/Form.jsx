function Form({ formName, reg: register, propertyName, fieldsInfo }) {            
    return (
        <div>
            <div className='flex my-2'>
                <h1>{ formName }</h1>
                <button type='button' onClick={ () => {
                    fieldsInfo.appendNames('Name'); 
                    fieldsInfo.appendValues('');
                    } } className='bg-blue-400 text-white rounded-md px-3 mx-3'>Add</button>
            </div>
            
            <ul>
                {
                    fieldsInfo.fieldsNames.map((field, index) => (
                        <div className='form-control' key={ field.id }>
                            <input type='text' placeholder='Insert Field Name' { ...register(`names${propertyName}.${index}`, { required: true, }) }/>
                            <input type='text' placeholder='Insert Field Cost' { ...register(`values${propertyName}.${index}`, { required: true, min: 1, }) }/>
                            <button type='button' onClick={ () => { fieldsInfo.removeNames(index); fieldsInfo.removeValues(index); } } className='bg-red-400 text-white rounded-md px-3 mx-3'>Delete</button>
                        </div>
                    ))
                }
            </ul>
        </div>
    )
}

export default Form;
