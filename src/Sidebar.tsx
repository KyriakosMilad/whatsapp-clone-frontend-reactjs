import React, { Component } from 'react';
import {Col} from 'react-bootstrap';
import ChatCard from './ChatCard';

export default class Sidebar extends Component {
  render() {
    return (
      <Col md={2}>
        <ChatCard name="Kyriakos" image="http://lorempixel.com/output/people-h-c-1141-1147-8.jpg" lastMessage="هناك حقيقة مثبتة منذ زمن طويل وهي..." lastMessageDate="15:22" />
      </Col>
    )
  }
}
