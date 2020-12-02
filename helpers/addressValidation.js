
import { restart } from "nodemon";
import DB from "../models";



const sanitizeAddress = (address) => {
    const {
        area_id,
        user_id,
        coordinates,
        nickname,
        governate,
        details,
        building,
        street = "",
        floor = "",
        flat = "",
        driver_notes = "",
    } = address;
    // validate numeric fields
    if (
        isNaN(user_id) ||
        isNaN(area_id)
    ) {
        return false;
    }
    // validate string fields
    if (
        typeof (nickname) !== 'string' ||
        typeof (governate) !== 'string' ||
        typeof (details) !== 'string' ||
        typeof (building) !== 'string' ||
        typeof (street) !== 'string' ||
        typeof (floor) !== 'string' ||
        typeof (flat) !== 'string' ||
        typeof (coordinates) !== 'string' ||
        typeof (driver_notes) !== 'string'
    ) {
        return false;
    }
    // validate coordinates
    if (!coordinates.match(/^(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)$/)) {
        return false;
    }
    // address is sanitized
    return true;
}


/*
*
* check if address is valid
* @params: address (obj), validationType (string)
* @returns: boolean
*
*/
const validateAddress = async (address) => {
    // sanitize address fields
    if (!sanitizeAddress) {
        return false;
    }
    // validate area
    const area = await DB.Area.findOne({
        where: {
            id: address.area_id,
        }
    });
    if (area === null) {
        return false;
    }
    // address is valid
    return true;
}


export { validateAddress };

