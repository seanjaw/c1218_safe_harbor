import React, {Component} from 'react';
import axios from 'axios';

class Map extends Component{
    async componentDidMount(){

        // const resp = await axios.get('/api/test');

        // console.log('Resp:', resp);

        // const postResp = await axios.post('/api/test', {
        //     message: 'this is a test',
        //     name: 'Bob Dole',
        //     food: ['pizza', 'chips', 'beer', 'cigars']
        // });
        // console.log('PostResp:', postResp);
    }
    render(){
        return(
            <h1>This is the map</h1>
        )
    }
}

export default Map;