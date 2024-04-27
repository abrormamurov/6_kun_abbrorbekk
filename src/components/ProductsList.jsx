import { Link } from "react-router-dom";

function ProductsList({ data }) {
  return (
    <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 mb:grid-cols-2 maw-w-5xl mx-auto px-8">
      {data &&
        data.products.map((texnika) => {
          console.log(texnika);
          return (
            <li className="card  bg-base-100 shadow-xl " key={texnika.id}>
              {
                <>
                  <figure>
                    <img
                      src={texnika.thumbnail}
                      alt="Shoes"
                      className=" w-full h-52 object-cover"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      {texnika.title}
                      {/* <div className="badge badge-secondary">NEW</div> */}
                    </h2>
                    <p className=" line-clamp-3">{texnika.description}</p>
                    <ul className="card-actions justify-between">
                      <li className="badge badge-outline  text-black  bg-green-500 p-5">
                        Price: {texnika.price}$
                      </li>
                      <li className="badge  bg-blue-700  text-black badge-outline p-5">
                        Rating:{texnika.rating}
                      </li>
                      <li className="badge  bg-secondary  text-black badge-outline p-5">
                        Stock:{texnika.stock}
                      </li>
                      <li className="badge  bg-accent text-black badge-outline p-5">
                        Discount interest: {texnika.discountPercentage}
                      </li>
                      <li className="badge   bg-accent text-black badge-outline p-5">
                        Id: {texnika.id}
                      </li>
                    </ul>
                    <Link
                      to={`/product/${texnika.id}`}
                      className="btn  bg-orange-600 mt-5"
                    >
                      Purchase
                    </Link>
                  </div>
                </>
              }
            </li>
          );
        })}
    </ul>
  );
}

export default ProductsList;
