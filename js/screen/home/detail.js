import React, {Component} from "react";
import {View, TouchableOpacity, Share, Dimensions, Platform, WebView, ScrollView} from "react-native";

import {Container, Content, Button, Text, Header, Body, Left, Right, Icon} from "native-base";

import BaseScreen from "../../base/BaseScreen.js";
import common_styles from "../../../css/common";
import styles from "./style";    //CSS defined here
import Utils from "../../utils/functions";
import {C_Const} from '../../utils/constant';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import RequestData from '../../utils/https/RequestData';
import {API_URI} from '../../utils/api_uri';
import Spinner from 'react-native-loading-spinner-overlay';
import {setting} from "../../utils/config";
import HTML from 'react-native-render-html';

const customStyles = {
	'yrecipe-print-link': { width: 0, height:0 },
	'yummly-button':{ width: 0, height:0 },
	'strong': {fontSize:20, fontWeight:'bold'},
	'instruction': {paddingTop:10},
};

const customTags = {
	'iframe': {maxWidth:Dimensions.get('window').width, maxHeight:300}
};

class Detail extends BaseScreen {
		constructor(props) {
			super(props);
			this.state = {
				title: '',
				content: '',
				excerpt: '',
				link: '',
				is_bookmarked: false,
				loading_indicator_state: false
			};
		}
		//
		componentDidMount() {
      var content = this.props.navigation.state.params.detail.content;
      content = content.replace('\r\n', '<br/><br/>').replace('\n', '<br/><br/>').replace('\r', '<br/><br/>');
			// Utils.dlog(content);
			this.setState({
				link: this.props.navigation.state.params.detail.link,
				title: this.props.navigation.state.params.detail.title,
				excerpt: this.props.navigation.state.params.detail.excerpt,
        content: content
			});
		}
		//
		_on_go_back = () => {
			this.props.navigation.goBack();
		}
		//==========
		_share_link = () => {
				Share.share({
					title: this.state.title,
					message: this.state.link,
					subject: 'Share Link' //  for email
				}, {
					// Android only:
					dialogTitle: 'Choose app'
			});
		};
		//bookmark / unbookmark article
		_toggle_bookmark = () => {
			/*
			this.ref.add({
					device_id: me.state.user_id,
					link: this.state.link,
					coinbase_addr_id: detail.data.id,
					address: detail.data.address,
					code: Coinbase.COIN_LIST[me.state.coin_index].code
			})
			.then(function(docRef) {
					if (docRef.id){
						me.setState({err_mess: C_Const.TEXT.MESS_CREATE_WALLET_OK, isSubmitting: false, loading_indicator_state: false});
					} else {
						me.setState({err_mess: C_Const.TEXT.ERR_SERVER, isSubmitting: false, loading_indicator_state: false});
					}
			})
			.catch(function(error) {
					me.setState({err_mess: C_Const.TEXT.ERR_SERVER, isSubmitting: false, loading_indicator_state: false});
			});
			*/
		};
	 //==========
		render() {
				return (
						<Container padder>
							<Header style={[common_styles.header, common_styles.whiteBg]}>
								<Left style={styles.left}>
									<TouchableOpacity onPress={() => this._on_go_back()}>
										<View style={styles.left_row}>
											<View style={[common_styles.float_center]}>
												<Icon name="ios-arrow-back-outline" style={common_styles.default_font_color}/>
											</View>
											<View style={[common_styles.margin_l_10, common_styles.float_center]}>
												<Text uppercase={false} style={[common_styles.default_font_color]}>Back</Text>
											</View>
										</View>
									</TouchableOpacity>
								</Left>
								<Right style={[common_styles.headerRight]}>
									<TouchableOpacity style={common_styles.margin_r_10} onPress={() => this._share_link()} style={{marginRight:10, justifyContent: 'flex-start', marginBottom:3}}>
										<SimpleLineIcons name="share" style={[common_styles.default_font_color, {fontSize:21}]}/>
									</TouchableOpacity>
								</Right>
							</Header>
							{/* END header */}
							<Content>
								<Spinner visible={this.state.loading_indicator_state} textStyle={common_styles.whiteColor} />
								{/* fake webview to auto calculate height */}
								<View style={[common_styles.padding_20, {paddingTop:0}]}>
									<ScrollView style={styles.main_scroll}>
		                <HTML html={this.state.content} imagesMaxWidth={Dimensions.get('window').width}
											classesStyles={customStyles} tagsStyles={customTags}
										/>
		            	</ScrollView>
								</View>
							</Content>
						</Container>
				);
		}
}

export default Detail;
