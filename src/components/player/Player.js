import { Howl } from "howler";
import "babel-polyfill";
import "raf";

/**
 * @link https://davidwalsh.name/javascript-debounce-function
 * Inspired by underscore.js implementation
 * ----------------------------------------------------------------
 * Delay a certain function from executing for [delay] milliseconds
 * @param  {Function} func
 * @param  {Integer}   wait milliseconds
 * @return {Function} 
 */
const debounce = function(func, wait, immediate) {
	let timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}

/**
 * The Player module. This uses Howler.js #2.0.0 under the hood. Pass it in a songObj array;
 * Each object in the songObj array bust contact (at the least):
 * 	- id
 * 	- howl (initially set to null. This is where we'll cache the different Howl Objects)
 * 	- path (where audio file is located
 * The timeUpdateCallback will be called using requestAnimationFrame everytime theres a playing Howl Object.
 * This callback must accept the Player Object so you can use it to make DOM updates (seek info) and the like.
 * Make sure you include requestAnimationFrame and Array.prototype.findIndex polyfills for legacy browsers
 * @param {array} songObjs
 * @param {Function} timeUpdateCallback
 */
class Player {
	constructor(initialSong, timeUpdateCallback, onEndCallback) {
		this.timeUpdateCallback = timeUpdateCallback;
		this.onEndCallback = onEndCallback;
		this.howl = this._initHowl(initialSong);
		this.vol = 1; //global volume
	}

	_initHowl(songObj) {
		var self = this;
		var path = songObj.song.label;
		var path2 = path.substr(0, path.indexOf(".")) + ".ogg"; //for browsers which don't support .mp3

		return new Howl({
			src: [path, path2],
			volume: self.vol,
			onplay: () => {
				this.timeUpdate();
			},
			onend: () => {
				this.onEndCallback();
			}
		});
	}

	unloadHowl() {
		this.stop();
		this.howl.unload();
	}

	/**
	 * Play audio clip. Argument can be the path of the clip
	 * @param  {String} path
	 */
	play(path=null) {
		if (this.playing())
			this.pause();

		if (path != null) {
			this.howl = new Howl({
				src: path,
				autoplay: true,
				onplay: () => {
					this.timeUpdate();
				},
				onend: () => {
					this.onEndCallback();
				}
			});
		} else
			this.howl.play();
	}

	playing() {
		if (this.howl !== null)
			return this.howl.playing();
		else
			return false;
	}

	stop() {
		if (this.howl !== null && this.howl.playing())
			this.howl.stop();
	}

	pause() {
		if (this.howl !== null && this.howl.playing())
			this.howl.pause();
	}

	/**
	 * Called each time the audio file is playing
	 */
	timeUpdate() {
		this.timeUpdateCallback();

		if (this.howl.playing()) {
			var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
			requestAnimationFrame(debounce(this.timeUpdate.bind(this), 1000));
		}
	}

	/**
	 * Formats time from secs (integer) to 00:00 notation
	 *@param  {Integer} secs
	 * @return {String} 
	 */
	formatTime(secs) {
		var mins = Math.floor(secs / 60),
		secs = Math.floor(secs - (mins * 60));

		return ((mins < 10) ? '0'+mins : mins) + ":" + ((secs < 10) ? '0'+secs : secs);
	}

	/**
	 * Current playback time. If no argument passed it simply returns seek position. If setting a seek position
	 * pass an argument signalling where you want to seek to (seconds). If howl object hasn't loaded function
	 * waits till it is loaded before changing seek position
	 */
	currentTime(time=null) {
		var self = this;

		if (time == null) {
			const t = self.howl.seek();
			return (typeof t === "number") ? t : 0;
		} else {
			 time = arguments[0];
			if (self.howl.state() !== "loaded") {
				self.howl.once('load', function(){
					self.howl.seek(time);
				});
			} else {
				self.howl.seek(time);
				return time;
			}
		}
	}

	/**
	 * Returns duration of the howl audio clip
	 * Can pass a id argument for sprite identification
	 */
	duration() {
		if (arguments.length === 1)
			return this.howl.duration(arguments[0]);
		else
			return this.howl.duration();
	}

	/**
	 * Set volume levels
	 */
	volume(vol) {
		this.howl.volume(vol);
	}
}

export default Player;