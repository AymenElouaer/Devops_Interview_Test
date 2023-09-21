import React, { ChangeEvent, useState } from 'react'
import axios from 'axios'
import useStyles from './styles';

interface MyTemplateFormProps {
    onSubmit: (data: {
        name: string,
        scenario: string,
        containerImage: string;
    }) => void;
}
const MyTemplate: React.FC<MyTemplateFormProps> = () => {
    const classes = useStyles();
    const [name, setName] = useState<string>('');
    const [scenario, setScenario] = useState<string>('');
    const [containerImage, setContainerImage] = useState<string>('');

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleScenarioChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setScenario(event.target.value);
    };

    const handleContainerImageChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setContainerImage(event.target.value);
    };

    const handleSubmit = async () => {
        //send data to backend
        try {
            const response = await axios.post('http://localhost:7007/template', {
                name,
                scenario,
                containerImage,
            });
            console.log('data sent successfully', response.data);
        } catch (error) {
            console.error('Error sending the data', Error);
        }
    };
    return (
        <div className={classes.container}>
            <input
                className={classes.input}
                type='text'
                placeholder='environment Name'
                value={name}
                onChange={handleNameChange}
            />
            <select className={classes.select} value={scenario} onChange={handleScenarioChange}>
                <option value="k8s_rbac">k8s_rbac</option>
                <option value="dockerfile">dockerfile</option>
                {/* add more senarios */}
            </select>
            <select className={classes.select} value={containerImage} onChange={handleContainerImageChange}>
                <option value="image 1">Image 1</option>
                <option value="image 2">Image 2</option>
                {/* add more container images */}
            </select>
            <button className={classes.submitButton} onClick={handleSubmit}>Submit</button>
        </div>
    )
}
export default MyTemplate;