import React from 'react';

function Footer(){

    return(
        <div className='footer' style={styles.container}>
            <hr />
            <p>Scandiweb Test assignment</p>
        </div>
    );
}

const styles = {
    container: {
        marginLeft: '4%',
        marginRight: '4%'
    }
};

export default Footer;