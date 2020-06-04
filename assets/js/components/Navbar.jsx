import React from 'react';
import {Button, NewPersonIcon, OfflineIcon, Tooltip, UserIcon} from 'evergreen-ui'


const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="#">Disk List</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02"
                    aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"/>
            </button>

            <div className="collapse navbar-collapse" id="navbarColor02">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="#">Client</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Factures</a>
                    </li>
                </ul>
                <ul className="navbar-nav mr-2">
                    <li className="nav-item mr-2">
                        <a href="">
                            <Tooltip content="Déconnexion">
                                <Button appearance="primary">
                                    <OfflineIcon size={20}/>
                                </Button>
                            </Tooltip>
                        </a>
                    </li>
                    <li className="nav-item mr-2">
                        <a href="">
                            <Tooltip content="Connexion">
                                <Button appearance="primary">
                                    <NewPersonIcon size={20}/>
                                </Button>
                            </Tooltip>
                        </a>
                    </li>
                    <li className="nav-item mr-auto">
                        <a href="#">
                            <Tooltip content="Inscription">
                                <Button appearance="primary">
                                    <UserIcon size={20}/>
                                </Button>
                            </Tooltip>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;




