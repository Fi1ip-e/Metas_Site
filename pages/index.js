import React from 'react';
import Menu from '../component/Menu';
import { Jumbotron, Container, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from "reactstrap";

function Home({ data }) {
    return (
        <>
            <Menu />
            <Jumbotron fluid className="list">
                <Container>
                    <h1 className="display-4 text-center title-top">Minhas Metas!</h1>
                    <hr />
                    <ListGroup>
                        {
                            data.metas.map(meta => (
                                <div key={meta._id}>
                                    <ListGroupItem className="list-meta">
                                        <ListGroupItemHeading>{meta.name}</ListGroupItemHeading>
                                        <ListGroupItemText>{meta.description}</ListGroupItemText>
                                        <ListGroupItemText>{meta.status}</ListGroupItemText>
                                    </ListGroupItem>
                                </div>
                            ))
                        }]
                    </ListGroup>
                </Container>
            </Jumbotron>
        </>
    )
}

export async function getServerSideProps() {
    const res = await fetch("http://localhost:8081/metas")
    const data = await res.json();
    console.log(data);
    return { props: { data } };
}

export default Home;