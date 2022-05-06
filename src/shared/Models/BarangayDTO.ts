import { MunicipalityDTO } from "./MunicipalityDTO"
import { ProvinceDTO } from "./ProvinceDTO"
import { RegionDTO } from "./RegionDTO"

export class BarangayDTO{
    brgyCode: number
    brgyDescription: number
    regionCode: number
    provinceCode: number
    municipalityCode: number
    municipality: MunicipalityDTO
    province: ProvinceDTO
    region: RegionDTO
}