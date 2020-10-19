import React from 'react';
import {Field} from 'formik';
const GisField = (props) => {
    return (<Field name={props.name}>
        {({ field, form, meta }) => {
            const propsChild={
                field,
                meta,
                submitCount:form.submitCount,
            }
         return   React.cloneElement(props.children, propsChild) 
        }}
    </Field>)
}
export default GisField