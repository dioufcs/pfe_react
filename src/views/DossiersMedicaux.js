import React from "react";
import {Container, Row, Col, Card, CardHeader, CardBody, NavLink} from "shards-react";
import axios from 'axios';

import PageTitle from "../components/common/PageTitle";
import {NavLink as RouteNavLink} from "react-router-dom";

class DossiersMedicaux extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dossiers: ''
    };
  }

  componentDidMount() {
    axios.get('http://localhost:8000/her_app/patients/')
      .then(res => {
        const dossiers = res.data;
        console.log(dossiers);
        this.setState({dossiers: dossiers});
        console.log(this.state.dossiers);
      })
  }

  listeDossiers = () => {
    const elements = this.state.dossiers;
    let liste=[];
    for (let i = 0; i < elements.length; i++) {
      console.log(elements[i].id)
      let j = elements[i];
       liste.push( <tr>
        <td><NavLink tag={RouteNavLink} to={'/blog-overview'}>{j.id}</NavLink></td>
         <td><NavLink tag={RouteNavLink} to={'/blog-overview'}>{j.prenom}</NavLink></td>
        <td><NavLink tag={RouteNavLink} to={'/blog-overview'}>{j.nom}</NavLink></td>
        <td style={{verticalAlign:'middle'}}>{j.dateNaissance}</td>
        <td style={{verticalAlign:'middle'}}>{j.nationalite}</td>
        <td style={{verticalAlign:'middle'}}>{j.numIdentNational}</td>
      </tr>)
    }
    return liste;
  }


  render() {


    return (

      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Dossiers médicaux" subtitle="Blog Posts" className="text-sm-left"/>
        </Row>

        {/* Default Light Table */}
        <Row>
          <Col>
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                <h6 className="m-0">Dossiers patients</h6>
              </CardHeader>
              <CardBody className="p-0 pb-3">
                <table className="table mb-0">
                  <thead className="bg-light">
                  <tr>
                    <th scope="col" className="border-0">
                      #
                    </th>
                    <th scope="col" className="border-0">
                      Prénoms
                    </th>
                    <th scope="col" className="border-0">
                      Nom
                    </th>
                    <th scope="col" className="border-0">
                      Date de naissance
                    </th>
                    <th scope="col" className="border-0">
                      Nationalité
                    </th>
                    <th scope="col" className="border-0">
                      Numéro d'identification
                    </th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.listeDossiers()}
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </Col>
        </Row>


      </Container>
    );

  }
}

export default DossiersMedicaux;
