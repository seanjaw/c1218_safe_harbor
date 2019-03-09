import React, {Component} from 'react';
import FilteredCrimeAPI from './filteredcrimeAPI';

class FilteredCrime extends Component {
    render(){
        return(
            <div className="container col xs12">
                <FilteredCrimeAPI/>
            </div>
        )
    }
}


export default FilteredCrime;
