import React from "react";
import {Container, Row, Col, Card, CardHeader, CardBody, NavLink, ListGroup, ListGroupItem} from "shards-react";
import axios from 'axios';

import PageTitle from "../components/common/PageTitle";
import Checkboxes from "../components/components-overview/Checkboxes";
import RadioButtons from "../components/components-overview/RadioButtons";
import ToggleButtons from "../components/components-overview/ToggleButtons";
import SmallButtons from "../components/components-overview/SmallButtons";
import SmallOutlineButtons from "../components/components-overview/SmallOutlineButtons";
import NormalButtons from "../components/components-overview/NormalButtons";
import NormalOutlineButtons from "../components/components-overview/NormalOutlineButtons";
import Forms from "../components/components-overview/Forms";
import FormValidation from "../components/components-overview/FormValidation";

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button
} from "shards-react";
import {NavLink as RouteNavLink} from "react-router-dom";


class DossierMedical extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dossiers: '',
      medecin: '',
      patient: '',
      open: false,
      typeA: 'Allergies',
      antecedants: '',
      updated:true,
      consultations:''
    };
    this.Welcome = this.Welcome.bind(this);
    this.ddOnclick = this.ddOnclick.bind(this)

  }


  componentDidMount() {
    console.log(this.props.location.state);
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
        const medecin = medecinData.nom + ", " + medecinData.specialite;
        this.setState({medecin: 'Dr '.concat(medecin)});
      });

    const urlPatient = 'http://localhost:8000/her_app/patients/'.concat(this.props.location.state.idPatient);
    axios.get(urlPatient)
      .then(res => {
        const patientData = res.data;
        this.setState({patient: patientData});

      });
    const urlConsultation = 'http://localhost:8000/her_app/consultation/'.concat(this.props.location.state.idPatient);
    axios.get(urlConsultation)
      .then(res => {
        const consultationData = res.data;
        this.setState({consultations: consultationData});

      });
  }

  toggle() {
    this.setState(prevState => {
      return {open: !prevState.open};
    });
  }

  ddOnclick(e) {
    document.getElementById('bouton').innerHTML = e.target.innerHTML;
    this.setState({typeA: e.target.innerHTML});
    this.setState({updated: true});
  }

  Welcome(props) {
    if(this.state.updated) {
      let urlAntecedant = 'http://localhost:8000/her_app/antecedant/' + this.props.location.state.idPatient;
      if (this.state.typeA == "Allergies") {
        urlAntecedant = urlAntecedant.concat('/A/');
        console.log(urlAntecedant);
      } else if (this.state.typeA == "Chirurgicaux") {
        urlAntecedant = urlAntecedant.concat('/C/');
        console.log(urlAntecedant);
      } else {
        urlAntecedant = urlAntecedant.concat('/F/');
        console.log(urlAntecedant);
      }
      axios.get(urlAntecedant)
        .then(res => {
          const antecedantData = res.data;
          //console.log("data : "+res.data);
          this.setState({antecedants: antecedantData})
        });
      this.setState({updated: false});
    }

    let liste=[];
    const elements = this.state.antecedants;
    for (let i = 0; i < elements.length; i++) {
      let j = elements[i];
      liste.push(
        <ListGroupItem className="p-4">
        <strong className="text-muted d-block mb-2">
          Intitulé
        </strong>
        <span>{j.nomAntecedant}</span>
        <br/><br/>
        <strong className="text-muted d-block mb-2">
          Remarques
        </strong>
        <span>{j.remarquesAntecedant}</span>
          <br/><br/></ListGroupItem>
      )
    }

    return (

      liste

  )
  }

  confirmation = (props) =>{
    if(props)
      return 'Oui';
    else
      return 'Non';
  }

  listeConsultations = () => {
    const elements = this.state.consultations;
    let liste=[];
    for (let i = 0; i < elements.length; i++) {
      console.log(elements[i].id);
      let j = elements[i];
      const idPatient = j.id;
      liste.push( <tr>
        <td><NavLink tag={RouteNavLink} to={{pathname: '/dossier-patient',  state: { idPatient: idPatient }}}>{j.id}</NavLink></td>
        {/* <td><Link  to={{pathname: '/dossier-patient',  state: { idPatient: idPatient }}}>{j.id}</Link></td>*/}
        <td><NavLink tag={RouteNavLink} to={{pathname: '/dossier-patient',  state: { idPatient: idPatient }}}>{j.dateConsultation}</NavLink></td>
        <td><NavLink tag={RouteNavLink} to={{pathname: '/dossier-patient',  state: { idPatient: idPatient }}}>{j.motifs}</NavLink></td>
        <td style={{verticalAlign:'middle'}}>{j.hypothesesC}</td>
        <td style={{verticalAlign:'middle'}}>{this.confirmation(j.finConsultation)}</td>
      </tr>)
    }
    return liste;
  }


  render() {


    const title = "Dossier médical de M. " + this.state.patient.prenom + " " + this.state.patient.nom;

    return (

      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="12" title={title} subtitle={this.state.medecin} className="text-sm-left"/>
        </Row>

        {/* Default Light Table */}
        <Row>
          <Col lg="4" className="mb-4">
            {/* Sliders & Progress Bars */}
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                <h6 className="m-0">Fiche Patient</h6>
              </CardHeader>
              <ListGroupItem className="p-4">
                <strong className="text-muted d-block mb-2">
                  Nom & Prénoms
                </strong>
                <span>{this.state.patient.nom} {this.state.patient.prenom}</span>
                <br/><br/>
                <strong className="text-muted d-block mb-2">
                  Date de naissance
                </strong>
                <span>{this.state.patient.dateNaissance}</span>
                <br/><br/>
                <strong className="text-muted d-block mb-2">
                  Nationalité
                </strong>
                <span>{this.state.patient.nationalite}</span>
                <br/><br/>
                <strong className="text-muted d-block mb-2">
                  Situation matrimoniale
                </strong>
                <span>Célibataire</span>
                <br/><br/>
                <strong className="text-muted d-block mb-2">
                  Profession
                </strong>
                <span>{this.state.patient.profession}</span>
              </ListGroupItem>


            </Card>
          </Col>


          <Col lg="8" className="mb-4">
            <Card small className="mb-4" style={{ minHeight: "400px" }}>
              <CardHeader className="border-bottom">
                  <h6 className="m-0">Antécédents du Patient</h6>
              </CardHeader>
              <Row>
                <Col>
                  <b style={{marginLeft:'10px', marginRight:'10px'}}>Type :</b>
                  <Dropdown open={this.state.open} toggle={this.toggle} group>
                    <Button id="bouton" theme='secondary'>Allergies</Button>
                    <DropdownToggle theme='secondary' split/>
                    <DropdownMenu>
                      <DropdownItem onClick={this.ddOnclick}>Allergies</DropdownItem>
                      <DropdownItem onClick={this.ddOnclick}>Chirurgicaux</DropdownItem>
                      <DropdownItem onClick={this.ddOnclick}>Familiaux</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </Col>
              </Row>
              {this.Welcome()}
            </Card>
          </Col>
        </Row>


    {/*Affichage des dossier*/}


        <Row>
          <Col>
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                <h6 className="m-0">Historique des consultations</h6>
              </CardHeader>
              <CardBody className="p-0 pb-3">
                <table className="table mb-0">
                  <thead className="bg-light">
                  <tr>
                    <th scope="col" className="border-0">
                      #
                    </th>
                    <th scope="col" className="border-0">
                      Date de consultation
                    </th>
                    <th scope="col" className="border-0">
                      Motifs
                    </th>
                    <th scope="col" className="border-0">
                      Hypothèses diagnostiques
                    </th>
                    <th scope="col" className="border-0">
                      Confirmation
                    </th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.listeConsultations()}
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

export default DossierMedical;
