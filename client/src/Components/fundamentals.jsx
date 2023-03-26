import React, { Component } from 'react';

class Fundamentals extends Component {
    state = { 

    }

    render() { 
        return (          
            <div class="container" style={{ marginTop: '25px' }}>
                <div class="row">
                    <div class="col">
                        <table class="table">
                            <tbody>
                                <tr>
                                    <td>
                                        Previous Close
                                    </td>
                                    <th>
                                        {this.props.data.previous_close}
                                    </th>
                                </tr>
                                <tr>
                                    <td>
                                        Open
                                    </td>
                                    <th>
                                        {this.props.data.open}
                                    </th>
                                </tr>
                                <tr>
                                    <td>
                                        Low
                                    </td>
                                    <th>
                                        {this.props.data.low}
                                    </th>
                                </tr>
                                <tr>
                                    <td>
                                        High
                                    </td>
                                    <th>
                                        {this.props.data.high}
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="col">
                    <table class="table">
                            <tbody>
                                <tr>
                                    <td>
                                        Volume
                                    </td>
                                    <th>
                                        {this.props.data.volume}
                                    </th>
                                </tr>
                                <tr>
                                    <td>
                                        Average Volume
                                    </td>
                                    <th>
                                        {this.props.data.average_volume}
                                    </th>
                                </tr>
                                <tr>
                                    <td>
                                        Change
                                    </td>
                                    <th>
                                        {this.props.data.change}
                                    </th>
                                </tr>
                                <tr>
                                    <td>
                                        Percent Change
                                    </td>
                                    <th>
                                        {this.props.data.percent_change}%
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Fundamentals;