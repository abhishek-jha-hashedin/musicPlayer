import React from "react";
import MusicPlayer from 'react-responsive-music-player'


class App extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.playlist)
        this.state = { link: '' }
    }
    componentDidMount() {
        fetch('http://mosaic.nativebyte.in/api/music/' + this.props.playlist + '/content/resolve', {
            method: 'get',
            headers: new Headers({
                'Authorization': localStorage.getItem('jwtToken'),
            })
        })
            .then(response => response.json())
            .then(resp => {
                this.setState({
                    link: resp['data']
                })
            })
    }
    render() {
        const playlist = [
            {
                url: this.state.link,
                cover: 'http://res.cloudinary.com/alick/image/upload/v1502444306/Bridge_of_Fate_o36rem.jpg',
                title: this.props.name,
                artist: [
                    'Luis Fonsi',
                    'Daddy Yankee'
                ]
            },
            {
                url: 'https://mosaic-nativebyte-in.s3.ap-south-1.amazonaws.com/music/Lukka%20Chuppi%20-%20Unplugged%20-%20Darshan%20Raval%20320Kbps.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIEJOLVITN7HILT5A%2F20180602%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20180602T175616Z&X-Amz-Expires=3600&X-Amz-Signature=ad860b16005cfdbab96ad3cced3221beced9bf4b6ffb60dfed94e3b8c98b8288&X-Amz-SignedHeaders=host',
                cover: 'http://res.cloudinary.com/alick/image/upload/v1502689731/Despacito_uvolhp.jpg',
                title: 'Despacito',
                artist: [
                    'Luis Fonsi',
                    'Daddy Yankee'
                ]
            },
            {
                url: 'http://res.cloudinary.com/alick/video/upload/v1502375674/Bedtime_Stories.mp3',
                cover: 'http://res.cloudinary.com/alick/image/upload/v1502375978/bedtime_stories_bywggz.jpg',
                title: 'Bedtime Stories',
                artist: [
                    'Jay Chou'
                ]
            },
            {
                url: 'http://res.cloudinary.com/alick/video/upload/v1502444212/Actor_ud8ccw.mp3',
                cover: 'http://res.cloudinary.com/alick/image/upload/v1502444304/actor_umzdur.jpg',
                title: '演员',
                artist: [
                    '薛之谦'
                ]
            },
            {
                url: 'http://res.cloudinary.com/alick/video/upload/v1502444215/Bridge_of_Fate_aaksg1.mp3',
                cover: 'http://res.cloudinary.com/alick/image/upload/v1502444306/Bridge_of_Fate_o36rem.jpg',
                title: 'Bridge of Fate',
                artist: [
                    '王力宏',
                    '谭维维'
                ]
            }
        ]
        return (
            <div>
                {console.log(playlist.url)}
                {playlist.url !== '' && <MusicPlayer playlist={playlist} playnext = {this.props.playnext}/>}

            </div>
        )
    }
}
class Playlistname extends React.Component {
    render() {
        return <li>{this.props.name}</li>
    }
}
class Playlist extends React.Component {
    render() {
        return (
            <ul>
                {this.props.playlist.map((playlist, index) => {
                    return <Playlistname key={index} name={playlist.name} />
                })}
            </ul>
        )

    }
}

class PlayerPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            playlist: [],
            activeSong: {},
            player: null,
            currTime: "00:00",
            currSecs: 0,
            currDur: 0,
            playing: false,
            volume: true,
            showPlaylist: false
        };
        
    }

    componentDidMount() {
        fetch("http://mosaic.nativebyte.in/api/playlist/list?status=all", {
            method: 'get',
            headers: new Headers({
                'Authorization': localStorage.getItem('jwtToken'),
            })
        })
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData['data'])
                this.setState({
                    playlist: responseData['data']
                })


            });
    }
    hhggg(){
       console.log("end")
    }
    render() {
        return (
            <div>
                <h1>{'This will always render'}</h1>
                {
                    this.state.playlist.length > 0 &&
                    <App playlist={this.state.playlist[1]['songs'][2]} name={this.state.playlist[1].name} playnext = {this.hhggg.bind(this)} />

                }
                {
                    this.state.playlist.length > 0 && <Playlist playlist={this.state.playlist} />
                }
            </div>
        );
    }
}

export default PlayerPage