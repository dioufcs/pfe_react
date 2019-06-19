import {
  Button,
  Card,
  CardHeader,
  Col,
  Container,
  Form, FormCheckbox,
  FormGroup,
  FormInput,
  FormSelect, ListGroup,
  ListGroupItem,
  Row
} from "shards-react";
import { Route, Redirect } from 'react-router'




import React from "react";
import App from "../App";


// const Login = () => (
class Login extends React.Component {
  /*  state = {
      username: '',
      password: ''
    };*/
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handle_login = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        if (json.token == null)
          console.log('faux')
        else {
        localStorage.setItem('token', json.token);
        localStorage.setItem('username', data.username)
        this.props.sendData(this.state.username);
      }
      });
  };

  handleChange(event) {
    this.setState({[event.target.id]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    alert('A name was submitted: ' + this.state.username);
    alert('A name was submitted: ' + this.state.password);
    this.handle_login(event, this.state);
  }




  render() {
    return(
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Container fluid className="dr-example-container" >
          <Row>
            <Col sm={{ size: 8, order: 2, offset: 2}} md={{ size: 4, order: 2, offset: 4 }}>
              <Card small>
                <CardHeader className="border-bottom">
                  <h6 className="m-0">Formulaire de connexion</h6>
                </CardHeader>
                <ListGroup flush>
                  <ListGroupItem className="p-3">
                    <Row>
                      <Col>
                        <Form onSubmit={this.handleSubmit}>
                          <Row form>
                            <Col md="12" className="form-group">
                              <label htmlFor="username">Nom d'utilisateur</label>
                              <FormInput
                                id="username"
                                placeholder="Nom d'utilisaeur"
                                value={this.state.username}
                                onChange={this.handleChange}
                              />
                            </Col>
                            <Col md="12" className="form-group">
                              <label htmlFor="password">Mot de passe</label>
                              <FormInput
                                id="password"
                                type="password"
                                placeholder="Mot de passe"
                                value={this.state.password}
                                onChange={this.handleChange}
                              />
                            </Col>
                            {/*<Col md="12" className="form-group">
                            <label htmlFor="feInputAddress">Address</label>
                            <FormInput id="feInputAddress" placeholder="1234 Main St"/>
                          </Col>*/}
                          </Row>

                          <Button type="submit" className="form-group">Se connecter</Button>
                        </Form>
                      </Col>
                    </Row>
                  </ListGroupItem>
                </ListGroup> </Card>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

//);

export default Login;
