import React from 'react';
import {Link} from 'react-router-dom';
import AreaId from '../area/areaId';
import CrimeId from '../area/crimeId';

export default () => {
    return(
        <tr className="z-depth-5 floating blue-grey lighten-3">
            <td><Link to="/area/4">HollyWood</Link></td>
            <td><Link to="/crime/8">Robbery</Link></td>
            <td>2019-29-02</td>
        </tr>
    );
}
