import React from "react";
import { useEffect,useState } from "react";
import { NavLink } from "react-router-dom";
import Skeleton from "react-loading-skeleton";


const Products = () =>{

    const [data,setData] = useState([]);
    const [filter,setFilter] = useState(data);
    const [loading,setLoading] = useState(false);

    let componentMounted = true;
    let response;

    const getProducts = async () =>{
        setLoading(true);
        fetch("https://dummyjson.com/products").
        then(async (res) => {
        let fetch = await res.json();
        response = fetch.products;
        console.log(response);
        if(componentMounted){
            setData(response);
            setFilter(response);
            setLoading(false);
            console.log(filter);
        }

        });
        
        return () =>{
            componentMounted = false;
        }
    }

    useEffect(()=>{
       getProducts();
    },[]);

    const Loading = () =>{
        return(
          <>
            <div className="col-md-3">
               <Skeleton height={350}/>
            </div>
            <div className="col-md-3">
               <Skeleton height={350}/>
            </div>
            <div className="col-md-3">
               <Skeleton height={350}/>
            </div>
            <div className="col-md-3">
               <Skeleton height={350}/>
            </div>
            <div className="col-md-3">
               <Skeleton height={350}/>
            </div>
            <div className="col-md-3">
               <Skeleton height={350}/>
            </div>
            <div className="col-md-3">
               <Skeleton height={350}/>
            </div>
          </>
        )
    }

    const filterProduct = (cat) =>{
        const updateList = data.filter((x)=>x.category === cat);
        setFilter(updateList);
    }
    const ShowProducts = () =>{
    return(
        <>
        <div className="buttons d-flex justify-content-center mb-5 pb-5">
            <button className="btn btn-outline-dark me-2" onClick={()=>setFilter(data)}>All</button>
            <button className="btn btn-outline-dark me-2" onClick={()=>filterProduct("smartphones")}>SmartPhones</button>
            <button className="btn btn-outline-dark me-2" onClick={()=>filterProduct("laptops")}>Laptops</button>
            <button className="btn btn-outline-dark me-2" onClick={()=>filterProduct("groceries")}>Groceries</button>
            <button className="btn btn-outline-dark me-2" onClick={()=>filterProduct("fragrances")}>Fragrances</button>
            <button className="btn btn-outline-dark me-2" onClick={()=>filterProduct("skincare")}>Skincare</button>
            <button className="btn btn-outline-dark me-2" onClick={()=>filterProduct("home-decoration")}>Home-Decoration</button>
        </div>
        {filter.map((product)=>{
                return(
                    <>
                    <div className="col-md-3 mb-4">
                    <div class="card h-100 text-center p-4" key={product.id}>
                    <img src={product.thumbnail} class="card-img-top" alt={product.title.substring(0,12)} height="250px"></img>
                    <div class="card-body">
                    <h5 class="card-title mb-0">{product.title}...</h5>
                    <p class="card-text lead fw-bold">${product.price}</p>
                    <NavLink to={`/product/${product.id}`} class="btn btn-outline-dark">Buy Now</NavLink>
                    </div>
                    </div>
                    </div>
                    </>
                )
            })
        }
        </>
    )
    }

    return (
        <div>
        <div className="container my-5 py-5">
            <div className="row">
                <div className="col-12 mb-5">
                    <h1 className="display-6 fw-bolder text-center">Latest Products</h1>
                    <hr/>
                </div>
            </div>
            <div className="row justify-content-center">
                 {loading ? <Loading/> : <ShowProducts/>}
            </div>
        </div>
        </div>
    )
}

export default Products;
