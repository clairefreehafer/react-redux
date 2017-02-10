import React, { Component } from 'react';
import store from '../store';
import Lyrics from '../components/Lyrics';
import {fetchLyrics} from '../action-creators/lyrics';

export default class LyricsContainer extends Component {
	constructor() {
		super();
		this.state = Object.assign({
			artistQuery: '',
			songQuery: ''
		}, store.getState());

		// Bind functions here
		this.handleArtistInput = this.handleArtistInput.bind(this);
		this.handleSongInput = this.handleSongInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleArtistInput(artist) {
		this.setState({
			artistQuery: artist
		})
	}

	handleSongInput(song) {
		this.setState({
			songQuery: song
		})
	}

	handleSubmit(evt) {
		evt.preventDefault();

		if (this.state.artistQuery && this.state.songQuery) {
			store.dispatch(fetchLyrics(this.state.artistQuery, this.state.songQuery));

			// before redux-thunk:
			// axios.get(`/api/lyrics/${this.state.artistQuery}/${this.state.songQuery}`)
			// .then(res => {
			// 	store.dispatch(setLyrics(res.data.lyric));
			// })
			// .catch(console.error);
		}
	}

	componentDidMount() {
		this.unsubscribe = store.subscribe(() => {
			this.setState(store.getState());
		}
		);
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	render() {
		return(
			<Lyrics
				text={this.state.lyrics.text}
				setArtist={this.handleArtistInput}
				setSong = {this.handleSongInput}
				artistQuery={this.state.artistQuery}
				songQuery={this.state.songQuery}
				handleSubmit={this.handleSubmit}/>
		);
	}
}
