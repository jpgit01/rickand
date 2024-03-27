import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./App.css";
import MenuP from "./components/MenuP";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <h3>Home</h3>
    },
    {
      path: "/contacto",
      element: <h3>Contacto</h3>
    }
  ])

  const [data, setData] = useState({ info: {}, results: [] });
  const [direccion, setDireccion] = useState(1);
  console.log(direccion);

  const getData = async (url) => {
    const resp = await fetch(url);
    const data = await resp.json();

    return data;
  };

  useEffect(() => {
    getData(
      "https://rickandmortyapi.com/api/character/?page=" + direccion
    ).then((data) => {
      setData(data);
    });
  }, [direccion]);

  const clickButtonAdd = () => {
    if (direccion <= 0) {
      setDireccion(1);
    }
    setDireccion(direccion + 1);
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Para un desplazamiento suave
    });
  };
  const clickButtonRest = () => {
    direccion <= 1 ? setDireccion(1) : setDireccion(direccion - 1);
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Para un desplazamiento suave
    });
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        clickButtonRest();
      } else if (event.key === "ArrowRight") {
        clickButtonAdd();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
      <Container className="bg-dark p-3 container-fluid">
        
    <RouterProvider router={router}/>
        <Row>
          <MenuP />
        </Row>

        <Row>
          <Col>
            <p className="mb-5">RICK and MORTY</p>
          </Col>
        </Row>
        <Row>
          {data.results.map((item, index) => (
            <Col
              key={item.id ? item.id + "-" + index : index}
              md={3}
              className="mb-4"
            >
              <Card style={{ width: "100%" }}>
                <Card.Img variant="top" src={item.image} />
                <Card.Body>
                  <Card.Title>
                    <h3>Nombre</h3>
                    {item.name}
                  </Card.Title>
                </Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h4>Estado:</h4>
                    {item.status}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <h4>Especie:</h4>
                    {item.species}
                  </ListGroup.Item>
                  {item.type == "" ? (
                    <ListGroup.Item>
                      <h4>Detalle:</h4> Características especiales desconocidas
                    </ListGroup.Item>
                  ) : (
                    <ListGroup.Item>
                      <h4>Detalle:</h4>
                      {item.type}
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <h4>Genero:</h4>
                    {item.gender}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <h4>Planeta Origen:</h4>
                    {item.origin.name}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          ))}
        </Row>
        <Button className="m-5" onClick={clickButtonRest} variant="primary">
          Anterior
        </Button>
        <Button onClick={clickButtonAdd} variant="primary">
          Siguiente
        </Button>
      </Container>
  );
}

export default App;
