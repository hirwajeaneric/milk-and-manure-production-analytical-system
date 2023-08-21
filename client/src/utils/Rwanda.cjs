const Locations = require('./locations.json');

// Find provinces
function findProvinces() {
    var provinces = [];
    Locations.provinces.forEach(province => {
        provinces.push(province.name);
    });
    return provinces;
}

// Find districts
function findDistricts(selectedProvince) {
    !selectedProvince ? selectedProvince = 'Umujyi wa Kigali' : selectedProvince;

    var districtData = []
    Locations.provinces.forEach((province, index) => {
        if (province.name === selectedProvince) {
            districtData = province.districts;
        }
    });
    
    var districts = [];
    districtData.forEach((district) => {
        districts.push(district.name);
    });

    return districts;
}

// Find sectors
const findSectors = (selectedProvince, selectedDistrict) => {
    var sectorData = [];
    var districts = []

    Locations.provinces.forEach(province => {
        if (province.name == selectedProvince) {
            districts = province.districts;
        }
    })

    districts.forEach((district) => {
        if (district.name === selectedDistrict) {
            sectorData = district.sectors;
        }
    });

    var sectors = [];
    sectorData.forEach((sector) => {
        sectors.push(sector.name);
    });

    return sectors;
}   

// Find cells
const findCells = (selectedProvince, selectedDistrict, selectedSector) => {
    var districts = []
    var sectors = [];
    var cellsData = [];
    var cells = [];

    Locations.provinces.forEach(province => {
        if (province.name == selectedProvince) {
            districts = province.districts;
        }
    })

    districts.forEach((district) => {
        if (district.name === selectedDistrict) {
            sectors = district.sectors;
        }
    });

    sectors.forEach((sector) => {
        if (sector.name === selectedSector) {
            cellsData = sector.cells;
        }
    });

    cellsData.forEach((cell) => {
        cells.push(cell.name);
    })
    
    return cells;
}

// Find villages
const findVillages = (selectedProvince, selectedDistrict, selectedSector, selectedCell) => {
    var districts = []
    var sectors = [];
    var cells = [];
    var villagesData = [];
    var villages = [];

    Locations.provinces.forEach(province => {
        if (province.name == selectedProvince) {
            districts = province.districts;
        }
    })

    districts.forEach((district) => {
        if (district.name === selectedDistrict) {
            sectors = district.sectors;
        }
    });

    sectors.forEach((sector) => {
        if (sector.name === selectedSector) {
            cells = sector.cells;
        }
    });

    cells.forEach((cell) => {
        if (cell.name === selectedCell) {
            villagesData = cell.villages;
        }
    });

    villagesData.forEach(village => {
        villages.push(village.name);
    })
    
    return villages;
}

// console.log(findProvinces());
// console.log(findDistricts());
// console.log(findDistricts('Umujyi wa Kigali'));
// console.log(findDistricts('Iburengerazuba'));
// console.log(findDistricts('Amajyaruguru'));
// console.log(findDistricts('Iburasirazuba'));
// console.log(findSectors('Iburasirazuba', 'Kayonza'));
// console.log(findVillages('Iburasirazuba', 'Kayonza', 'Murama','Nyakanazi'));

module.exports = {
    findProvinces,
    findDistricts,
    findSectors,
    findCells,
    findVillages
}