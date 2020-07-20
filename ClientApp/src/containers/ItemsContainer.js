import React, { useState } from 'react'

import { Container, Row, Col } from 'react-bootstrap'
import ItemsList from '../components/ItemsList/ItemsList'
import  initialState  from  '../redux/initalStateForm';

import 'bootstrap/dist/css/bootstrap.css'

import AddItemForm from '../components/AddItemForm/AddItemForm'
const ItemsContainer = () => {
    const [dataForm, setDataForm] = useState({...initialState});
    const selectedRow = (data) => {
        console.log('Data in main ', data);
        let dataForAddForm={
            ...initialState,
            itemData:data
        };
         setDataForm(dataForAddForm);
    }
    return (
        <>
            <Container>
                <Row>
                <Col xs={8} md={8}>
                        <ItemsList selectedRow={selectedRow} />
                    </Col>
                    <Col xs={4} md={4}>
                        {dataForm != null && <AddItemForm currentData={dataForm} />}

                    </Col>
                     
                </Row>
            </Container>
        </>
    )
}
export default ItemsContainer
