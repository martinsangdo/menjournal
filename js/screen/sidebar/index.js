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
				{name: "My Bookmarks", cateogry: "my_bookmark"},
				{name: "Gear", cateogry: "gear"},
				{name: "Health & Fitness", cateogry: "gear"},
				{name: "Adventure", cateogry: "gear"},
				{name: "Food & Drink", cateogry: "gear"},
				{name: "Style", cateogry: "gear"},
				{name: "Travel", cateogry: "gear"},
				{name: "Public Lands", cateogry: "gear"},
				{name: "Features", cateogry: "gear"},
				{name: "Whiskey", cateogry: "gear"},
				{name: "Watches", cateogry: "gear"},
				{name: "Cars", cateogry: "gear"},
				{name: "Recipes", cateogry: "gear"},
				{name: "Life Advice", cateogry: "gear"},
				{name: "Fatherhood", cateogry: "gear"},
				{name: "Record Book", cateogry: "gear"},
				{name: "Subscriber Service", cateogry: "gear"},
				{name: "Sports", cateogry: "gear"},
				{name: "Beer", cateogry: "gear"},
				{name: "Workouts", cateogry: "gear"},
				{name: "Weight Loss", cateogry: "gear"},
				{name: "Grooming", cateogry: "gear"},
				{name: "Nutrition", cateogry: "gear"},
				{name: "Gift Ideas", cateogry: "gear"},
				{name: "Subscribe", cateogry: "gear"},
				{name: "Give a Gift", cateogry: "gear"},
				{name: "Accessibility Statement", cateogry: "gear"}
			]
		};
	}
	//
	componentDidMount() {		//window.onload
		
	}
	//
	_open_page(category) {		//window.onload
		if (category == 'my_bookmark'){
			this.props.navigation.navigate('Bookmark');
		} else {
			this.props.navigation.navigate('Category', {
				category: category
			});
		}
	}
	//============================== UI ==============================
	render() {
		return (
			<Container>
				<Content bounces={false} style={{ flex: 1, backgroundColor: "#fff", top: -1 }}>
					<List
						dataArray={this.state.datas}
						renderRow={data =>
							<ListItem button noBorder onPress={() => this._open_page(data.category)}>
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
