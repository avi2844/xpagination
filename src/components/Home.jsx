import { useState, useEffect } from "react"
import axios from "axios";
import Pagination from "./Pagination";
import "./Home.css";


function Home(){
    const [tableData, setTableData] = useState([]);
    const [currentData, setCurrentData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const maxRecords =  10;
    const [totalPages, setTotalPages] = useState(0);

    async function fetchData(){
        try {
            const res = await axios.get("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");

            setTableData(res.data);
        } catch (error) {
            alert('failed to fetch data');
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const startIndex = (currentPage - 1) * maxRecords
        const endIndex = Math.min(currentPage * maxRecords, tableData.length)

        setCurrentData([...tableData].slice(startIndex, endIndex))
        setTotalPages(Math.ceil(tableData.length/maxRecords))
    }, [currentPage, tableData])

    return(
        <div style={{display : 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            <h1>Employee Data Table</h1>
            <div style={{padding : '20px', width: '100%'}}>   
            <table style={{width: '100%', padding: '20px'}}>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                </tr>
                {
                    currentData.map(ele => (
                        <tbody>
                            <tr key={ele.id}>
                            <td>{ele.id}</td>
                            <td>{ele.name}</td>
                            <td>{ele.email}</td>
                            <td>{ele.role}</td>
                        </tr>
                        </tbody>
                    ))
                }
            </table>
            </div>
            <Pagination updatePage={setCurrentPage} currentPage={currentPage} totalPages={totalPages}/>
        </div>
        
    )
}

export default Home;