import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Input,
    Button,
    Typography,
    Select,
    Option
} from "@material-tailwind/react";
import { createUser } from "../../Firebase/auth";
import { addUser } from "../../Firebase/userAdd";
import background from "../../assets/background.jpeg";

export function SignUp() {
    const navigate = useNavigate();
    let [name, setName] = useState('');
    let [collegeId, setCollegeId] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [access, setAccess] = useState('');
    let [department, setDepartment] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleCollegeIDChange = (event) => {
        setCollegeId(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleAccessChange = (event) => {
        setAccess(event);
    };

    const handleDepartment = (event) => {
        setDepartment(event);
    }


    const handleCreateUser = () => {
        if (email != '' && password != '') {
            createUser(email, password).then((success) => {
                if (success) {
                    console.log(email, name, collegeId, access, department, password)
                    addUser(email.toLowerCase(), name, collegeId, access, department, password).then((success) => success && navigate('/user/home'));
                }
            }
            );
        } else {
            alert("Please enter all the details");
        }
    }

    return (
        <>
            <img
                src={background}
                className="absolute inset-0 z-0 h-full w-full object-fill"
            />
            <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
            <div className="container mx-auto p-4">
                <Card className="absolute top-2/4 left-2/4 w-full max-w-[26rem] -translate-y-2/4 -translate-x-2/4">
                    <CardHeader
                        variant="gradient"
                        color="blue"
                        className="mb-3 grid h-20 place-items-center"
                    >
                        <Typography variant="h4" color="white">
                            Welcome to Teacher Validator
                        </Typography>
                    </CardHeader>
                    <CardBody className="flex flex-col gap-4">
                        <Input label="Name" size="lg" value={name} onChange={handleNameChange} />
                        <Input label="CollegeID" size="lg" value={collegeId} onChange={handleCollegeIDChange} />
                        <Input type="email" label="Email" size="lg" value={email} onChange={handleEmailChange} />
                        <Input type="password" label="Password" size="lg" value={password} onChange={handlePasswordChange} />
                        <div className="max-w-[25rem]">
                            <Select color="blue" label="Select Access Level" value={access} onChange={handleAccessChange} >
                                <Option value="HOD">HOD</Option>
                                <Option value="Staff">Staff</Option>
                            </Select>
                        </div>
                        <div className="max-w-[25rem]">
                            <Select color="blue" label="Select Department" value={department} onChange={handleDepartment} >
                                <Option value="CSE">CSE</Option>
                                <Option value="CCE">CCE</Option>
                                <Option value="IT">IT</Option>
                                <Option value="AI&DS">AI&DS</Option>
                                <Option value="MECH">MECH</Option>
                                <Option value="EEE">EEE</Option>
                                <Option value="ECE">ECE</Option>
                                <Option value="CYBER">CYBER</Option>
                            </Select>
                        </div>

                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button variant="gradient" fullWidth onClick={handleCreateUser}>
                            Sign Up
                        </Button>
                        <Typography variant="small" className="mt-6 flex justify-center">
                            Already have an account?
                            <Link to="/auth/login">
                                <Typography
                                    as="span"
                                    variant="small"
                                    color="blue"
                                    className="ml-1 font-bold"
                                >
                                    Sign in
                                </Typography>
                            </Link>
                        </Typography>
                    </CardFooter>
                </Card>
            </div>
        </>
    );
}

export default SignUp;


