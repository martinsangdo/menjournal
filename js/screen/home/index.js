/**
 * author: Martin SD
 * Home page after Sign in
 */
import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Footer,
  FooterTab,
  Left,
  Right,
  Body,
  Badge,
  Grid,Col,Row,Text
} from "native-base";
import { Image, View, TouchableOpacity } from "react-native";
import { NavigationActions } from "react-navigation";

import styles from "./style";
import common_styles from "../../../css/common";
import Utils from "../../utils/functions";
import {C_Const, C_Mess, C_MULTI_LANG} from '../../utils/constant';
import {API_URI} from '../../utils/api_uri';

class Home extends Component {
  constructor(props) {
		super(props);
		this.state = {
		};
	}
  //
  componentDidMount() {		//window.onload
    console.ignoredYellowBox = ['Remote debugger'];   //don't show warning in app when debugging
	}
  //============================== UI ==============================
  render() {
    return (
      <Container style={styles.container}>
        <Header style={[common_styles.header, common_styles.whiteBg]}>
          <Left style={common_styles.headerLeft}>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="menu" style={styles.home_icon}/>
            </Button>
            <Button
              style={styles.btn_notif}
              transparent onPress={this._on_press_notif_icon}
              >
              <Icon name="ios-mail-outline" style={styles.home_icon}/>
                <Badge style={[styles.badge, common_styles.blueBg]}>
                  <Text style={[styles.badge_text, common_styles.whiteColor]}>{this.state.unread_nofif_number}</Text>
                </Badge>
            </Button>
          </Left>
          <Body style={styles.headerBody}>
          </Body>
          <Right style={common_styles.headerRight}>
            <Button
              transparent onPress={this._open_confirm_popup}>
              <Icon name="log-out" style={styles.home_icon}/>
            </Button>
          </Right>
        </Header>

        <Content style={{flex:1}}>

        </Content>
      </Container>
    );
  }
}

export default Home;
