import React from 'react';
import SideBar from '../layout/SideBar';
import Header from '../layout/Header';
import GisBreadcrumb from '../controls/GisBreadcrumb';
import AuthWrap from '../authentication/AuthWrap';
import Footer from '../layout/Footer';
import { routes, routesOverflow } from '../../routes/router';
import * as common from '../../utilities/common';
import { Route, Switch } from 'react-router-dom';

const Layout = (props) => {
    var links = [];
    common.buildPageRoute(routes[0].links, links);
    common.buildPageRoute(routesOverflow[0].links, links);
    return (
        <div className="ms-Grid no-padding" dir="ltr">
            <div className='wrapper'>
                <Header {...props} />
                <div className='main-wrapper'>
                    <Switch>
                        {links.map(route => {
                            return (
                                <Route key={route.name}
                                    path={route.url}
                                    exact={route.exact}
                                    render={props => (
                                        <AuthWrap>
                                            <route.component {...props} />
                                        </AuthWrap>
                                    )}
                                />)
                        })
                        }
                    </Switch>
                    {/* <div className='box-nav'>
                    </div>
                    <div className='box-main'>

                        <div className='box-content'>
                            <div className='content-main'>

                            </div>

                        </div>
                    </div> */}
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default Layout;