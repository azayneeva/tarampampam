import React from 'react';
import {Menu} from 'semantic-ui-react';
import {Link} from '../routes';

export default () => {
    return (
        <Menu style={{marginTop: '10px'}}>
            <Menu.Menu position='right'>
                <Link route='/'>
                    <a className='item'>Projects</a>
                </Link>
                <Link route='/projects/new'>
                    <a className='item'>Create a new project</a>
                </Link>
            </Menu.Menu>
        </Menu>
    )
};