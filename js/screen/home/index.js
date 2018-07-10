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
import { Image, ImageBackground, View, TouchableOpacity, FlatList } from "react-native";
import { NavigationActions } from "react-navigation";
import Spinner from 'react-native-loading-spinner-overlay';
import RequestData from '../../utils/https/RequestData';

import styles from "./style";
import common_styles from "../../../css/common";
import Utils from "../../utils/functions";
import {C_Const, C_Mess, C_MULTI_LANG} from '../../utils/constant';
import {API_URI} from '../../utils/api_uri';

class Home extends Component {
  constructor(props) {
		super(props);
    this.state = {
				offset: 0,
				data_list: [],
				is_getting_data: true,
				loading_indicator_state: false,
				isShowMore: false,
				key_list: {}		//to make sure there is no duplicate item in list
			};
	}
  //
  componentDidMount() {		//window.onload
    console.ignoredYellowBox = ['Remote debugger'];   //don't show warning in app when debugging
    this._get_data();
	}
  //
  _open_subscribe = () => {

  };
  //
		_keyExtractor = (item) => item.id.toString();
		//render the list. MUST use "item" as param
		_renderItem = ({item}) => (
      <TouchableOpacity onPress={() => this._open_detail(item.index)} style={styles.item_container}>
        <ImageBackground source={{uri: Utils.isEmpty(item.img_src)?null:item.img_src}} style={styles.imageContainer}>
          <View
            style={{
              alignItems: "center",
              backgroundColor: "transparent",
            }}
          >
            <View style={[styles.text_cointainer]}>
              <Text style={[styles.title_home, common_styles.bold, common_styles.float_center]}>{item.title}</Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
		);
    //get latest news
		_get_data = () => {
			this.setState({is_getting_data: true, loading_indicator_state: true}, () => {
				var url = API_URI.GET_NEWS_LIST + '&page=' + (this.state.offset / C_Const.PAGE_LEN + 1);
				// Utils.dlog(url);
				RequestData.sentGetRequest(url,
					(list, error) => {
					if (list != null){
            // Utils.dlog(list);
						var me = this;
						var len = list.length;
            for (var i=0; i<len; i++){
              if (!me.state.key_list[list[i]['id']] || me.state.key_list[list[i]['id']]==null){
                // Utils.dlog(list[i]);
                me.state.data_list.push({
                    id: list[i]['id'],
                    index: me.state.data_list.length,
                    title: Utils.decodeHtml(list[i]['title']['rendered']),
                    img_src: C_Const.ICON_URL,
										link: list[i]['link'],
                    excerpt: list[i]['excerpt']['rendered'],
                    content: list[i]['content']['rendered']
                });
                me.state.key_list[list[i]['id']] = true;
                me._get_feature_media(me.state.data_list.length - 1, list[i]['_links']['wp:featuredmedia'][0]['href']);
              }
            }
						if (len < C_Const.PAGE_LEN){
							//no more
							this.setState({isShowMore: false, loading_indicator_state: false});
						} else {
							this.setState({isShowMore: true, loading_indicator_state: false});  //maybe have more
						}
					} else {
							Utils.xlog('error', error);
							this.setState({isShowMore: false, loading_indicator_state: false});
					}
					this.setState({is_getting_data: false, loading_indicator_state: false});
				});
				//timeout of waiting request
				setTimeout(() => {
					if (this.state.loading_indicator_state){
						this.setState({loading_indicator_state: false});  //stop loading
					}
				}, C_Const.MAX_WAIT_RESPONSE);
			});
		};
    //get media list of a post
    _get_feature_media = (item_index, featured_media_url) => {
      RequestData.sentGetRequest(featured_media_url,
        (detail, error) => {
          if (!(Utils.isEmpty(detail) || Utils.isEmpty(detail['media_details']) || Utils.isEmpty(detail['media_details']['sizes']) ||
              Utils.isEmpty(detail['media_details']['sizes']['contentslideshow']) || Utils.isEmpty(detail['media_details']['sizes']['contentslideshow']['source_url']))){
            var size_url = detail['media_details']['sizes']['contentslideshow']['source_url'];
            this.state.data_list[item_index]['img_src'] = size_url;
            this.forceUpdate();
          }
        });
    };
    //
    _open_detail = (index) => {
      this.props.navigation.navigate('Detail', {
				detail: this.state.data_list[index],
			});
    };
		//
		_load_more = () => {
			if (!this.state.is_getting_data && this.state.isShowMore){
				this.setState({offset: this.state.offset + C_Const.PAGE_LEN}, () => {
					this._get_data();
				});
			}
		};
    //
    _open_search = () => {

    };
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
          </Left>
          <Body style={styles.headerBody}>
            <Text>Home</Text>
          </Body>
          <Right style={common_styles.headerRight}>
            <Button
              transparent onPress={this._open_search}>
              <Icon name="search" style={styles.home_icon}/>
            </Button>
          </Right>
        </Header>

        <Spinner visible={this.state.loading_indicator_state} textStyle={common_styles.whiteColor} />

        <View style={{flex:1}}>
          <FlatList
                data={this.state.data_list}
                renderItem={this._renderItem}
                refreshing={false}
                onEndReachedThreshold={0.5}
                keyExtractor={this._keyExtractor}
                onEndReached={({ distanceFromEnd }) => this._load_more()}
                initialNumToRender={20}
              />
        </View>
      </Container>
    );
  }
}

export default Home;
