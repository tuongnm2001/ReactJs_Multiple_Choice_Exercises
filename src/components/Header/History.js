import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { getHistory } from '../../services/apiService';

const History = () => {

    const [dataHistory, setDataHistory] = useState('')
    var moment = require('moment');

    useEffect(() => {
        getAllHistory()
    }, [])

    const getAllHistory = async () => {
        const res = await getHistory();
        if (res && res.EC === 0) {
            let newData = res.DT.data.map(item => {
                return {
                    total_correct: item.total_correct,
                    total_question: item.total_question,
                    name: item.quizHistory.name,
                    id: item.id,
                    date: moment(item.createdAt).utc().format('DD/MM/YYY hh:mm:ss A')
                }
            })

            if (newData.length > 7) {
                newData = newData.slice(newData.length - 7, newData.length)
            }
            setDataHistory(newData)
        }
    }
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Quiz Name</th>
                    <th>Total Question</th>
                    <th>Total Correct</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {
                    dataHistory && dataHistory.length > 0 ?
                        dataHistory.map((item, index) => {
                            return (
                                <tr key={`table-user-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.total_correct}</td>
                                    <td>{item.total_question}</td>
                                    <td>{item.date}</td>
                                </tr>
                            )
                        })
                        :
                        <tr>
                            <td colSpan={5} style={{ textAlign: "center" }}>Not Found Data</td>
                        </tr>
                }
            </tbody>
        </Table>
    );
}

export default History;