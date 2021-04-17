import React, { useState, useEffect } from "react";
import {FormGroup, FormControl, Button} from "react-bootstrap"
import { useParams, useHistory } from "react-router-dom";
import { API } from "aws-amplify";
import "./Note.css";
import "../config";

export default function Note() {
    const { id } = useParams();
    const history = useHistory();
    const [content, setContent] = useState("");
    const [note, setNote] = useState(null);

    useEffect(() => {
        async function onLoad() {
            try {
                const note = await API.get("notes", `/notes/${id}`);
                const { content } = note;

                setContent(content);
                setNote(note);
            } catch (e) {
                alert(e.message);
            }
        }
        onLoad();
    }, [id]);

    async function handleDelete(event){
        try {
            await API.del("notes", `/notes/${id}`);
            history.push("/");
        } catch (e) {
            alert(e.message);
        }
    }

    async function handleBack(event){
        history.push("/");
    }

    return (
        <div className="Notes">
            {note && (
                <form >
                    <FormGroup controlId="content">
                        <FormControl
                            value={content}
                            componentClass="textarea"
                            onChange={e => setContent(e.target.value)}
                        />
                    </FormGroup>
                    <Button
                        block
                        bsSize="large"
                        bsStyle="danger"
                        onClick={handleBack}
                    >
                        Back
                    </Button>
                    <Button
                        block
                        bsSize="large"
                        bsStyle="danger"
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>
                </form>
            )}
        </div>
    );       
}