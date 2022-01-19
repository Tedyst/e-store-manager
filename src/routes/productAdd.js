import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

function ProductAdd(){
    //Backend url:
    const url = '/backend/index.php';

    //Error message div:
    const [errorMessaje, setErrorMessage] = useState(null);

    //Product template:
    const [product, setProduct] = useState({sku: null, name: null, price: null, size: null, width: null, height: null, length: null, weight: null});
    
    //Type of product:
    const [type, setType] = useState(null);
    
    //Custom inputs:
    const dvdInput = useRef();
    const furnitureInput = useRef();
    const bookInput = useRef();

    //Modify the product after each input change:
    function modifyProduct(field, value){
        setProduct({...product, [field]: value});
    }

    //Manage custom inputs:
    function changeCustomInputs(value){

        dvdInput.current.style.display = "none";
        furnitureInput.current.style.display = "none";
        bookInput.current.style.display = "none";

        if(value == "dvd")              dvdInput.current.style.display = "inline";
        else if(value == "furniture")   furnitureInput.current.style.display = "inline";
        else                            bookInput.current.style.display = "inline";

        setType(value);
    }

    //Validating and saving the product:
    async function saveProduct(){
        let errorText = null;

        let existsSKU = false;

        let res = await fetch(url, {method: "POST",body: JSON.stringify({method: "get-single", sku: product.sku})});
        let data = await res.json();
        if(data[0])    existsSKU = true;

        //Validate SKU:
        if(!product.sku || existsSKU || !(0 < product.sku.length && product.sku.length < 20))   errorText = "SKU must be unique and have more than 0 and less than 20 characters";

        //Validate name:
        else if(!product.name || !(0 < product.name.length && product.name.length < 20)) errorText = "Name must have more than 0 and less than 20 characters";

        //Validate price:
        else if(!product.price || !(0 < product.price && product.price < 100000)) errorText = "Price must be greater than 0 and less than 100000";

        //Validate type:
        else if(!type) errorText = "Select a product type";

        //Validate custom attributes:
        else if(type == "dvd" && (!product.size || !(0 < product.size && product.size < 100000)) ||
                type == "furniture" && (!product.width || !product.width || !product.length || !(0 < product.width && product.width < 100000) || !(0 < product.height && product.height < 100000) || !(0 < product.length && product.length < 100000)) ||
                type == "book" && (!product.weight || !(0 < product.weight && product.weight < 100000)))
                
                errorText = "Attributes of the product must have values greater than 0 and less than 100000";

        //Showing error message:
        if(errorText)   setErrorMessage((<p>{errorText}</p>));

        //Saving the new product and redirecting to main page:
        else{
            let newProduct = {method: "insert", sku: product.sku, name: product.name, price: product.price, attributes: null};

            if(type == "dvd")   newProduct.attributes = product.size + " MB";
            else if(type == "furniture")   newProduct.attributes = product.width + "x" + product.height + "x" + product.length + " CM";
            else    newProduct.attributes = product.weight + " KG";

            await fetch(url, {method: "POST",body: JSON.stringify(newProduct)});

            window.location.href = "/";
        }
    }

    return(
        <div className="product-add" style={styles.container}>
            {/* Top bar: */}
            <div className='navbar' style={styles.navbar}>
                <h1>Product List</h1>

                <div style={{display: 'flex', alignItems: 'center', marginRight: '3.3%'}}>
                    <div style={{marginRight: '20%'}}>
                        <button style={{width: '4vw', fontSize: '1.2vw'}} onClick={() => saveProduct()}>SAVE</button>
                    </div>
                        
                    <Link to="/">
                        <button style={{width: '6vw', fontSize: '1.2vw'}}>CANCEL</button>
                    </Link>
                </div>
            </div>
            <hr />

            {/* Form input: */}
            <div style={{position: "relative", display: "flex", alignItems: "center", justifyContent: "center"}}>
                <form className="product-form" style={styles.form}>

                    {/* SKU input: */}
                    <div style={styles.inputBox}>
                        <h2 style={{width: "10%"}}>SKU</h2>
                        <input type="text" name="sku" onChange={e => modifyProduct(e.target.name, e.target.value)} style={styles.input} />
                    </div>

                    {/* Name input: */}
                    <div style={styles.inputBox}>
                        <h2 style={{width: "10%"}}>Name</h2>
                        <input type="text" name="name" onChange={e => modifyProduct(e.target.name, e.target.value)} style={styles.input} />
                    </div>

                    {/* Price input: */}
                    <div style={styles.inputBox}>
                        <h2 style={{width: "10%"}}>Price($)</h2>
                        <input type="number" min="0" step="0.01" name="price" onChange={e => modifyProduct(e.target.name, e.target.value)} style={styles.input} />
                    </div>

                    {/* Type selector: */}
                    <div style={styles.inputBox}>
                        <h2 style={{width: "10%"}}>Type</h2>
                        <select name="type" defaultValue={"type"} onChange={(e) => changeCustomInputs(e.target.value)}  style={styles.input}>
                                <option value={"type"}>Type</option>
                                <option value={"dvd"} >DVD</option>
                                <option value={"furniture"} >Furniture</option>
                                <option value={"book"} >Book</option>
                        </select>
                    </div>

                    {/* DVD custom input */}
                    <div ref={dvdInput} style={{display: "none"}}>
                        <div style={styles.inputBox}>
                            <h2 style={{width: "10%"}}>Size(MB)</h2>
                            <input type="number" min="0" step="0.001" name="size" onChange={e => modifyProduct(e.target.name, e.target.value)} style={styles.input} />
                        </div>
                    </div>

                    {/* Furniture custom input */}
                    <div ref={furnitureInput} style={{display: "none"}}>
                        <div style={styles.inputBox}>
                            <h2 style={{width: "10%"}}>Height(CM)</h2>
                            <input type="number" min="0" step="0.001" name="height" onChange={e => modifyProduct(e.target.name, e.target.value)} style={styles.input} />
                        </div>
                        <div style={styles.inputBox}>
                            <h2 style={{width: "10%"}}>Width(CM)</h2>
                            <input type="number" min="0" step="0.001" name="width" onChange={e => modifyProduct(e.target.name, e.target.value)} style={styles.input} />
                        </div>
                        <div style={styles.inputBox}>
                            <h2 style={{width: "10%"}}>Length(CM)</h2>
                            <input type="number" min="0" step="0.001" name="length" onChange={e => modifyProduct(e.target.name, e.target.value)} style={styles.input} />
                        </div>
                    </div>

                    {/* Book custom input */}
                    <div ref={bookInput} style={{display: "none"}}>
                        <div style={styles.inputBox}>
                            <h2 style={{width: "10%"}}>Weight(KG)</h2>
                            <input type="number" min="0" step="0.001" name="weight" onChange={e => modifyProduct(e.target.name, e.target.value)} style={styles.input} />
                        </div>
                    </div>
                </form>

                {/* Error message: */}
                <div style={styles.errorDiv}>{errorMessaje}</div>
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
    form:{ 
        width:"100%",
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "flex-start"
    },
    inputBox:{
        display: "flex",
        flexDirection: "row",

        alignItems: "center",
        marginTop: "1%"
    },
    input:{
        paddingTop: "0.5%",
        paddingBottom: "0.5%",

        width: "10%",
    
        fontSize: "1vw"
    },
    errorDiv:{
        position: "absolute",
        backgroundColor: "#f6dcdd",
        color: "red",
        paddingLeft: "1%",
        paddingRight: "1%"
    }
};

export default ProductAdd;