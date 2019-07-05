import React from "react";
import {Container, Row, Col, Card, CardHeader, CardBody, NavLink, ListGroup, ListGroupItem} from "shards-react";
import axios from 'axios';

import PageTitle from "../components/common/PageTitle";
import { Modal, ModalBody, ModalHeader } from "shards-react";
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
import Link from "react-router-dom/es/Link";


class Consultation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dossiers: '',
      medecin: '',
      medecin2: '',
      patient: '',
      open: false,
      updated: true,
      consultations: '',
      hypotheses: '',
      examens:'',
      fichier:'',
      idConsultation:''
    };
    this.getMedecin = this.getMedecin.bind(this);
    this.listeHypotheses = this.listeHypotheses.bind(this);
    this.listeExamens = this.listeExamens.bind(this);
    this.toggle = this.toggle.bind(this);


  }


  componentDidMount() {
    console.log("this.props.location.state : "+JSON.stringify(this.props.location));

    const urlMedecin = 'http://localhost:8000/her_app/medecin/'.concat(localStorage.getItem('username')).concat('/');
    axios.get('http://localhost:8000/her_app/patients/')
      .then(res => {
        const dossiers = res.data;
        console.log(dossiers);
        this.setState({idConsultation: this.props.location.state.idConsultation});
        this.setState({dossiers: dossiers});
        console.log(this.state.dossiers);
      });
    axios.get(urlMedecin)
      .then(res => {
        const medecinData = res.data;
        const medecin = medecinData.nom + ", " + medecinData.specialite;
        this.setState({medecin: 'Dr '.concat(medecin)});

      });


    const urlConsultation = 'http://localhost:8000/her_app/consultations/'.concat(this.props.location.state.idConsultation);
    console.log("id ------" + urlConsultation);
    axios.get(urlConsultation)
      .then(res => {
        const consultationData = res.data;
        this.setState({consultations: consultationData});
        this.setState({medecin2: consultationData.medecin});
        this.getMedecin(consultationData.medecin);
      });

    const urlPatient = 'http://localhost:8000/her_app/patients/'.concat(this.props.location.state.idPatient);
    axios.get(urlPatient)
      .then(res => {
        const patientData = res.data;
        this.setState({patient: patientData});

      });

    const urlHypotheses = 'http://localhost:8000/her_app/hypothese/'.concat(this.props.location.state.idConsultation);
    axios.get(urlHypotheses)
      .then(res => {
        const hyptData = res.data;
        this.setState({hypotheses: hyptData});
      });

    const urlExamens = 'http://localhost:8000/her_app/examen/'.concat(this.props.location.state.idConsultation);
    axios.get(urlExamens)
      .then(res => {
        const examData = res.data;
        this.setState({examens: examData});
      });

    const urlFichier = 'http://localhost:8000/her_app/fichier/1';
    axios.get(urlFichier)
      .then(res => {
        let h = res.data;
        console.log('fichier init'+h);
        this.setState({fichier: h})
      });
  }




  getMedecin(idMedecin) {
    const urlMedecin2 = 'http://localhost:8000/her_app/medecins/' + idMedecin;
    console.log("url2 :" + urlMedecin2);
    axios.get(urlMedecin2)
      .then(res => {
        const medecinData = res.data;
        const medecin = medecinData.nom + " " + medecinData.prenom;
        this.setState({medecin2: 'Dr '.concat(medecin)});

      });


    return this.state.medecin2;

  }






  listeHypotheses() {
    const tab = this.state.hypotheses;
    let liste = [];
    for (let i = 0; i < tab.length; i++) {
      let j = tab[i];
      liste.push(<li><Link to="#" id={j.id} onClick={this.toggle}>{j.nomMaladie}</Link></li>);
      console.log("Hypotheses   :" + liste);
    }
    return liste
  }

  listeExamens() {
    const tab = this.state.examens;
    let liste = [];
    for (let i = 0; i < tab.length; i++) {
      let j = tab[i];
      liste.push(<li>{j.nomExamen}</li>);
    }
    return liste
  }

  toggle() {
    this.setState({
      open: !this.state.open
    });
  }

  listeExamens2 = () => {
    const elements = this.state.examens;
    const fichierS = this.state.fichier;
    let j;
    let h, nomFichier, typeFichier, fichier;
    for (let i = 0; i < fichierS.length; i++) {
      console.log('boucle fichier !!!!!!!!!!!');
       j = fichierS[i];
       h = j.id;
       nomFichier = j.nomFichier;
       typeFichier = j.typeFichier;
      fichier = j.fichier

    }
    console.log("H :"+h);

    let liste=[];
    for (let i = 0; i < elements.length; i++) {

      let j = elements[i];
      let id=j.id;
      console.log("id :"+id);

      console.log(elements[i].id);
      let idConsultation = j.id;
      liste.push( <tr>
        <td><NavLink tag={RouteNavLink} to={{pathname: '/visualisation-ecg',  state: { idConsultation: this.state.idConsultation, idPatient: this.state.patient.id, idFichier:1, idExamen:j.id, hypotheses:this.state.hypotheses }}}>{j.id}</NavLink></td>
        {/* <td><Link  to={{pathname: '/dossier-patient',  state: { idPatient: idPatient }}}>{j.id}</Link></td>*/}
        <td><NavLink tag={RouteNavLink} to={{pathname: '/visualisation-ecg',  state: { idConsultation: this.state.idConsultation, idPatient: this.state.patient.id, idFichier:1, idExamen:j.id, hypotheses:this.state.hypotheses }}}>{j.nomExamen}</NavLink></td>
        <td><NavLink tag={RouteNavLink} to={{pathname: '/visualisation-ecg',  state: { idConsultation: this.state.idConsultation, idPatient: this.state.patient.id, idFichier:1, idExamen:j.id, hypotheses:this.state.hypotheses }}}>{j.datePrescription}</NavLink></td>
        <td style={{verticalAlign:'middle'}}>{fichierS.typeFichier}</td>
        <td><NavLink tag={RouteNavLink} to={{pathname: '/visualisation-ecg',  state: { idConsultation: this.state.idConsultation, idPatient: this.state.patient.id, idFichier:1, idExamen:j.id, hypotheses:this.state.hypotheses }}}>{fichierS.fichier}</NavLink></td>

      </tr>)
    }
    return liste;
  }


  render() {

    const diagnosticConfirme = this.state.consultations.diagnostic;
    let diagnostic;
    if (diagnosticConfirme === ''){
      diagnostic = <li>Aucun</li>
    }
    else{
      diagnostic = <li>{diagnosticConfirme}</li>
    }

    const title = "Détails de consultation de M. "+this.state.patient.prenom+" "+this.state.patient.nom;

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
                <h6 className="m-0">Fiche de consultation</h6>
              </CardHeader>
              <ListGroupItem className="p-4">
                <strong className="text-muted d-block mb-2">
                  Nom & Prénoms du patient
                </strong>
                <span>{this.state.patient.nom} {this.state.patient.prenom}</span>
                <br/><br/>
                <strong className="text-muted d-block mb-2">
                  Date de consultation
                </strong>
                <span>{this.state.consultations.dateConsultation}</span>
                <br/><br/>
                <strong className="text-muted d-block mb-2">
                  Médecin
                </strong>
                <span>{this.state.medecin2}</span>
                <br/><br/>
                <strong className="text-muted d-block mb-2">
                  Poids
                </strong>
                <span>{this.state.consultations.poids}</span>
                <br/><br/>

              </ListGroupItem>


            </Card>
          </Col>


          <Col lg="8" className="mb-4">
            <Card small className="mb-4" style={{minHeight: "400px"}}>
              <CardHeader className="border-bottom">
                <h6 className="m-0">Examen médical</h6>
              </CardHeader>
              <ListGroupItem className="p-4">
                <strong className="text-muted d-block mb-2">
                  Motifs
                </strong>
                <span>{this.state.consultations.motifs}</span>
                <br/><br/>
                <strong className="text-muted d-block mb-2">
                  Remarques médecin
                </strong>
                <span>{this.state.consultations.remarquesMedecin}</span>
                <br/><br/>
                <strong className="text-muted d-block mb-2">
                  Hypothèses diagnostiques
                </strong>
                <span><ul>{this.listeHypotheses()}</ul></span>
                <strong className="text-muted d-block mb-2">
                  Examens paracliniques
                </strong>
                <span><ul>{this.listeExamens()}</ul></span>
                <strong className="text-muted d-block mb-2">
                  Diagnostic confirmé
                </strong>
                <span><ul>{diagnostic}</ul></span>
              </ListGroupItem>
            </Card>
          </Col>
        </Row>


        {/*Affichage des dossier*/}


        <Row>
          <Col>
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                <h6 className="m-0">Examens paracliniques et fichiers liés</h6>
              </CardHeader>
              <CardBody className="p-0 pb-3">
                <table className="table mb-0">
                  <thead className="bg-light">
                  <tr>
                    <th scope="col" className="border-0">
                      #
                    </th>
                    <th scope="col" className="border-0">
                      Nom de l'examen
                    </th>
                    <th scope="col" className="border-0">
                      Date de prescription
                    </th>
                    <th scope="col" className="border-0">
                      Type fichier
                    </th>
                    <th scope="col" className="border-0">
                      Nom fichier
                    </th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.listeExamens2()}
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Button onClick={this.toggle}>Click Me!</Button>
        <Modal open={this.state.open} toggle={this.toggle}>
          <ModalHeader>Header</ModalHeader>
          <ModalBody>👋 Hello there !</ModalBody>
        </Modal>


      </Container>
    );

  }
}

export default Consultation;
