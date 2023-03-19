import React, { Component, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import ErrorMessage from './ErrorMessage';

export default function FormTemplate({ formTemplate }) {

    const [errors, setErrors] = useState([]);
    const fieldsKeys = Object.keys(formTemplate.fields);

    function getFieldDataFromForm() {
        const fieldData = {};
        fieldsKeys.map(field => {
            if (formTemplate.fields[field].type == 0) {
                fieldData[field] = document.getElementById(field).checked.toString();
            }
            else {
                fieldData[field] = document.getElementById(field).value.toString();
            }
        });
        return fieldData;
    }

    function createSource(formData) {
        const postSourceUrl = "https://localhost:7043/api/Sources";
        fetch(postSourceUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then((data) => console.log(data))
            .catch(error => console.error('Unable to create Source.', error));
    }

    function populateErrors(fieldData, formTemplateFields) {
        let errorList = []
        Object.keys(fieldData).map(fieldDataKey => {
            const formTemplateInputFormat = formTemplateFields[fieldDataKey];
            const fieldDataValue = fieldData[fieldDataKey];
            switch (formTemplateInputFormat.type) {
                case 0: break;
                case 3: break;
                case 4: {
                    const regexPattern = new RegExp(formTemplateInputFormat.regex);
                    if (formTemplateInputFormat.required && fieldDataValue == "") {
                        errorList = [...errorList, "The field: '" + fieldDataKey + "' cannot be empty!"];
                    }
                    if (!regexPattern.test(fieldDataValue)) {
                        errorList = [...errorList, "The field: '" + fieldDataKey + "' failed Regex check! " + formTemplateInputFormat.regexErrorMessage];
                    }
                    break;
                }
                default: break;
            }
        });
        return errorList;
    }

    function submitFormHandler(e) {
        e.preventDefault();

        const fieldData = getFieldDataFromForm();

        const errorList = populateErrors(fieldData, formTemplate.fields);
        setErrors(errorList);
        if (errorList.length != 0) {
            return;
        }

        const formData = {
            type: formTemplate.type,
            userData: fieldData
        };
        createSource(formData);
    }

    return (
        <Container>
            {errors.length != 0 && <ErrorMessage errors={errors} />}
            <form id="my_form">
                <br />
                <h2>{formTemplate.type}</h2>
                <br />
                {
                    fieldsKeys.map(field => {
                        const currentField = formTemplate.fields[field];
                        switch (currentField.type) {
                            case 0:
                                return (
                                    <>
                                        <input id={field} key={field} type="checkbox" name={field} />
                                        <label for={field}>{currentField.label}</label><br /><br/>
                                    </>);
                            case 3:
                                return (
                                    <>
                                        <label for={field}>{currentField.label}</label><br/>
                                        <select id={field} key={field} name={field} required={currentField.required}>
                                            {
                                                currentField.options.map(option => {
                                                    return (
                                                        <option key={option.value} value={option.value}>{option.label}</option>
                                                    );
                                                })
                                            }
                                        </select><br/><br/>
                                    </>
                                );
                            case 4:
                                return (
                                    <>
                                        <label for={field}>{currentField.label}</label><br />
                                        <input id={field} key={field} type="text" name={field} required={currentField.required} /><br /><br />
                                    </>
                                );
                            default:
                                return (
                                    <>
                                        <label for={field}>Error! Invalid Input Type: {currentField.label}</label><br />
                                    </>
                                );
                        } 
                    })
                }

                {formTemplate.type != undefined && <Button variant="warning" type="submit" onClick={submitFormHandler}>Create Source</Button>}
            </form>
            
        </Container>
    )
}