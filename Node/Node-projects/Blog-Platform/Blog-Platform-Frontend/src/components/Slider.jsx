import React from 'react'

function Slider() {
    return (
        <>
            <div id="carouselExample" className="carousel slide position-relative">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img height={"400px"} src="https://plus.unsplash.com/premium_photo-1661808783954-8079b10583fd?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dHJhdmVsJTIwYmxvZ3xlbnwwfHwwfHx8MA%3D%3D" className="d-block w-100 object-fit-cover" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://www.poweradmin.com/blog/wp-content/uploads/2019/01/tech-blogs.jpg" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img height={"700px"} src="https://d27fp5ulgfd7w2.cloudfront.net/wp-content/uploads/2019/01/08160759/tech-blogs-1.jpg" className="d-block w-100 object-fit-cover" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev h-25 position-absolute  " type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true" ></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next h-25 position-absolute" type="button" aria-hidden="true" data-bs-target="#carouselExample" data-bs-slide="next">
                    <span className="carousel-control-next-icon" ></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </>
    )
}

export default Slider