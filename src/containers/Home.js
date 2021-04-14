import { PageHeader, ListGroup } from "react-bootstrap";
import "./Home.css";
import { useAppContext } from "../libs/contextLib";

export default function Home() {
    const { isAuthenticated } = useAppContext();

    function renderHome() {
        return (
            <div className="lander">
                <h1>Scratch</h1>
                <p>A simple note taking app</p>
            </div>
        );
    }
    function renderNotes() {
        return (
            <div className="notes">
                <PageHeader>My Notes</PageHeader>
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