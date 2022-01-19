import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ProductList(){
    //Backend url:
    const url = '/backend/index.php';
    
    //List of checked product sku's:
    const [checkedProducts, setCheckedProducts] = useState([]);

    //List of products:
    const [products, setProducts] = useState([]);

    //Getting the products from the api:
    async function getProducts() {
        try{
            fetch(url, {method: "POST",body: JSON.stringify({method: "get"})}).
                then(res => res.json()).
                    then(data => setProducts(data));
        } catch ( e ){
            console.log(e);
        }
    };

    useEffect(() => {
        getProducts();
    });

    function checkProducts(thisSku){

        let arr = [...checkedProducts];
        let index = 0, found = false;

        //If the given sku is in the list => uncheck sku:
        for(index; index < arr.length && !found; index++)
            if(arr[index] == thisSku){
                arr.splice(index, 1);
                found = true;
            }

        //If the given sku isn't in the list => check sku:
        if(!found)
            arr.push(thisSku);

        setCheckedProducts(arr);
    }

    //Deleting the selected products:
    async function deteleProducts(){
        let arr = [...checkedProducts];

        for(let index = 0; index < arr.length; index++){
            try{
                fetch(url, {method: "POST",body: JSON.stringify({method: "delete", sku: arr[index]})});
            } catch ( e ){
                console.log(e);
            }

            try{
                fetch(url, {method: "POST",body: JSON.stringify({method: "get-single", sku: arr[index]})}).
                    then(res => res.json()).
                        then(data => {if(!data)   arr.splice(index--, 1);});
            } catch ( e ){
                console.log(e);
            }
        }

        setCheckedProducts(arr);
    }

    return(
        <div className='product-list' style={styles.container}>
            {/* Top bar: */}
            <div className='navbar' style={styles.navbar}>
                <h1>Product List</h1>

                <div style={{display: 'flex', alignItems: 'center', marginRight: '3.3%'}}>
                    <Link to="/add-product" style={{marginRight: '20%'}}>
                        <button style={{width: '4vw', fontSize: '1.2vw'}}>ADD</button>
                    </Link>
                        
                    <Link to="/">
                        <button style={{width: '10vw', fontSize: '1.2vw'}} onClick={() => deteleProducts()}>MASS DELETE</button>
                    </Link>
                </div>
            </div>
            <hr />

            <div className='product-list' style={styles.productList}>
                {
                    products.map(product =>(
                        //Product box structure
                        <div key={product.sku} style={styles.productBox}>
                            <input type="checkbox" onClick={() => checkProducts(product.sku)} style={styles.checkbox} />
                            <p>{product.sku}</p>
                            <h2>{product.name}</h2>
                            <p>{product.price} $</p>
                            <p>{product.attributes}</p>
                        </div>
                    ))
                }
            </div>
            

        </div>
    );
}

const styles={
    container:{
        marginLeft: '4%',
        marginRight: '4%'
    },

    navbar:{
        display: 'flex',
        flexDirection: 'row',

        alignItems: 'center',
        justifyContent: 'space-between'
    },

    button:{
        fontSize: '1.2vw',
    },

    productList:{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start'
    },

    productBox:{
        position: 'relative',
        width: '23%',
        border: '0.25vw solid grey',

        margin: '0.7%'
    },

    checkbox:{
        position:'absolute',
        left: '1%',
        top: '1%',
        
        height: '1.2vw',
        width: '1.2vw'
    }
};

export default ProductList;