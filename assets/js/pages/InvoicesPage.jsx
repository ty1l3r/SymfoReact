import React, {useEffect, useState} from 'react';
/*import Pagination from "../components/Pagination";*/
import {Dropdown, Menu, Typography} from "antd";
import {UserOutlined} from "@ant-design/icons";
import moment from "moment";
import Pagination from "../components/Pagination";
import invoicesApi from "../service/invoicesAPI";

//Affichage des couleurs 'envoyée, payée, Anulée.
const STATUS_CLASSES = {
    PAID: "success",
    SENT: "primary",
    CANCELLED: "danger"
};
const STATUS_LABELS = {
    PAID: "Payée",
    SENT: "Envoyée",
    CANCELLED: "Annulée"
};

/* Functions ANT =====================================================*/
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

const InvoicesPage = (props) => {

    const [invoices, setInvoices] = useState([]);
    /* Création STATES pour la pagination ===============================*/
    const [currentPage, setCurrentPage] = useState(1);
    /* Search Box */
    const [search, setSearch] = useState("");


    const fetchInvoices = async () => {
        try {
            const data = await invoicesApi.findAll();
            setInvoices(data);
        } catch (error) {
            console.log(error.response);
        }
    };

    useEffect(() => {
            fetchInvoices();
        }, []
    );

    // Gestion du changement de page
    const handlePageChange = page => {
        setCurrentPage(page);
    };

    //Fonction du Search
    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value);
        setCurrentPage(1);
    };

    // FONCTION DELETE =====================================================
    const handleDelete = async id => {
        /*Copie des costumers en cas d'échec */
        const originalInvoices = [...invoices];
        //1 L'approche optimiste
        setInvoices(invoices.filter(invoice => invoice.id !== id));
        try {
            await invoicesApi.delete(id);
        } catch (error) {
            console.log(error.response);
            setInvoices(originalInvoices);
        }
    };

    //Formatage de la date
    const formatDate = (str) => moment(str).format('DD/MM/YYYY');

    //filtrage de la recherche
    const filteredInvoices = invoices.filter(
        i =>
            i.customer.firstName.toLowerCase().includes(search.toLowerCase()) ||
            i.customer.lastName.toLowerCase().includes(search.toLowerCase()) ||
            i.amout.toString().startsWith(search.toLowerCase()) ||
            STATUS_LABELS[i.status].toLowerCase().includes(search.toLowerCase())
    );

    //Pagination
    const itemsPerPage = 10;
    const paginatedInvoices = Pagination.getData(
        filteredInvoices,
        currentPage,
        itemsPerPage
    );

    return (
        <>
            <Title>Clients</Title>
            {/* search */}
            <div className="form-group">
                <input type="text"
                       onChange={handleSearch}
                       value={search}
                       className="form-control"
                       placeholder="rechercher"/>
            </div>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th className="">Numéro</th>
                    <th className="">Client</th>
                    <th>Montant</th>
                    <th className="text-center">Statut</th>
                    <th className="text-center">Montant</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {paginatedInvoices.map(invoice => <tr key={invoice.id}>
                        <td className="align-middle"> {invoice.chrono} </td>
                        <td className="align-middle">{invoice.customer.firstName} {invoice.customer.lastName}
                        </td>
                        <td className="align-middle">{formatDate(invoice.sentAt)}</td>
                        <td className="align-middle text-center">
                           <span className={"badge badge-" + STATUS_CLASSES[invoice.status]}>
                               {STATUS_LABELS[invoice.status]}</span>
                        </td>
                        <td className="align-middle text-center">
                            {invoice.amout.toLocaleString()}
                        </td>
                        <td>
                            {/* === DropDown===*/}
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
                                                   onClick={() => handleDelete(invoice.id)}
                                            /*  disabled={invoice.customer.invoices.length > 0}*/
                                                   icon={<UserOutlined/>}>
                                            Supprimer
                                        </Menu.Item>
                                    </Menu>
                                }>
                                Actions
                            </Dropdown.Button>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>

            <div className="text-center">
                <Pagination currentPage={currentPage}
                            itemsPerPage={itemsPerPage}
                            length={filteredInvoices.length}
                            onPageChanged={handlePageChange}/>
            </div>



        </>
    );
};

export default InvoicesPage;
