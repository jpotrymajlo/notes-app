import "./NewNote.css";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { FormGroup, Button, FormControl } from "react-bootstrap";
import API from "@aws-amplify/api";
//import { onError } from "../libs/errorLib";
//import config from "../config";

export default function NewNote() {
    const history = useHistory();
    const [content, setContent] = useState("");
    //const [isLoading, setIsLoading] = useState(false);

    function validateForm() {
        return content.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            await API.post("notes", "/notes", {body: content});
            history.push("/");
        } catch (err) {
            alert(err.message);
        }
    }

    return (
        <div className="NewNote">
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="content">
                    <FormControl
                        value={content}
                        componentClass="textarea"
                        onChange={e => setContent(e.target.value)}
                    />
                </FormGroup>
                <Button
                    block
                    type="submit"
                    bsSize="large"
                    bsStyle="primary"
                    disabled={!validateForm()}>
                    Create
                </Button>
            </form>
        </div>
    );
}