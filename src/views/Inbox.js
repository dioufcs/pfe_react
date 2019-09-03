import React, { Component } from "react";
import { InboxHtml } from "./templates/InboxHtml";
import ModalCompose from "./ModalCompose";
import ModalMessage from "./ModalMessage";
import axios from 'axios';
import {Container, Row, Col, Card, CardHeader, CardBody, NavLink, ListGroup, ListGroupItem} from "shards-react";
import ReactDOM from "react-dom";
import bootstrap from "bootstrap"; 

export class Inbox extends Component {
  constructor(props) {
    super(props);
    this.markRead = this.markRead.bind(this);
    this.doShow = this.doShow.bind(this);
    this.doDelete = this.doDelete.bind(this);
    this.toggleMark = this.toggleMark.bind(this);
    this.toggleMarkAll = this.toggleMarkAll.bind(this);
    this.deleteMarked = this.deleteMarked.bind(this);
    this.refreshMessages = this.refreshMessages.bind(this);
    this.deleteMessages = this.deleteMessages.bind(this);

    this.ModalMessage = React.createRef();
    this.ModalCompose = React.createRef();
    this.state = {
      initMessages: '',
      messages: '',
      selected: {},
      deleted: [],
      medecin: '',
    };
  }

  componentDidMount(){
    const urlMedecin = 'http://localhost:8000/her_app/medecin/'.concat(localStorage.getItem('username')).concat('/');
    axios.get(urlMedecin)
      .then(res => {
        const medecinData = res.data;
        const medecin = medecinData.id;
        this.setState({medecin: medecinData})
        axios.get('http://localhost:8000/her_app/liste_messages/'+medecin+'/')
          .then(res => {
            const messages = res.data;
            this.setState({messages: messages, initMessages: messages});
          });
      });

  }



  markRead(idx) {
    /* mark this message as read */
    let messages = [...this.state.messages];
    messages[idx].read = true;
    this.setState({ messages });
  }

  doShow(idx) {
    this.markRead(idx);
    this.setState({
      selected: this.state.messages[idx]
    });
    this.nomMedecin(this.state.messages[idx].fromAddress);
    /* open message in modal */
    this.ModalMessage.current.show();
  }

  doCompose() {
    /* open compose modal */
    this.ModalCompose.current.show();
  }

  toggleMark(idx) {
    let messages = [...this.state.messages];
    messages[idx].marked = messages[idx].marked ? 0 : 1;
    this.setState({ messages });
  }

  doDelete(idx) {
    let messages = [...this.state.messages];
    let deleted = [...this.state.deleted];
    /* append it to deleted */
    deleted.push(messages[idx]);
    /* remove the message at idx */
    messages.splice(idx, 1);
    this.setState({ messages, deleted });
  }

  toggleMarkAll() {
    let messages = [...this.state.messages];
    messages.map((v, k) => {
      return (v.marked = v.marked ? 0 : 1);
    });
    this.setState({ messages });
  }

  deleteMarked() {
    var self = this;
    let messages = [...this.state.messages];
    var tbd = [];
    for (var k = 0; k < messages.length; k++) {
      if (messages[k].marked === 1) {
        tbd.push(k);
      }
    }

    if (tbd.length > 0) {
      self.deleteMessages(tbd);
    }
  }

  refreshMessages() {
    let initMessages = [...this.state.initMessages];
    this.setState({ messages: initMessages });
  }

  deleteMessages(arr) {
    let messages = [...this.state.messages];
    let deleted = [...this.state.deleted];
    for (var i = arr.length - 1; i >= 0; i--) {
      deleted.push(messages[i]);
      messages.splice(arr[i], 1);
    }
    this.setState({ messages, deleted });
  }

  nomMedecin(i){
    axios.get('http://localhost:8000/her_app/medecin_message/'+i+'/')
      .then(res => {
        const sendTo = res.data;
        this.setState({nomMedecin: sendTo.nom});
      });
  }

  render() {
    return (
      <Container fluid className="main-content-container px-4">
      <div>
        <InboxHtml parent={this} />
        <ModalCompose sendTo={this.state.nomMedecin} sendToid={this.state.selected.fromAddress} from={this.state.medecin.id} />
        <ModalMessage ref={this.ModalMessage} message={this.state.selected} />
      </div>
      </Container>
    );
  }
}

export default Inbox;
