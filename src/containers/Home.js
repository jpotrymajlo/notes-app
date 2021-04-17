import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap"
import { useEffect, useState } from "react"
import "./Home.css";
import { useAppContext } from "../libs/contextLib";
import API from "@aws-amplify/api";

export default function Home() {
    const { isAuthenticated } = useAppContext();
    const [ notes, setNotes ] = useState([]);
    useEffect(() => {
        async function onLoad() {
            if (!isAuthenticated) {
                return;
            }
            try {
                const notes = await loadNotes();
                setNotes(notes);
            } catch (e) {
                alert(e.message)
            }
        }
        onLoad();
        }, [isAuthenticated]);
        
    function loadNotes() {
        return API.get("notes", "/notes");
    }

    function renderNotesList(notes){
        return [{}].concat(notes).map((note, i) =>
            i !== 0 ? (
                <LinkContainer key={note.notesId} to={`/notes/${note.notesId}`}>
                    <ListGroupItem header={note.content.trim().split("\n")[0]}>
                    {"Created: " + new Date(note.createdAt).toLocaleString()}
                    </ListGroupItem>
                </LinkContainer>
            ) : (
                <LinkContainer key="new" to="/notes/new">
                <ListGroupItem>
                    <h4>
                        <b>{"\uFF0B"}</b> Create a new note
                    </h4>
                </ListGroupItem>
                </LinkContainer>
            )
        );
    }

    function renderHome() {
        return (
            <div className="lander">
                <h1>Notes</h1>
            </div>
        );
    }
    function renderNotes() {
        return (
            <div className="notes">
                <PageHeader>My Notes</PageHeader>
                <ListGroup>
                    {renderNotesList(notes)}
                </ListGroup>
                <PageHeader>Shared with me</PageHeader>
                <ListGroup>
                </ListGroup>
            </div>
        );
    }

    return (
        <div className="Home">
            {isAuthenticated ? renderNotes() : renderHome()}
        </div>
    );
}