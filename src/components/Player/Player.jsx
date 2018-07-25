import React from 'react'
import { Select, MenuItem } from '@material-ui/core'

export default class Player extends React.Component {
    render() {
        return (
            <div>
                <Select value='hai' name="name">
                    <MenuItem value="">
                    <em>None</em>
                    </MenuItem>
                    <MenuItem value="hai">Hai</MenuItem>
                    <MenuItem value="olivier">Olivier</MenuItem>
                    <MenuItem value="kevin">Kevin</MenuItem>
                </Select>
            </div>
        )
    }
}