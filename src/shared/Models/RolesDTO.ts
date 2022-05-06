export class RolesDTO{
    id:number;
    role_Name:string;
    isDeleted:boolean;
    constructor(private _id?:number,_role_Name?:string,_isDeleted?:boolean)
    {
    this.id = _id;
    this.role_Name =_role_Name;
    this.isDeleted = _isDeleted;
    }
    
}