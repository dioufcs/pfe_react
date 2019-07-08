import React from "react";
import {Container, Row, Col, Card, CardHeader, CardBody, NavLink, Tooltip} from "shards-react";
import axios from 'axios';

import PageTitle from "../components/common/PageTitle";
import {NavLink as RouteNavLink} from "react-router-dom";
import Link from "react-router-dom/es/Link";

class DossiersMedicaux extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      medecins: '',
      medecin: '',
      lieus:'',
      medecinId:'',
      open:false,
      lienAppel:''
    };
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    const urlMedecin = 'http://localhost:8000/her_app/medecin/'.concat(localStorage.getItem('username')).concat('/');
    axios.get('http://localhost:8000/her_app/medecins_appel/')
      .then(res => {
        const medecins = res.data;
        //console.log("medecins : "+JSON.stringify(dossiers));
        this.setState({medecins: medecins});
        console.log(this.state.medecins);
      });
    axios.get(urlMedecin)
      .then(res => {
        const medecinData = res.data;
        console.log(JSON.stringify(medecinData));
        const medecin = medecinData.nom + ", " + medecinData.specialite;
        this.setState({medecin: 'Dr '.concat(medecin)});
        this.setState({medecinId: medecinData.id});
        this.setState({lienAppel: medecinData.nom.replace(' ', '-').replace(' ', '-')})
      });

  }


  listeDossiers = () => {
    const elements = this.state.medecins;
    let liste = [];
    for (let i = 0; i < elements.length; i++) {
      console.log(elements[i].id);
      let j = elements[i];
      console.log("compa :"+j.id+"-----"+this.state.medecinId);


      if(j.id === this.state.medecinId){
        continue
      }
      var lien = "https://localhost:3005/"+this.state.lienAppel;
      liste.push(<tr>
        <td><NavLink href={lien} target="_blank">{j.id}</NavLink></td>
        {/* <td><Link  to={{pathname: '/dossier-patient',  state: { idPatient: idPatient }}}>{j.id}</Link></td>*/}
        <td><NavLink href={lien} target="_blank">{j.prenom}</NavLink></td>
        <td><NavLink href={lien} target="_blank" >{j.nom}</NavLink></td>
        <td style={{verticalAlign: 'middle'}}>{j.specialite}</td>
        <td style={{verticalAlign: 'middle'}}>{j.ville}</td>
        <td style={{verticalAlign: 'middle'}}>{j.nomHopital}</td>
      </tr>)
    }
    return liste;
  }

  toggle() {
    this.setState({
      open: !this.state.open
    });
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
                <h6 className="m-0">Médecins disponibles</h6>
              </CardHeader>
              <CardBody className="p-0 pb-3">
                <table className="table mb-0">
                  <thead className="bg-light">
                  <tr>
                    <th  id="TooltipExample" scope="col" className="border-0">
                      #
                    </th>
                    <th scope="col" className="border-0">
                      Prénoms
                    </th>
                    <th scope="col" className="border-0">
                      Nom
                    </th>
                    <th scope="col" className="border-0">
                      Spécialité
                    </th>
                    <th scope="col" className="border-0">
                      Hopital
                    </th>
                    <th scope="col" className="border-0">
                      Ville
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
        <Tooltip
          open={this.state.open}
          target="#TooltipExample"
          toggle={this.toggle}
        >
          Cliquer pour appeler
        </Tooltip>

      </Container>
    );

  }
}

export default DossiersMedicaux;
