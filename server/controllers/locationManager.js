const { StatusCodes } = require('http-status-codes');
const Locations = require('../database/locations.json');
const asyncWrapper = require('../middleware/async');

// Find provinces
const findProvinces = asyncWrapper(async (req, res, next) => {
    var provinces = [];
    Locations.provinces.forEach(province => {
        provinces.push(province.name);
    });

    res.status(StatusCodes.OK).json({ provinces: provinces });
})

// Find districts
const findDistricts = asyncWrapper(async (req, res, next) => {
    const { province: selectedProvince } = req.query;

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

    res.status(StatusCodes.OK).json({ districts: districts })
});

// Find sectors
const findSectors = asyncWrapper(async (req, res, next) => {
    const { 
        province: selectedProvince, 
        district: selectedDistrict 
    } = req.query;
    
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

    res.status(StatusCodes.OK).json({ sectors: sectors })
});

// Find cells
const findCells = asyncWrapper(async (req, res, next) => {
    const { 
        province: selectedProvince, 
        district: selectedDistrict, 
        sector: selectedSector 
    } = req.query;
    
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
    res.status(StatusCodes.OK).json({ cells: cells })
});

// Find villages
const findVillages = asyncWrapper(async (req, res, next) => {
    const { 
        province: selectedProvince, 
        district: selectedDistrict, 
        sector: selectedSector, 
        cell: selectedCell 
    } = req.query;

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

    res.status(StatusCodes.OK).json({ villages: villages })
});

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