import React, {Component} from "react";
import {Image, View, Platform, TouchableOpacity, FlatList, ScrollView, Dimensions, Alert} from "react-native";

import {Container, Content, Button, H3, Text, Header, Title, Body, Left, Right, Icon} from "native-base";

import BaseScreen from "../../base/BaseScreen.js";
import common_styles from "../../../css/common";
import styles from "./style";    //CSS defined here
import {API_URI} from '../../utils/api_uri';
import store from 'react-native-simple-store';

import Utils from "../../utils/functions";
import {C_Const} from '../../utils/constant';
import RequestData from '../../utils/https/RequestData';
import Spinner from 'react-native-loading-spinner-overlay';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import SearchBar from 'react-native-material-design-searchbar';

const deviceWidth = Dimensions.get("window").width;

class Search extends BaseScreen {
    constructor(props) {
  		super(props);
  		this.state = {
        offset: 0,
  			data_list: [],
  			loading_indicator_state: false,
  			isShowMore: false,
        keyword: '',
        is_searching: false,
        key_list: {}
  		};
  	}
    //
    componentDidMount() {
    }
    //==========
    //
  		_keyExtractor = (item) => item.id.toString();
  		//render the list. MUST use "item" as param
  		_renderItem = ({item}) => (
        <TouchableOpacity onPress={() => this._open_detail(item.index)}>
          <View style={styles.item_row}>
            <View>
              <Image style={styles.thumb} source={{uri: Utils.isEmpty(item.img_src)?null:item.img_src}}/>
            </View>
            <View style={styles.text_label}>
              <Text numberOfLines={3} style={common_styles.bold}>{item.title}</Text>
            </View>
          </View>
        </TouchableOpacity>
  		);
      //get latest news
  		_get_data = () => {
  			this.setState({is_getting_data: true, loading_indicator_state: true}, () => {
  				var url = API_URI.SEARCH_ARTICLE + Utils.trim(this.state.keyword) + '&page=' + (this.state.offset / C_Const.PAGE_LEN + 1);
  				// Utils.dlog(url);
  				RequestData.sentGetRequest(url,
  					(list, error) => {
  					if (list != null){
              Utils.dlog(list);
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
                Utils.isEmpty(detail['media_details']['sizes']['full']) || Utils.isEmpty(detail['media_details']['sizes']['full']['source_url']))){
              var size_url = detail['media_details']['sizes']['full']['source_url'];
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
    //when user clicks Search icon in keyboard
    _on_submit_search = (event) => {
      var _keyword = Utils.trim(event.nativeEvent.text);
      if (this.state.is_searching){
        return;
      } else {
        if (_keyword.length < 2){
          Alert.alert(
            'Alert',
            C_Const.TEXT.ERR_SHORT_KEYWORD,
            [
              {text: 'OK'},
            ],
            { cancelable: false }
          );
          this.setState({loading_indicator_state: false, is_searching: false});
        } else {
          //allow to search
          setTimeout(() => {
            this.setState({offset: 0, data_list: [], keyword: _keyword, is_searching: true, loading_indicator_state: true},
              () => this._get_data());
          }, 500);

        }
      }
    };
   //==========
    render() {
      {/* define how to render country list */}

        return (
            <Container padder>
              <Header style={[common_styles.header, common_styles.whiteBg, {flexDirection: 'row', justifyContent: 'center'}]}>
                <SearchBar
                  height={50}
                  ref={'SearchBar'}
                  placeholder={this.state._language_info[C_MULTI_LANG.search]}
                  autoCorrect={false}
                  inputProps={{autoFocus:true}}
                  padding={5}
                  returnKeyType={'search'}
                  inputStyle={styles.search_bar}
                  textStyle={{fontSize: 14}}
                  onSubmitEditing={(event) => this._on_submit_search(event)}
                />
                <Body style={styles.headerBody}>
                </Body>
                <View style={styles.search_cancel}>
                  <Button
                    transparent
                     onPress={() => this.props.navigation.goBack()}
                  >
                    <Text uppercase={false} style={common_styles.default_font_color}>{this.state._language_info[C_MULTI_LANG.cancel]}</Text>
                  </Button>
                </View>
              </Header>
              {/* END header */}
              <Spinner visible={this.state.loading_indicator_state} textStyle={common_styles.whiteColor} />

                {/* fake webview to auto calculate height */}
                <View style={{flex:1}}>
                  <FlatList
                    data={this.state.data_list}
                    renderItem={this._renderItem}
                    refreshing={false}
                    initialNumToRender={20}
                    onEndReachedThreshold={0.5}
                    bounces={false}
                    keyExtractor={this._keyExtractor}
                    onEndReached={({ distanceFromEnd }) => this._load_more()}
                  />
                </View>
            </Container>
        );
    }
}

export default Search;
