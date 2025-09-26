import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./ProductList.css";
import CartItem from "./CartItem";
import { addItem } from "./CartSlice";
function ProductList({ onHomeClick }) {
    const [showCart, setShowCart] = useState(false);
    const [showPlants, setShowPlants] = useState(false); // State to control the visibility of the About Us page
    const [addedToCart, setAddedToCart] = useState({});

    const dispatch = useDispatch();
    // Get cart items from Redux
    const cartItems = useSelector((state) => state.cart.items);
    // Calculate total quantity in cart
    const cartCount = cartItems.reduce(
        (sum, item) => sum + (item.quantity || 0),
        0
    );

    const plantsArray = [
        {
            category: "Hoa Cưới",
            plants: [
                {
                    name: "Bó Hoa Cưới 050",
                    image: "https://storage.googleapis.com/cdn_dlhf_vn/public/products/AWDL/AWDLB050/1730800360_6729eae882483.jpg",
                    description:
                        "Produces oxygen at night, improving air quality.",
                    cost: "$15",
                },
                {
                    name: "Bó Hoa Cưới 049",
                    image: "https://storage.googleapis.com/cdn_dlhf_vn/public/products/AWDL/AWDLB049/1731040409_672d94991b1da.jpg",
                    description:
                        "Filters formaldehyde and xylene from the air.",
                    cost: "$12",
                },
                {
                    name: "Bó Hoa Cưới 046",
                    image: "https://storage.googleapis.com/cdn_dlhf_vn/public/products/AWDL/AWDLB046/1731403275_67331e0b04950.jpg",
                    description: "Removes mold spores and purifies the air.",
                    cost: "$18",
                },
                {
                    name: "Bó Hoa Cưới 045",
                    image: "https://storage.googleapis.com/cdn_dlhf_vn/public/products/AWDA/AWDAB045/1730791605_6729c8b5e475b.jpg",
                    description: "Adds humidity to the air and removes toxins.",
                    cost: "$20",
                },
                {
                    name: "Bó Hoa Cưới 044",
                    image: "https://storage.googleapis.com/cdn_dlhf_vn/public/products/AWDA/AWDAB043/1730799612_6729e7fc18cbb.jpg",
                    description:
                        "Easy to care for and effective at removing toxins.",
                    cost: "$17",
                },
                {
                    name: "Bó Hoa Cưới 043",
                    image: "https://storage.googleapis.com/cdn_dlhf_vn/public/products/AWDA/AWDAB042/1730799533_6729e7ad8bda3.jpg",
                    description:
                        "Purifies the air and has healing properties for skin.",
                    cost: "$14",
                },
            ],
        },
        {
            category: "Lan Hồ Điệp",
            plants: [
                {
                    name: "Lan Hồ Điệp Thành Ý 077",
                    image: "https://storage.googleapis.com/cdn_dlhf_vn/public/products/ODDD/ODDDHC077/IMG_8244.jpg",
                    description: "Calming scent, used in aromatherapy.",
                    cost: "$20",
                },
                {
                    name: "Lan Hồ Điệp Viên Mãn 076",
                    image: "https://storage.googleapis.com/cdn_dlhf_vn/public/products/ODDD/ODDDHC076/IMG_8193.png",
                    description: "Sweet fragrance, promotes relaxation.",
                    cost: "$18",
                },
                {
                    name: "Lan Hồ Điệp Hưng Thịnh 063",
                    image: "https://storage.googleapis.com/cdn_dlhf_vn/public/products/ODD1/ODD15HC063/IMG_8221_800x800.png",
                    description: "Invigorating scent, often used in cooking.",
                    cost: "$15",
                },
                {
                    name: "Lan Hồ Điệp Viên Mãn 006",
                    image: "https://storage.googleapis.com/cdn_dlhf_vn/public/products/OVC0/OVC07LR006/AA0_7917lw.jpg",
                    description: "Refreshing aroma, used in teas and cooking.",
                    cost: "$12",
                },
                {
                    name: "Lan Hồ Điệp Hồng Phát 125",
                    image: "https://storage.googleapis.com/cdn_dlhf_vn/public/products/ODDD/ODDDHC125/1727768336_66fba710be320.jpg",
                    description:
                        "Citrusy scent, relieves stress and promotes sleep.",
                    cost: "$14",
                },
                {
                    name: "Lan Hồ Điệp Hưng Thịnh 124",
                    image: "https://storage.googleapis.com/cdn_dlhf_vn/public/products/ODDD/ODDDHC117/1727764987_66fb99fbed76c.jpg",
                    description:
                        "Hyacinth is a beautiful flowering plant known for its fragrant.",
                    cost: "$22",
                },
            ],
        },
        {
            category: "Insect Repellent Plants",
            plants: [
                {
                    name: "oregano",
                    image: "https://cdn.pixabay.com/photo/2015/05/30/21/20/oregano-790702_1280.jpg",
                    description:
                        "The oregano plants contains compounds that can deter certain insects.",
                    cost: "$10",
                },
                {
                    name: "Marigold",
                    image: "https://cdn.pixabay.com/photo/2022/02/22/05/45/marigold-7028063_1280.jpg",
                    description:
                        "Natural insect repellent, also adds color to the garden.",
                    cost: "$8",
                },
                {
                    name: "Geraniums",
                    image: "https://cdn.pixabay.com/photo/2012/04/26/21/51/flowerpot-43270_1280.jpg",
                    description:
                        "Known for their insect-repelling properties while adding a pleasant scent.",
                    cost: "$20",
                },
                {
                    name: "Basil",
                    image: "https://cdn.pixabay.com/photo/2016/07/24/20/48/tulsi-1539181_1280.jpg",
                    description:
                        "Repels flies and mosquitoes, also used in cooking.",
                    cost: "$9",
                },
                {
                    name: "Lavender",
                    image: "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    description: "Calming scent, used in aromatherapy.",
                    cost: "$20",
                },
                {
                    name: "Catnip",
                    image: "https://cdn.pixabay.com/photo/2015/07/02/21/55/cat-829681_1280.jpg",
                    description: "Repels mosquitoes and attracts cats.",
                    cost: "$13",
                },
            ],
        },
        {
            category: "Medicinal Plants",
            plants: [
                {
                    name: "Aloe Vera",
                    image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg",
                    description: "Soothing gel used for skin ailments.",
                    cost: "$14",
                },
                {
                    name: "Echinacea",
                    image: "https://cdn.pixabay.com/photo/2014/12/05/03/53/echinacea-557477_1280.jpg",
                    description: "Boosts immune system, helps fight colds.",
                    cost: "$16",
                },
                {
                    name: "Peppermint",
                    image: "https://cdn.pixabay.com/photo/2017/07/12/12/23/peppermint-2496773_1280.jpg",
                    description: "Relieves digestive issues and headaches.",
                    cost: "$13",
                },
                {
                    name: "Lemon Balm",
                    image: "https://cdn.pixabay.com/photo/2019/09/16/07/41/balm-4480134_1280.jpg",
                    description: "Calms nerves and promotes relaxation.",
                    cost: "$14",
                },
                {
                    name: "Chamomile",
                    image: "https://cdn.pixabay.com/photo/2016/08/19/19/48/flowers-1606041_1280.jpg",
                    description: "Soothes anxiety and promotes sleep.",
                    cost: "$15",
                },
                {
                    name: "Calendula",
                    image: "https://cdn.pixabay.com/photo/2019/07/15/18/28/flowers-4340127_1280.jpg",
                    description: "Heals wounds and soothes skin irritations.",
                    cost: "$12",
                },
            ],
        },
        {
            category: "Low Maintenance Plants",
            plants: [
                {
                    name: "ZZ Plant",
                    image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    description:
                        "Thrives in low light and requires minimal watering.",
                    cost: "$25",
                },
                {
                    name: "Pothos",
                    image: "https://cdn.pixabay.com/photo/2018/11/15/10/32/plants-3816945_1280.jpg",
                    description:
                        "Tolerates neglect and can grow in various conditions.",
                    cost: "$10",
                },
                {
                    name: "Snake Plant",
                    image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
                    description:
                        "Needs infrequent watering and is resilient to most pests.",
                    cost: "$15",
                },
                {
                    name: "Cast Iron Plant",
                    image: "https://cdn.pixabay.com/photo/2017/02/16/18/04/cast-iron-plant-2072008_1280.jpg",
                    description:
                        "Hardy plant that tolerates low light and neglect.",
                    cost: "$20",
                },
                {
                    name: "Succulents",
                    image: "https://cdn.pixabay.com/photo/2016/11/21/16/05/cacti-1846147_1280.jpg",
                    description:
                        "Drought-tolerant plants with unique shapes and colors.",
                    cost: "$18",
                },
                {
                    name: "Aglaonema",
                    image: "https://cdn.pixabay.com/photo/2014/10/10/04/27/aglaonema-482915_1280.jpg",
                    description:
                        "Requires minimal care and adds color to indoor spaces.",
                    cost: "$22",
                },
            ],
        },
    ];
    const styleObj = {
        backgroundColor: "#4CAF50",
        color: "#fff!important",
        padding: "15px",
        display: "flex",
        justifyContent: "space-between",
        alignIems: "center",
        fontSize: "20px",
    };
    const styleObjUl = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "1100px",
    };
    const styleA = {
        color: "white",
        fontSize: "30px",
        textDecoration: "none",
    };

    const handleHomeClick = (e) => {
        e.preventDefault();
        onHomeClick();
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true); // Set showCart to true when cart icon is clicked
    };
    const handlePlantsClick = (e) => {
        e.preventDefault();
        setShowPlants(true); // Set showAboutUs to true when "About Us" link is clicked
        setShowCart(false); // Hide the cart when navigating to About Us
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        setShowCart(false);
    };

    const handleAddToCart = (product) => {
        dispatch(addItem(product)); // Dispatch the action to add the product to the cart (Redux action)

        setAddedToCart((prevState) => ({
            // Update the local state to reflect that the product has been added
            ...prevState, // Spread the previous state to retain existing entries
            [product.name]: true, // Set the current product's name as a key with value 'true' to mark it as added
        }));
    };
    return (
        <div>
            <div className="navbar" style={styleObj}>
                <div className="tag">
                    <div className="luxury">
                        <img
                            src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png"
                            alt=""
                        />
                        <a href="/" onClick={(e) => handleHomeClick(e)}>
                            <div>
                                <h3 style={{ color: "white" }}>
                                    Healing Green
                                </h3>
                                <i style={{ color: "white" }}>
                                    Where Green Meets Serenity
                                </i>
                            </div>
                        </a>
                    </div>
                </div>
                <div style={styleObjUl}>
                    <div>
                        {" "}
                        <a
                            href="#"
                            onClick={(e) => handlePlantsClick(e)}
                            style={styleA}
                        >
                            Plants
                        </a>
                    </div>
                    <div>
                        {" "}
                        <a
                            href="#"
                            onClick={(e) => handleCartClick(e)}
                            style={styleA}
                        >
                            <h1
                                className="cart"
                                style={{
                                    position: "relative",
                                    display: "inline-block",
                                    margin: 0,
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 256 256"
                                    id="IconChangeColor"
                                    height="68"
                                    width="68"
                                >
                                    <rect
                                        width="156"
                                        height="156"
                                        fill="none"
                                    ></rect>
                                    <circle cx="80" cy="216" r="12"></circle>
                                    <circle cx="184" cy="216" r="12"></circle>
                                    <path
                                        d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8"
                                        fill="none"
                                        stroke="#faf9f9"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        id="mainIconPathAttribute"
                                    ></path>
                                </svg>
                                {cartCount > 0 && (
                                    <span
                                        style={{
                                            position: "absolute",
                                            top: "8px",
                                            right: "10px",
                                            background: "red",
                                            color: "white",
                                            borderRadius: "50%",
                                            padding: "2px 7px",
                                            fontSize: "18px",
                                            fontWeight: "bold",
                                            minWidth: "24px",
                                            textAlign: "center",
                                            zIndex: 2,
                                            pointerEvents: "none",
                                        }}
                                    >
                                        {cartCount}
                                    </span>
                                )}
                            </h1>
                        </a>
                    </div>
                </div>
            </div>
            {!showCart ? (
                <div className="product-grid">
                    {plantsArray.map(
                        (
                            category,
                            index // Loop through each category in plantsArray
                        ) => (
                            <div key={index}>
                                {" "}
                                {/* Unique key for each category div */}
                                <h1>
                                    <div>{category.category}</div>{" "}
                                    {/* Display the category name */}
                                </h1>
                                <div className="product-list">
                                    {" "}
                                    {/* Container for the list of plant cards */}
                                    {category.plants.map(
                                        (
                                            plant,
                                            plantIndex // Loop through each plant in the current category
                                        ) => (
                                            <div
                                                className="product-card"
                                                key={plantIndex}
                                            >
                                                {" "}
                                                {/* Unique key for each plant card */}
                                                <img
                                                    className="product-image"
                                                    src={plant.image} // Display the plant image
                                                    alt={plant.name} // Alt text for accessibility
                                                />
                                                <div className="product-title">
                                                    {plant.name}
                                                </div>{" "}
                                                {/* Display plant name */}
                                                {/* Display other plant details like description and cost */}
                                                <div className="product-description">
                                                    {plant.description}
                                                </div>{" "}
                                                {/* Display plant description */}
                                                <div className="product-cost">
                                                    {plant.cost}
                                                </div>{" "}
                                                {/* Display plant cost */}
                                                <button
                                                    className="product-button"
                                                    onClick={() =>
                                                        handleAddToCart(plant)
                                                    }
                                                    disabled={
                                                        !!addedToCart[
                                                            plant.name
                                                        ]
                                                    }
                                                    style={
                                                        !!addedToCart[
                                                            plant.name
                                                        ]
                                                            ? {
                                                                  backgroundColor:
                                                                      "#ccc",
                                                                  color: "#666",
                                                                  cursor: "not-allowed",
                                                              }
                                                            : {}
                                                    }
                                                >
                                                    {addedToCart[plant.name]
                                                        ? "Added to Cart"
                                                        : "Add to Cart"}
                                                </button>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        )
                    )}
                </div>
            ) : (
                <CartItem onContinueShopping={handleContinueShopping} />
            )}
        </div>
    );
}

export default ProductList;
