import React from "react";
import {Container, Row, Col, Card, CardHeader, CardBody, NavLink, ListGroup, ListGroupItem} from "shards-react";
import axios from 'axios';
import {Modal, ModalBody, ModalHeader, FormSelect} from "shards-react";


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
import {Redirect} from "react-router";


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
      classe: '',
      hypotheses: '',
      proposition: '',
      redirect: false,
      idConsultation: '',
      selectedOption: '',
      open2: false,
      anomaliesForm: ''
    };
    this.toggle = this.toggle.bind(this);
    this.essai = this.essai.bind(this);
    this.essai2 = this.essai2.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggle2 = this.toggle2.bind(this);
    this.listeSuggestions2 = this.listeSuggestions2.bind(this);
    this.redirection = this.redirection.bind(this)

  }


  componentDidMount() {
    this.setState({
      hypotheses: this.props.location.state.hypotheses,
      idConsultation: this.props.location.state.idConsultation
    });
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
    //const tab = this.props.location.state.hypotheses;
    const tab = this.state.hypotheses;
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
      liste.push(<li><Link to="#" id={j.id} onClick={this.toggle}>{j.nomAnomalie}</Link></li>);
    }
    return liste
  }

  clickHypotheses(e) {
    this.toggle();
  }

  toggle(e) {
    if (this.state.open2) {
      this.setState({
        open2: false
      });
    }
    if (!this.state.open) {
      this.setState({
        proposition: e.target.innerHTML
      });
    }
    this.setState({
      open: !this.state.open
    });
  }

  toggle2(e) {


    this.setState({
      open2: !this.state.open2
    });

  }

  redirection() {
    this.props.history.push({
      pathname: '/details-consultation',
      state: {idConsultation: this.state.idConsultation, idPatient: this.state.patient.id}
    });

  }


  essai() {
    const urlConfirmation = 'http://localhost:8000/her_app/post_diagnostic/'.concat(this.state.idConsultation).concat('/');
    const data = {
      diagnostic: this.state.proposition
    };
    axios.post(urlConfirmation, {data})
      .then(res => {
        console.log(res.data);
      });

    setTimeout(function () {
      this.redirection();

    }.bind(this), 1000);

  }

  handleChange(event) {
    console.log("Event.target.value is", event.target.value);

    let urlAnomalies = 'http://localhost:8000/her_app/anomalies/' + event.target.value;
    axios.get(urlAnomalies)
      .then(res => {
        const anomaliesData = res.data;
        this.setState({anomaliesForm: anomaliesData});
      });

    this.setState({selectedOption: event.target.value});

  }

  essai2() {

    const urlConfirmation = 'http://localhost:8000/her_app/post_diagnostic/'.concat(this.state.idConsultation).concat('/');
    const data = {
      diagnostic: this.state.proposition
    };
    axios.post(urlConfirmation, {data})
      .then(res => {
        console.log(res.data);
      });


    //this.props.history.push({pathname:'/details-consultation', state: { idConsultation: this.state.idConsultation, idPatient: this.state.patient.id }});
  }

  listeSuggestions2() {

    let tab = this.state.anomaliesForm;
    let liste = [];
    for (let i = 0; i < tab.length; i++) {
      let j = tab[i];
      liste.push(<li><Link to="#" id={j.nomAnomalie} onClick={this.toggle}>{j.nomAnomalie}</Link></li>);
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
            <Button block onClick={this.toggle2}>Proposer un diagnostic</Button>
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

        <div>
          <Modal open={this.state.open} toggle={this.toggle}>
            <ModalHeader>Confirmation du diagnostic</ModalHeader>
            <ModalBody>Type d'arrythmie proposé :<br/><br/>
              <h5>{this.state.proposition}</h5>
              <Button onClick={this.essai}>Confirmer</Button>
            </ModalBody>
          </Modal>
        </div>

        <div>
          <Modal open={this.state.open2} toggle={this.toggle2}>
            <ModalHeader>Proposition de diagnostic</ModalHeader>
            <ModalBody>
              <h5>Sélectionner une classe :</h5>
              <FormSelect value={this.state.selectedOption} onChange={this.handleChange}>
                <option value="first">---</option>
                <option value="1">Classe N</option>
                <option value="2">Classe S</option>
                <option value="3">Classe V</option>
                <option value="4">Classe F</option>
                <option value="5">Classe Q</option>
              </FormSelect>
            </ModalBody>
            <span><ul>{this.listeSuggestions2()}</ul></span>
          </Modal>
        </div>

      </Container>

    );

  }
}

export default Visualisation;
