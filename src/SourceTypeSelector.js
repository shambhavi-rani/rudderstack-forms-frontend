import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.min.css";
import FormTemplate from './FormTemplate'

export default function SourceTypeSelector({ sourceTypes }) {

    const getFormTemplateUrl = "https://localhost:7043/api/FormTemplates";

    const sourceTypeSelectedRef = useRef();

    const [formTemplate, setFormTemplate] = useState({ fields: {} });

    const sourceTypeList =
        sourceTypes.map(sourceType => {
            return { label: sourceType, value: sourceType };
        })

    function getFormTemplate(sourceType) {
        const formTemplateUrl = getFormTemplateUrl + "/" + sourceType;
        fetch(formTemplateUrl)
            .then(response => response.json())
            .then(data => setFormTemplate(data))
            .catch(error => console.error('Unable to get Form Template.', error));
    }

    function getFormHandler(e) {
        getFormTemplate(sourceTypeSelectedRef.current.value);
    }

    return (
        <>
            <h1>Rudderstack Forms</h1>
            <br />

            <select name="source_types" ref={sourceTypeSelectedRef} id="source-types" >
                {sourceTypeList.map(sourceType => {
                    return <option key={sourceType.value} value={sourceType.value}>{sourceType.label}</option>
                })}
            </select>

            <Button onClick={getFormHandler} variant="info">Get Form</Button>

            < FormTemplate formTemplate={formTemplate} />
        </>

    );
}