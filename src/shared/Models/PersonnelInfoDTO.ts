import { CodeListValueDTO } from "./CodeListValueDTO";

export class PersonnelDTO {
    id: number;
    officeId: number
    agencyEmployeeNumber: string;
    lastName: string;
    firstName: string;
    middleName: string;
    extensionName: string;
    nickName: string;
    sexId: string;
    profilePhoto: string;
    isDeleted: boolean;
    codeValue: CodeListValueDTO;  
}