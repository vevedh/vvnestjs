import { ApiModelProperty } from '@nestjs/swagger';

export class CreateVvticketDto {
    @ApiModelProperty()
    readonly _id: number;
    
@ApiModelProperty()
readonly magasin: String;

@ApiModelProperty()
readonly  numero: Number;

@ApiModelProperty()
readonly  probleme: String;

    
}