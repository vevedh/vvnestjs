import { ApiModelProperty } from '@nestjs/swagger';

export class CreateVvproductDto {
    @ApiModelProperty()
    readonly _id: number;
    
@ApiModelProperty()
readonly nom:String;

@ApiModelProperty()
readonly description:String;

@ApiModelProperty()
readonly prix:Number;

@ApiModelProperty()
readonly vendu:Boolean;

@ApiModelProperty()
readonly reserver:Boolean;

    
}