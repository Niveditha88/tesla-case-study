import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleMinus, faCirclePlus} from "@fortawesome/free-solid-svg-icons";
import React from 'react';
import {IDeviceProps} from '../model/deviceModel';
export const DeviceItem = (props : any) => {
    const removeItemHandler = (index:number) => {
            props.onRemoveHandler(
                index
            )
    };

    const addItemHandler = (index:number) => {
            props.onAddHandler(
                index
            )
    };

    return (
        <>
            <table>
                <thead>
                <tr>
                    <th>DEVICE NAME</th>
                    <th>SIZE</th>
                    <th>ENERGY</th>
                    <th>QUANITY</th>
                    <th>COST/UNIT</th>
                </tr>
                </thead>
           <tbody>
           {props.devices.map((device:IDeviceProps, index:number) => {
               return (
            <tr key={device.deviceId}>
                <td>{device.deviceName}</td>
                <td>{device.dimension}</td>
                <td style={{textAlign:"center"}}>{device.energy}MWh</td>
                <td><button id="remove">
                    <FontAwesomeIcon icon={faCircleMinus} onClick={() =>
                        removeItemHandler(index)} />
                </button>
                    <span> {device.quantity} </span>
                    <button id="add">
                        <FontAwesomeIcon icon={faCirclePlus} onClick={() =>
                            addItemHandler(index)} />
                    </button></td>
                <td>${device.cost}</td>
            </tr>
               )})}
               <tr><td></td><td></td><td></td><td><h3>TOTAL COST</h3></td><td><b>${props.totalEstimatedCost}</b></td></tr>

           </tbody>
            </table>
        </>
    );
};