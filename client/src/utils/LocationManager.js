import axios from "axios";

// Find provinces
export function findProvinces() {
    const provinces = [];

    axios.get(`http://localhost:5050/api/v1/mmpas/locations/provinces?province=${selectedProvince}`)
    .then(response => {
        sectors = response.data.provinces;
    })
    .catch(error => {
        console.log(error);
    })
    
    return provinces;
}

// Find districts
export function findDistricts(selectedProvince) {
    var districts = [];

    axios.get(`http://localhost:5050/api/v1/mmpas/locations/districts?province=${selectedProvince}`)
    .then(response => {
        districts = response.data.districts;
    })
    .catch(error => {
        console.log(error);
    })

    return districts;
}

// Find sectors
export const findSectors = (selectedProvince, selectedDistrict) => {
    var sectors = [];
    
    axios.get(`http://localhost:5050/api/v1/mmpas/locations/sectors?province=${selectedProvince}&district=${selectedDistrict}`)
    .then(response => {
        sectors = response.data.sectors;
    })
    .catch(error => {
        console.log(error);
    })

    return sectors;
}   

// Find cells
export const findCells = (selectedProvince, selectedDistrict, selectedSector) => {
    var cells = [];
    
    axios.get(`http://localhost:5050/api/v1/mmpas/locations/cells?province=${selectedProvince}&district=${selectedDistrict}&sector=${selectedSector}`)
    .then(response => {
        cells = response.data.cells;
    })
    .catch(error => {
        console.log(error);
    })
    
    return cells;
}

// Find villages
export const findVillages = (selectedProvince, selectedDistrict, selectedSector, selectedCell) => {
    
    // return villages;
}

// console.log(findProvinces());
// console.log(findDistricts());
// console.log(findDistricts('Umujyi wa Kigali'));
// console.log(findDistricts('Iburengerazuba'));
// console.log(findDistricts('Amajyaruguru'));
// console.log(findDistricts('Iburasirazuba'));
// console.log(findSectors('Iburasirazuba', 'Kayonza'));
// console.log(findVillages('Iburasirazuba', 'Kayonza', 'Murama','Nyakanazi'));