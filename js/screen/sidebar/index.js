import React, { Component } from "react";
import { Image } from "react-native";

import {
	Content,
	List,
	ListItem,
	Icon,
	Container,
	Left,
	Right,
	Badge,
	Button,
	View,
	StyleProvider,
	getTheme,
	variables, Text
} from "native-base";

import styles from "./style";
import common_styles from "../../../css/common";
import {C_Const, C_MULTI_LANG} from '../../utils/constant';

//declare menu items

class SideBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			shadowOffsetWidth: 1,
			shadowRadius: 4,
			datas: [
				{
					name: "Change profile",
					route: "EditProfile"
				},
				{
					name: "Change password",
					route: "ChangePassword"
				},
				{
					name: "Member benefits",
					route: "MemberCard"
				}
			]
		};
	}
	//
	componentDidMount() {		//window.onload
	}
	//============================== UI ==============================
	render() {
		return (
			<Container>
				<Content bounces={false} style={{ flex: 1, backgroundColor: "#fff", top: -1 }}>
					<List
						dataArray={this.state.datas}
						renderRow={data =>
							<ListItem button noBorder onPress={() => this.props.navigation.navigate(data.route)}>
								<Left>
									<Text style={[styles.text, common_styles.defaultFont]}>
										{data.name}
									</Text>
								</Left>
								<Right>
									<Icon name="ios-arrow-forward" style={common_styles.arrow_color}/>
								</Right>
							</ListItem>}
					/>
				</Content>
			</Container>
		);
	}
}

export default SideBar;
