/**
 * author: Martin SD
 * API URI
 */
import {setting} from './config.js';

export const API_URI = {
		DEFAULT_REQUEST_HEADER: {   //header of request sending to server
				'Cache-Control': 'no-cache, no-store, must-revalidate',
				'Pragma': 'no-cache',
				'Expires': 0,
				'Accept': 'application/json',
				'Content-Type': 'application/json; charset=utf-8'
		},
		MULTIPART_REQUEST_HEADER: {
				'Content-Type': 'multipart/form-data'
		},
		//Splash
		//News
		GET_NEWS_LIST: setting.NEWS_IP + 'posts?per_page=20',
		SEARCH_ARTICLE: setting.NEWS_IP + 'posts?per_page=20&keyword=',
		GET_MEDIA_LIST: 'media',

};
