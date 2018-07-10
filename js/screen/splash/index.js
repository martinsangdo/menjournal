/*
* author: Martin SangDo
*/
import React, {Component} from "react";
import {Image, View, Platform, Alert, NetInfo} from "react-native";

import {Container} from "native-base";

import BaseScreen from "../../base/BaseScreen.js";
import common_styles from "../../../css/common";
import styles from "./style";    //CSS defined here
import Utils from "../../utils/functions";
import {C_Const} from '../../utils/constant';
import RNExitApp from 'react-native-exit-app';

const launchscreenLogo = require("../../../img/logo.jpg");

class Splash extends BaseScreen {
	constructor(props) {
		super(props);
		this.state = {
		};
	}
		//like onload event
		componentDidMount() {
			//check Internet connection
			NetInfo.getConnectionInfo().then((connectionInfo) => {
				if (connectionInfo.type == 'none'){
					//device is offline
					Alert.alert(
						'Alert',
						C_Const.TEXT.ERR_OFFLINE,
						[
							{text: 'OK', onPress: () => RNExitApp.exitApp()},
						],
						{ cancelable: false }
					);
				} else {
					//online
					setTimeout( () => {
						this._navigateTo('Drawer');
					}, C_Const.SPLASH_TIMER);
				}
			});
		}
	 //==========
		render() {
				const {navigate} = this.props.navigation;

				return (
						<Container>
								<View style={[styles.container]}>
										<Image source={launchscreenLogo} style={styles.logo}/>
								</View>
						</Container>
				);
		}
}

export default Splash;
