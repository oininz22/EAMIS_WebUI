import { RolesDTO } from "./RolesDTO";

export class UserRolesDTO {
    id:number;
    userId:number; 
    roleId: number;
    isDeleted: boolean;
    roles:RolesDTO;
    constructor(private _id?:number,private _userId?:number,private _roleId?:number,private _isDeleted?:boolean)
    {
        this.id = _id;
        this.roleId = _roleId;
        this.isDeleted =_isDeleted;
    }
}