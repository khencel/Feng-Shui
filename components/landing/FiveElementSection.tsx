export default function FiveElementSection() {
    return (
        <>
        <div className="text-center">
            <h5 style={{color:"#D9BB80"}}>THE FIVE ELEMENTS</h5>
        </div>
        <div className="row justify-content-center align-items-center">
            <div className="col-md-2">
                <div className="text-center">  
                    <img src="/img/wood.png" style={{width:"100px"}} className="img-fluid" alt="" />
                </div>
                <div className="text-center text-white">
                    <span style={{fontSize:"14px"}}>WOOD</span>
                    <br/>
                    <span style={{fontSize:"12px"}}>Growth, Vitality and new beginnings</span>
                </div>
            </div>
            <div className="col-md-2">
                <div className="text-center">  
                    <img src="/img/fire.png" style={{width:"100px"}} className="img-fluid" alt="" />
                </div>
                <div className="text-center text-white">
                    <span style={{fontSize:"14px"}}>FIRE</span>
                    <br/>
                    <span style={{fontSize:"12px"}}>Passion, energy and transformation</span>
                </div>
            </div>
            <div className="col-md-2">
                <div className="text-center">  
                    <img src="/img/earth.png" style={{width:"100px"}} className="img-fluid" alt="" />
                </div>
                <div className="text-center text-white">
                    <span style={{fontSize:"14px"}}>EARTH</span>
                    <br/>
                    <span style={{fontSize:"12px"}}>Stability, harmony and nurturing</span>
                </div>
            </div>
            <div className="col-md-2">
                <div className="text-center">  
                    <img src="/img/metal.png" style={{width:"100px"}} className="img-fluid" alt="" />
                </div>
                <div className="text-center text-white">
                    <span style={{fontSize:"14px"}}>METAL</span>
                    <br/>
                    <span style={{fontSize:"12px"}}>Clarity, precision and focus</span>
                </div>
            </div>
            <div className="col-md-2">
                <div className="text-center">
                    <img src="/img/water.png" style={{width:"100px"}} className="img-fluid" alt="" />
                </div>
                <div className="text-center text-white">
                    <span style={{fontSize:"14px"}}>WATER</span>
                    <br/>
                    <span style={{fontSize:"12px"}}>Flow, abundance and adaptability</span>
                </div>
            </div>
        </div>
        </>
    )
}