import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { HelpBlock, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
//import LoaderButton from "../components/LoaderButton";
import { useAppContext } from "../libs/contextLib";
//import { useFormFields } from "../libs/hooksLib";
//import { onError } from "../libs/errorLib";
import "./Signup.css";
import { Auth } from "aws-amplify";

export default function Signup() {
/*    const [fields, handleFieldChange] = useFormFields({
        email: "",
        password: "",
        confirmPassword: "",
        confirmationCode: "",
        });
*/
    const history = useHistory();
    const [newUser, setNewUser] = useState(null);
    const { userHasAuthenticated } = useAppContext();
//    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmationCode, setConfirmationCode] = useState("");


    function validateForm() {
        return ( email.length > 0 && 
                 password.length > 0 && 
                 password === confirmPassword);
    }

    function validateConfirmationForm() {
        return confirmationCode.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();
//        setIsLoading(true);
        setNewUser("test");
//        setIsLoading(false);
        try {
            const newUser = await Auth.signUp({
                username: email,
                password: password,
            });
            setNewUser(newUser);
        } catch (e) {
            alert(e.message)
        }
    }

    async function handleConfirmationSubmit(event) {
        event.preventDefault();
//        setIsLoading(true);
        try {
            await Auth.confirmSignUp(email, confirmationCode);
            await Auth.signIn(email, password);
            userHasAuthenticated(true);
            history.push("/");
        } catch (e) {
            alert(e.message)
        }
    }

    function renderConfirmationForm() {
        return (
            <form onSubmit={handleConfirmationSubmit}>
            <FormGroup controlId="confirmationCode" bsSize="large">
                <ControlLabel>Confirmation Code</ControlLabel>
                    <FormControl
                        autoFocus
                        type="tel"
                        onChange={e => setConfirmationCode(e.target.value)}
                        value={confirmationCode}
                    />
                <HelpBlock>Please check your email for the code.</HelpBlock>
            </FormGroup>
            <Button block type="submit" bsSize="large"
                disabled={!validateConfirmationForm()} >
                Verify
            </Button>
            </form>
        );
    }

    function renderForm() {
        return (
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="email" bsSize="large">
                    <ControlLabel>Email</ControlLabel>
                        <FormControl
                            autoFocus
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}/>
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <ControlLabel>Password</ControlLabel>
                        <FormControl
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}/>
                </FormGroup>
                <FormGroup controlId="confirmPassword" bsSize="large">
                    <ControlLabel>Confirm Password</ControlLabel>
                        <FormControl
                            type="password"
                            onChange={e => setConfirmPassword(e.target.value)}
                            value={confirmPassword}/>
                </FormGroup>
                <Button
                    block
                    type="submit"
                    bsSize="large"
                    disabled={!validateForm()} >
                    Signup
                </Button>
            </form>
        );
    }
    return (
        <div className="Signup">
            {newUser === null ? renderForm() : renderConfirmationForm()}
        </div>
    );
}