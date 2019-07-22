import React from 'react'
import RouteButton from './RouteButton'
import MyOrders from './MyOrders';
import CartKanvasPicture from './CartKanvasPicture';
import CartFramingPic from './CartFramingPic';
import CartFramMirror from './CartFramMirror';
import CartCutGlass from './CartCutGlass';
import CartCutMirror from './CartCutMirror';


const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    input: {
        margin: theme.spacing.unit,
    },
});


class ServicesInOrder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            order: '',
            customer: '',
            error: null,
            position: 0,
            cutMirrorAndGlass: [],
            framePicture: [],
            frameMirror: [],
            picKanvas: [],
        }
      
    }

    componentDidMount() {

        let idOrder = this.props.match.params.id;
        if (window.location.hostname === "localhost") {
            Promise.all([
                fetch('http://localhost:49934/api/CutMirrorAndGlass/' + idOrder),
                fetch('http://localhost:49934/api/FramePicture/' + idOrder),
                fetch('http://localhost:49934/api/FrameMirror/' + idOrder),
                fetch('http://localhost:49934/api/AllFinalProduct/' + idOrder),
            ])
                .then(([res1, res2, res3, res4]) => Promise.all([res1.json(), res2.json(), res3.json(), res4.json()]))
                .then(res => {
                    this.setState({ cutMirrorAndGlass: res[0], framePicture: res[1], frameMirror: res[2], picKanvas: res[3] })
    
                }).catch(error => this.setState({ error: "There was an error in getting the Services" }));
        }
        else{

            Promise.all([
                fetch('http://proj.ruppin.ac.il/bgroup81/prod/api/CutMirrorAndGlass/' + idOrder),
                fetch('http://proj.ruppin.ac.il/bgroup81/prod/api/FramePicture/' + idOrder),
                fetch('http://proj.ruppin.ac.il/bgroup81/prod/api/FrameMirror/' + idOrder),
                fetch('http://proj.ruppin.ac.il/bgroup81/prod/api/AllFinalProduct/' + idOrder),
            ])
                .then(([res1, res2, res3, res4]) => Promise.all([res1.json(), res2.json(), res3.json(), res4.json()]))
                .then(res => {
                    this.setState({ cutMirrorAndGlass: res[0], framePicture: res[1], frameMirror: res[2], picKanvas: res[3] })
    
                }).catch(error => this.setState({ error: "There was an error in getting the Services" }));

        }
       
    }


    render() {

        return (
            <div className={styles.container} >
                <div className="ServicesInOrder">
                    <h3>פריטים בהזמנה מספר <u>{this.props.match.params.id}:</u></h3>

                    {this.state.framePicture.map((row, i) => (
                        <div className="FrameingPicture" key={i}>
                            <CartFramingPic localwidthPass={row.PaspartuWidth}
                                localGlassCode={row.GlassCode}
                                localcodePass={row.PaspartuCode}
                                localHeight={row.Height} localWidth={row.Width}
                                localPriceTotal={row.PriceToOne} localframeCode={row.FrameCode}
                                localimageFrame={row.Image}
                                localId={"."}
                                localGlassType={"זכוכית"}
                                num={0}
                                serviceInOrder={1}
                            ></CartFramingPic>
                            <hr />
                        </div>
                    ))}

                    {this.state.frameMirror.map((row, i) => (
                        <div className="FrameingMirror" key={i}>
                            <CartFramMirror localHeight={row.Height} localWidth={row.Width}
                                localPriceTotal={row.PriceToOne} localframeCode={row.FrameCode} localId={i} Notes={row.Notes} num={0}  serviceInOrder={1}>
                            </CartFramMirror>
                            <hr />
                        </div>
                    ))}

                    {this.state.cutMirrorAndGlass.map((row, i) => (

                        <div className="CuttingMirrorAndGlass" key={i}>
                            {row.ServiceCode !== 3 ? <CartCutGlass localHeight={row.Height} localWidth={row.Width} localRemarks={row.Remarks}
                                localId={i} localPriceTotal={row.PriceToOne}
                                localDataGlass={row.ProductCode} localDataGlassType={"זכוכית"} num={0}>
                            </CartCutGlass> :
                                <CartCutMirror localHeight={row.Height} localWidth={row.Width} localRemarks={row.Remarks}
                                    localId={i} localPriceTotal={row.PriceToOne}
                                    localDataMirrorMakat={row.ProductCode} localFaza={row.Faza} localDataMirrorType={"מראה"} num={0}
                                 
                                ></CartCutMirror>}
                            <hr />
                        </div>
                    ))}

                    {this.state.picKanvas.map((row, i) => (
                        <div className="PicKanvas" key={i}>
                            <CartKanvasPicture
                                localDescription={row.Name} localLength_Width={row.Length_Width} localPrice={row.Price}
                                localMakat={row.Makat} localImage={row.Image} localId={i} num={0} serviceInOrder={1}
                            ></CartKanvasPicture>
                            <hr />
                        </div>
                    ))}
                </div>
                <br />
                <RouteButton value=' חזור לזמנות ' pathname={"/MyOrders"} Component={MyOrders} />&nbsp;
            </div>
        )
    }
}
export default ServicesInOrder


