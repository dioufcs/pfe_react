import React from "react";
import {Container, Row, Col, Card, CardHeader, CardBody, NavLink} from "shards-react";
import axios from 'axios';

import PageTitle from "../components/common/PageTitle";
import {NavLink as RouteNavLink} from "react-router-dom";
import Link from "react-router-dom/es/Link";

class DossiersMedicaux extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dossiers: '',
      medecin: ''
    };
  }

  componentDidMount() {
    const urlMedecin = 'http://localhost:8000/her_app/medecin/'.concat(localStorage.getItem('username')).concat('/');
    axios.get('http://localhost:8000/her_app/patients/')
      .then(res => {
        const dossiers = res.data;
        console.log(dossiers);
        this.setState({dossiers: dossiers});
        console.log(this.state.dossiers);
      });
    axios.get(urlMedecin)
      .then(res => {
        const medecinData = res.data;
        const medecin = medecinData.nom+", "+medecinData.specialite;
        this.setState({medecin: 'Dr '.concat(medecin)});
      })
  }

  listeDossiers = () => {
    const elements = this.state.dossiers;
    let liste=[];
    for (let i = 0; i < elements.length; i++) {
      console.log(elements[i].id);
      let j = elements[i];
      const idPatient = j.id;
       liste.push( <tr>
        <td><NavLink tag={RouteNavLink} to={{pathname: '/dossier-patient',  state: { idPatient: idPatient }}}>{j.id}</NavLink></td>
        {/* <td><Link  to={{pathname: '/dossier-patient',  state: { idPatient: idPatient }}}>{j.id}</Link></td>*/}
         <td><NavLink tag={RouteNavLink} to={{pathname: '/dossier-patient',  state: { idPatient: idPatient }}}>{j.prenom}</NavLink></td>
        <td><NavLink tag={RouteNavLink} to={{pathname: '/dossier-patient',  state: { idPatient: idPatient }}}>{j.nom}</NavLink></td>
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
          <PageTitle sm="4" title="Dossiers médicaux" subtitle={this.state.medecin} className="text-sm-left"/>
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
