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

export function SignUp() {
    const navigate = useNavigate();
    let [name, setName] = useState('');
    let [collegeId, setCollegeId] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [access, setAccess] = useState('');

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

    const handleCreateUser = () => {
        if (email != '' && password != '') {
            createUser(email, password).then((success) => {
                if (success) {
                    console.log(email, name, collegeId, access, 'CSE', password)
                    addUser(email, name, collegeId, access, 'CSE', password).then((success) => success && navigate('/user/home'));
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
                src="https://th.bing.com/th/id/R.6231674972ee06b2adb10970455670b1?rik=kmeXEwK9voLRHA&riu=http%3a%2f%2fsairam.edu.in%2fwp-content%2fuploads%2f2018%2f06%2fbanner-1.jpg&ehk=LicAGsH%2f36T2d97UOzdfiCquYM1RfaGj0U87xcAZi3s%3d&risl=&pid=ImgRaw&r=0"
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
                                <Option value="Principal">Principal</Option>
                                <Option value="HOD">HOD</Option>
                                <Option value="Staff">Staff</Option>
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


