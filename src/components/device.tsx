import React from "react";
import "../App.css";
import axios from "axios";
import {DeviceItem} from "./deviceItem";
import {GridItem} from "./gridItem";
import {IDeviceProps} from "../model/deviceModel";
import {Alerts} from "./alerts";
import {MEGAPACK_2_XL, MEGAPACK_2, MEGAPACK, POWERPACK} from "../constants/deviceContants";

export const Device = () => {
    /* Declare the states */
    const [devices, setDevices] = React.useState<IDeviceProps[]>([]);
    const [totalEstimatedCost, setTotalEstimatedCost] = React.useState(0);
    const [totalQuantity, setTotalQuantity] = React.useState(0);
    const [totalEnergy, setTotalEnergy] = React.useState(0);
    const [totalAreaRequired, setTotalAreaRequired] = React.useState(0);
    const [gridItems, setGridItems] = React.useState<React.ReactElement[]>([]);
    const [showAlert, setShowAlert] = React.useState(false);

    /* Retrieve the devices json input */
    React.useEffect(() => {
        axios.get("./device.json")
            .then((res ) => setDevices(res.data))
            .catch(err => console.log(err))
    },[]);

    //onAdd Reducer
    const onAdd = (index: number) => {
        const newDevices = [...devices];
        devices[index].quantity++;
        setDevices(newDevices);
        addGridElements(newDevices[index].deviceName);
        reCalculateSummaryVitals();
    };

    //onRemove Reducer
    const onRemove = (index: number) => {
        const newDevices = [...devices];
        if(newDevices[index].quantity > 0){
            newDevices[index].quantity--;
            setDevices(newDevices);
            reCalculateSummaryVitals();
        }
    };

    const reCalculateSummaryVitals = () =>{
        checkToAddANewTransformer();
        calculateTotalQuantity();
        calculateTotalCost();
        calculateTotalEnergy();
        calculateTotalArea();
    }
    const calculateTotalQuantity = () => {
        let total = devices.reduce(
            (totalQuantity, device) =>
                totalQuantity + device.quantity,
            0
        );
        setTotalQuantity(total);
    };
    const calculateTotalCost = () => {
        let total = devices.reduce(
            (totalCost, device) =>
                totalCost + device.cost * device.quantity,
            0
        );
        setTotalEstimatedCost(total);
    };
    const calculateTotalEnergy = () => {
        let total = devices.reduce(
            (totalEnergy, device) =>
                totalEnergy + device.energy * device.quantity,
            0
        );
        setTotalEnergy(total);
    };
    const calculateTotalArea = () => {
        let total = devices.reduce(
            (totalArea, device) =>
                totalArea + (Number(device.dimension.substring(0,2)) *
                    (Number(device.dimension.substring(7,9))* device.quantity)),
            0
        );
        setTotalAreaRequired(total);
    };

    //ASSUMPTION: This method checks if batteries of any kind other than transformers are added 4 in no, then add a transformer for it.
    const checkToAddANewTransformer = () => {
        const deviceListOtherThanTransformer = devices.filter(i => i.deviceId !== 5 && i.quantity>0);
        const deviceCountOtherThanTransformer  = deviceListOtherThanTransformer.reduce(
            (totalNoOfDevices, device) =>
                totalNoOfDevices + device.quantity,
            0
        );
        const listOfTransformers = devices.filter(i => i.deviceId === 5 && i.quantity>0);
        const noOfTransformers  = listOfTransformers.reduce(
            (totalNoOfDevices, device) =>
                totalNoOfDevices + device.quantity,
            0
        );
        if(deviceCountOtherThanTransformer%4 === 0 && (deviceCountOtherThanTransformer/4 > noOfTransformers)){
            const newDevices = [...devices];
            newDevices[4].quantity++;
            setDevices(newDevices);
            setShowAlert(true);
        }else if ((deviceCountOtherThanTransformer)%4 === 3){
            if(deviceCountOtherThanTransformer/4 < noOfTransformers && noOfTransformers !== 0){
                const newDevices = [...devices];
                newDevices[4].quantity--;
                setDevices(newDevices);
                setShowAlert(false);
            }
        }
    };

    /* The below set of methods are added to dynamically populate the grids STARTS */

    function createGrid(rows:number, columns:number) {
        const grid = document.createElement("div");
        grid.className = "grid-item";
        grid.style.gridRow = `span ${rows}`;
        grid.style.gridColumn = `span ${columns}`;
        const container = document.getElementById("grid-container");
        container?.appendChild(grid);
    }

    function isGridAvailable(row :number, column :number, rows : number, columns :number, gridArray : boolean[][]) {
        for (let r = row; r < row + rows; r++) {
            for (let c = column; c < column + columns; c++) {
                if (gridArray[r] && gridArray[r][c]) {
                    return true;
                }
            }
        }
        return false;
    }
    function addGrid(rows : number, columns :number, gridArray: boolean[][]) {
        let row, column;
        do {
            row = Math.floor(Math.random() * (10 - rows));
            column = Math.floor(Math.random() * (10 - columns));
        } while (isGridAvailable(row, column, rows, columns, gridArray));
        for (let r = row; r < row + rows; r++) {
            for (let c = column; c < column + columns; c++) {
                gridArray[r][c] = true;
            }
        }
       createGrid(rows,columns);
    }
    const addGridElements =  (deviceName :string) =>{
        const gridArray =  [];
        let rows =0,columns = 0;
        for (let i = 0; i < 10; i++) {
            gridArray.push(new Array(10).fill(false));
        }
        if(deviceName === MEGAPACK_2_XL){
            rows=1; columns= 4;
        }else if(deviceName === MEGAPACK_2){
            rows=1; columns= 3;
        }else if(deviceName === MEGAPACK){
            rows=1; columns= 3;
        }else if(deviceName === POWERPACK){
            rows=1; columns=1;
        }else{
            rows=1; columns=1;
        }
        addGrid(rows, columns, gridArray);
    }

    /* The below set of methods are added to dynamically populate the grids ENDS */

    return (
        <>
            <div className="device-container">
                <div className="col-md-8 device-section">
                    <DeviceItem
                        devices={devices}
                        onAddHandler={onAdd}
                        onRemoveHandler={onRemove}
                        totalEstimatedCost={totalEstimatedCost}
                    />
                    <div className="col-md-4 summary">
                        <h5><b>SUMMARY</b></h5>
                        { showAlert ?
                            <Alerts>A transformer is needed for every 4 industrial batteries</Alerts>
                            : null }
                        <hr />
                        <div className="row" style={{ border: 1 }}>
                            <div className="col">TOTAL ITEMS</div>
                            <div className="col text-right"><b>{totalQuantity}</b></div>
                        </div>
                        <div className="row" style={{ border: 1 }}>
                            <div className="col">TOTAL ENERGY DENSITY</div>
                            <div className="col text-right"><b>{totalEnergy} MWh</b></div>
                        </div>
                        <div className="row" style={{ border: 1 }}>
                            <div className="col">REQUIRED LAND DIMENSION</div>
                            <div className="col text-right"><b>{totalAreaRequired} sqft</b></div>
                        </div>
                        <div className="row" style={{ border: 1 }}>
                            <div className="col">TOTAL PRICE</div>
                            <div className="col text-right"><b>${totalEstimatedCost}</b></div>
                        </div>
                        <div id="grid-container" className="grid-container col-xs-12 board">
                        </div>
                        <div className="row" style={{ border: 1 }}>
                            <div className="col"></div>
                            <div className="col text-right"><button className="btn">Checkout</button></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}