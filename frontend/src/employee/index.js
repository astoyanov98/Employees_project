import React, { useState, useContext } from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { ImgContext } from "../contexts/ImgContext";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './styles.css'
import TextField from '@mui/material/TextField';
import { checksImg } from "../helperFunctions";
import Parser from 'html-react-parser';

const Employee = (props) => {
    const [color, setColor] = useState(localStorage.getItem(`${props.id}:color`));
    const [text, setText] = useState(localStorage.getItem(`${props.id}:text`));
    const [imgResized, setImgResized] = useContext(ImgContext);

    const handleChange = (event) => {
        setColor(event.target.value);
        localStorage.setItem(`${props.id}:color`, event.target.value)
    };

    const handleText = (e) => {
        setText(e.target.value)
        localStorage.setItem(`${props.id}:text`, e.target.value)
    }

    return (
        <div className="container" style={{ backgroundColor: localStorage.getItem(`${props.id}:color`) }}>
            <img onClick={() => setImgResized(checksImg(props.avatar))} src={checksImg(props.avatar)} className='myImage' />
            <div>
                <p data-testid="test-title" style={{ fontWeight: '600', fontSize: '20px' }}>{props.title}</p>
                <span>{Parser(props.bio)}</span>
                <p>{props.company}</p>
                <p>{props.name}</p>
                <p>{localStorage.getItem(`${props.id}:text`)}</p>
            </div>
            <div>
                <Box sx={{ minWidth: 70 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Color</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={localStorage.getItem(`${props.id}:color`)}
                            label="Colour"
                            onChange={handleChange}
                        >
                            <MenuItem value={'#9ed0db'}>Something like blue</MenuItem>
                            <MenuItem value={'#db92b8'}>Purple</MenuItem>
                            <MenuItem value={'#97b8e9'}>Blue</MenuItem>
                        </Select>
                        <TextField style={{ marginTop: '12px' }} id="outlined-basic" data-testid="test-input" label="label" variant="outlined" onChange={handleText} value={localStorage.getItem(`${props.id}:text`)} />
                    </FormControl>
                </Box>
            </div>

        </div>
    )
}

export default Employee;