import React, {useEffect, useState} from 'react';
import {Avatar, Dropdown, Menu, Pagination, Typography} from "antd";
import {UserOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';
import axios from "axios";

/* Functions ======================================================*/
function handleButtonClick(e) {
    message.info('Click on left button.');
    console.log('click left button', e);
}

function handleMenuClick(e) {
    message.info('Click on menu item.');
    console.log('click', e);
}

/* Antd Title =====================================================*/
const {Title} = Typography;

const CustomerPage = props => {
    /* hook Use State pour modifier la variable et afficherle composant */
    const [customers, setCustomers] = useState([]);
    /* UseEffect /Axios ===============================================*/
    useEffect(() => {
        axios
            .get("http://localhost:8000/api/customers")
            .then(response => response.data['hydra:member'])
            .then(data => setCustomers(data))
            .catch(error => console.log(error.response));
    }, []);
/* Fonction DELETE ===============================================*/
    const handleDelete = id => {
        /*Copie des costumers en cas d'échec */
        const originalCustomers = [...customers];
        //1 L'approche optimiste
        setCustomers(customers.filter(customer => customer.id !== id));
        //2 L'approche pessimiste
        axios
            .delete('http://localhost:8000/api/customers/' + id )
            .then(response => console.log("ok"))
            .catch(error => {
                setCustomers(originalCustomers);
                console.log(error.response);
            });
    };

    // Pagination
    const itemsPerPage = 10;
    const pageCount = Math.ceil(customers.length / itemsPerPage);
    const pages = props =[];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }
    console.log(pages);
    const nbPage = pages.length;



/* RETURN ========================================================*/
    return (
        <>
            <Title>Clients</Title>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th className="adjustAK">Id</th>
                    <th className="iconesAk adjustAKCol2">
                        Avatar
                    </th>
                    <th>Client</th>
                    <th>Email</th>
                    <th>Entreprises</th>
                    <th>Factures</th>
                    <th>Montant total</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {customers.map(customer => (
                    <tr key={customer.id}>
                        <td className="align-middle"> {customer.id} </td>
                        <td className="iconesAk align-middle">
                            <Avatar
                                className="iconesAk align-middle"
                                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                            />
                        </td>
                        <td className="align-middle">{customer.firstName} {customer.lastName}</td>
                        <td className="align-middle">{customer.email}</td>
                        <td className="align-middle">{customer.company}</td>
                        <td className="align-middle">
                            <span className="badge badge-pill badge-primary adjustBadge">{customer.invoices.length}</span>
                        </td>
                        <td className="align-middle site-badge-count-4">
                            {customer.totalAmout.toLocaleString()} €
                        </td>
                        <td>
                            {/*=== DropDown===*/}

                            <Dropdown.Button
                                onClick={handleButtonClick}
                                overlay={
                                    <Menu onClick={handleMenuClick}>
                                        <Menu.Item key="1" icon={<UserOutlined/>}>
                                            Détails
                                        </Menu.Item>
                                        <Menu.Item
                                            key="2"
                                            icon={<UserOutlined/>}>
                                            Modifier
                                        </Menu.Item>
                                        <Menu.Item key="3"
                                                   onClick={ () => handleDelete(customer.id) }
                                                   disabled={customer.invoices.length > 0}
                                                   icon={<UserOutlined/>}>
                                            Supprimer
                                        </Menu.Item>
                                    </Menu>
                                }>
                                Actions
                            </Dropdown.Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {/*PAGINATION PROBLEM*/}
            <Pagination defaultCurrent={1}

            />
        </>
    );
};


export default CustomerPage;





