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

import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button
} from "shards-react";
import {NavLink as RouteNavLink} from "react-router-dom";
import Link from "react-router-dom/es/Link";


class Visualisation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dossiers: '',
      medecin: '',
      patient: '',
      open: false,
      typeA: 'Allergies',
      antecedants: '',
      updated: true,
      consultations: '',
      examen: '',
      anomalies: '',
      classe: ''
    };

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
    const urlExamen = 'http://localhost:8000/her_app/examens/'.concat(this.props.location.state.idFichier);
    axios.get(urlExamen)
      .then(res => {
        const examData = res.data;
        this.setState({examen: examData});

      });
    const urlClassification = 'http://localhost:8000/her_app/classification/3';
    axios.get(urlClassification)
      .then(res => {
        const anomaliesData = res.data;
        this.setState({anomalies: anomaliesData});

      });
    const urlClassification2 = 'http://localhost:8000/her_app/classification2/';
    axios.get(urlClassification2)
      .then(res => {
        const anomaliesData = res.data;
        this.setState({classe: anomaliesData});
      });
  }


  listeHypotheses() {
    const tab = this.props.location.state.hypotheses;
    let liste = [];
    for (let i = 0; i < tab.length; i++) {
      let j = tab[i];
      liste.push(<li>{j.nomMaladie}</li>);
      console.log("Hypotheses   :" + liste);
    }
    return liste
  }

  listeSuggestions() {
    const tab = this.state.anomalies;
    let liste = [];
    for (let i = 0; i < tab.length; i++) {
      let j = tab[i];
      liste.push(<li>{j.nomAnomalie}</li>);
    }
    return liste
  }


  render() {

    const title = "Fichiers liés à la consultation de M. " + this.state.patient.prenom + " " + this.state.patient.nom;

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
                <h6 className="m-0">Informations de l'Examen</h6>
              </CardHeader>
              <ListGroupItem className="p-4">
                <strong className="text-muted d-block mb-2">
                  Nom & Prénoms
                </strong>
                <span>{this.state.patient.nom} {this.state.patient.prenom}</span>
                <br/><br/>
                <strong className="text-muted d-block mb-2">
                  Nom de l'examen
                </strong>
                <span>{this.state.examen.nomExamen}</span>
                <br/><br/>
                <strong className="text-muted d-block mb-2">
                  Date de prescription
                </strong>
                <span>{this.state.examen.datePrescription}</span>
                <br/><br/>
                <strong className="text-muted d-block mb-2">
                  Hypothèses diagnostiques
                </strong>
                <span><ul>{this.listeHypotheses()}</ul></span>

                <strong className="text-muted d-block mb-2">
                  Propositions de diagnostic
                </strong>
                <span><ul>{this.listeSuggestions()}</ul></span>
              </ListGroupItem>


            </Card>
          </Col>


          <Col lg="8" className="mb-4">
            <Card small className="mb-4" style={{minHeight: "400px"}}>
              <CardHeader className="border-bottom">
                <h6 className="m-0">Visualisation du fichier</h6>
              </CardHeader>
              <Carousel>
                <div>
                  <img src={require("../patient0.png")}/>
                  <p className="legend">Prédiction : Classe {this.state.classe.classe} </p>
                </div>
                <div>
                  <img src={require("../patient1.png")}/>
                  <p className="legend">Prédiction : Classe {this.state.classe.classe} </p>
                </div>
                <div>
                  <img src={require("../patient2.png")}/>
                  <p className="legend">Prédiction : Classe {this.state.classe.classe} </p>
                </div>
                <div>
                  <img src={require("../patient3.png")}/>
                  <p className="legend">Prédiction : Classe {this.state.classe.classe} </p>
                </div>
                <div>
                  <img src={require("../patient4.png")}/>
                  <p className="legend">Prédiction : Classe {this.state.classe.classe} </p>
                </div>
              </Carousel>
            </Card>
          </Col>
        </Row>
      </Container>
    );

  }
}

export default Visualisation;
