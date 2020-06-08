import React, {useEffect, useState} from 'react';
import {Avatar, Dropdown, Menu, Typography} from "antd";
import {UserOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';
import Pagination from "../components/Pagination";
import CustomersAPI from "../service/customersAPI"

/* Functions ==========================================================*/
function handleButtonClick(e) {
    message.info('Click on left button.');
    console.log('click left button', e);
}

function handleMenuClick(e) {
    message.info('Click on menu item.');
    console.log('click', e);
}

/* Antd Title =========================================================*/
const {Title} = Typography;

const CustomerPage = props => {
    /* hook Use State pour modifier la variable et afficherle composant */
    const [customers, setCustomers] = useState([]);
    /* Création STATES pour la pagination ===============================*/
    const [currentPage, setCurrentPage] = useState(1);
    /* Search Box */
    const [search, setSearch] = useState("");

// Permet d'aller récupérer les customers
    const fetchCustomers = async () => {
        try {
            const data = await CustomersAPI.findAll()
            setCustomers(data);
        } catch (error) {
            console.log(error.response);
        }
    }

// Au chargement du composant on va chercher les composants.
    useEffect(() => {
        fetchCustomers();
    }, []);

// FONCTION DELETE =====================================================
    const handleDelete = async id => {
        /*Copie des costumers en cas d'échec */
        const originalCustomers = [...customers];
        //1 L'approche optimiste
        setCustomers(customers.filter(customer => customer.id !== id));
        try {
            await CustomersAPI.delete(id)
        } catch (error) {
            setCustomers(originalCustomers);
        }
    };

// Gestion du changement de page
    const handlePageChange = page => {setCurrentPage(page);};

//Fonction du Search
    const handleSearch = ({ currentTarget}) => {
        setSearch(currentTargetvalue);
        setCurrentPage(1);
    }

//filtrage de la recherche
    const filteredCustomers = customers.filter(
        c =>
            c.firstName.toLowerCase().includes(search.toLowerCase()) ||
            c.lastName.toLowerCase().includes(search.toLowerCase()) ||
            c.email.toLowerCase().includes(search.toLowerCase()) ||
            (c.company && c.company.toLowerCase().includes(search.toLowerCase()))
    );

// Récupération de la Pagination
    const itemsPerPage = 10;
    const paginatedCustomers = Pagination.getData(
        filteredCustomers,
        currentPage,
        itemsPerPage
    );


/* RETURN ========================================================*/
    return (
        <>
            <Title>Clients</Title>
            {/* search */}
            <div className="form-group">
                <input type="text" onChange={handleSearch} value={search} className="form-control"
                       placeholder="rechercher"/>
            </div>
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
                {paginatedCustomers.map(customer => (
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
                            <span
                                className="badge badge-pill badge-primary adjustBadge">{customer.invoices.length}</span>
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
                                                   onClick={() => handleDelete(customer.id)}
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
            {/*Pagination*/}

            {/*Si il y a moins de 10 user pas d'affichage de page */}
            {itemsPerPage < filteredCustomers.length && (
                <Pagination currentPage={currentPage}
                            itemsPerPage={itemsPerPage}
                            length={filteredCustomers.length}
                            onPageChanged={handlePageChange}/>)
            }
        </>
    );
};

export default CustomerPage;





