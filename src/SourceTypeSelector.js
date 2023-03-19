import React, { useRef } from 'react'

export default function SourceTypeSelector({ sourceTypes }) {

    const sourceTypeSelectedRef = useRef()

    const sourceTypeList =
        sourceTypes.map(sourceType => {
            return { label: sourceType, value: sourceType }
        })

    function getFormHandler(e) {
        console.log(sourceTypeSelectedRef.current.value);
    }

    return (
        <>
            <select name="source_types" ref={sourceTypeSelectedRef} id="source-types" >
                {sourceTypeList.map(sourceType => {
                    return <option key={sourceType.value} value={sourceType.value}>{sourceType.label}</option>
                })}
            </select>

            <button onClick={getFormHandler}>Get Form</button>
        </>

    );
}