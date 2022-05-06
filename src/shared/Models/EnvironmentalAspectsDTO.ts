export class EnvironmentalAspectsDTO{
    Id: number;
    AspectDescription: string;
    constructor(private _id: number, private _aspectDescription: string)
    {
        this.Id = _id ?? 0;
        this.AspectDescription = _aspectDescription ?? null;
    }
}