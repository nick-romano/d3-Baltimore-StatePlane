import * as d3 from "d3";


class svgUtils {
    //takes path and color and creates 50x50 pixel svg
    createPathElement(props) {
        return <div>
            <svg height={50} width={65}>
                {/* <circle r={50} cx={"50%"} cy={"50%"}></circle> */}
                <path d={props.radius} fill={props.Color} cy={0} />
            </svg>
        </div>
    };

    getPath(object, extent) {
            const geomFunctions = d3.geoPath()
                .projection(d3.geoTransverseMercator()
                    .rotate([77, -37.66666666666666])
                    .fitSize([50, 50], extent));
    
            const path = geomFunctions(object)
            return path
    };
    
}

export default svgUtils