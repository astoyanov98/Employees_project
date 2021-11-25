import React, { useEffect, useState, useContext } from 'react'
import Employee from '../employee'
import { DataContext } from "../contexts/DataContext";
import { ImgContext } from "../contexts/ImgContext";
import './styles.css'
import axios from 'axios'
import TextField from '@mui/material/TextField';
import ReactPaginate from "react-paginate"
import Button from '@mui/material/Button';

const Employees = () => {
    const [pageNumber, setPageNumber] = useState(0);
    const [employees, setEmployees] = useContext(DataContext)
    const [search, setSearch] = useState('')
    const [imgResized, setImgResized] = useContext(ImgContext)

    const token = Buffer.from(`medium:medium`, 'utf8').toString('base64')

    useEffect(() => {
        if (!localStorage.getItem('state')) {
            axios.get('https://hiring.rewardgateway.net/list', {
                headers: {
                    'Authorization': `Basic ${token}`,
                    'Access-Control-Allow-Origin': '*',
                }
            })
                .then((res) => {
                    setEmployees(res.data)
                    localStorage.setItem('state', JSON.stringify(res.data))


                })
                .catch((error) => {
                    console.error(error)
                })
        } else {
            setEmployees(JSON.parse(localStorage.getItem('state')))
        }

    }, [])

    const userPerPage = 20;
    let pagesVisited = pageNumber * userPerPage;
    const pageCount = Math.ceil(employees.length / userPerPage);

    const handleClick = () => {
        if (search) {
            let labeledEmployees = [];
            for (let [key, value] of Object.entries(localStorage)) {
                if (key.includes('text') && value.includes(search)) {
                    labeledEmployees.push(key.split(':')[0])
                }
            }

            setEmployees(employees.filter(x => labeledEmployees.find(el => el.includes(x.uuid))))
        } else {
            setEmployees(JSON.parse(localStorage.getItem('state')))
        }

    }

    const displayEmployees = employees.slice(pagesVisited, pagesVisited + userPerPage).map((res) => (
        < Employee id={res.uuid} bio={res.bio} avatar={res.avatar} company={res.company} name={res.name} title={res.title} />
    ))

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }

    return (
        <>
            {imgResized ? <img src={imgResized} className="resizedImg" /> : <>
                <div style={{ marginTop: '12px' }}>
                    <TextField id="outlined-basic" label="Search" variant="outlined" onChange={handleSearch} value={search} />
                    <Button className="button" data-testid="button" onClick={handleClick} variant="contained">Search</Button></div>
                <div>
                    {displayEmployees}
                    <ReactPaginate
                        previousLabel={"Prev"}
                        nextLabel={"Next"}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName={"paginationBttns"}
                        previousLinkClassName={"previousBttn"}
                        nextLinkClassName={"netBttn"}
                        activeClassName={"paginationActive"}
                    />
                </div></>}
        </>
    )
}

export default Employees;