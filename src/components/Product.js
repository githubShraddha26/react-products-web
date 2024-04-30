import React,{useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const Product = () =>{

    const {id} = useParams();
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);


    const getProduct = async () =>{
       setLoading(true);
       fetch(`https://dummyjson.com/products/${id}`)
      .then(async(res)=>{
        let fetchProduct = await res.json();
        setProduct(fetchProduct)
        setLoading(false);
        console.log(fetchProduct);
      })
    }

    useEffect(()=>{
      getProduct();
    },[]);

    const Loading = () =>{
     return(
        <>
        <div className="col-md-6">
          <Skeleton height={400}></Skeleton>
        </div>
        <div className="col-md-6" style={{lineHeight:2}}>
          <Skeleton height={50} width={300}></Skeleton>
          <Skeleton height={75} ></Skeleton>
          <Skeleton height={25} width={150}></Skeleton>
          <Skeleton height={50} ></Skeleton>
          <Skeleton height={150} ></Skeleton>
          <Skeleton height={50} width={100}></Skeleton>
          <Skeleton height={50} width={100} style={{marginLeft:6}}></Skeleton>
        </div>
        </>
     )
    }

    const ShowProduct = () =>{
        return(
            <>
            <div className="col-md-6">
                <img src={product.thumbnail} alt={product.title} height="400px" width="400px"/>
            </div>
            <div className="col-md-6">
            <h4 className="text-uppercase text-black-50">
                  {product.category}
            </h4>
            <h1 className="display-5">{product.title}</h1>
            <p className="lead fw-bolder">
              Rating {product.rating}
              <i className="fa-fa-star"></i>
            </p>
            <h3 className="display-6 fw-bold my-4">
               ${product.price}
            </h3>
            <p className="lead">
              {product.description}
            </p>
            <button className="btn btn-outline-dark px-4 py-2"> Add to Cart</button>
            <button className="btn btn-outline-dark s-2 px-3 py-2"> Go to Cart</button>
            </div>
            </>
        )
    }

    return(
        <div>
          <div className="container py-5">
            <div className="row py-4">
                {loading ? <Loading/> : <ShowProduct/>}
            </div>
          </div>
        </div>

    );
}

export default Product;
