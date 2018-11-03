import { Controller, Get, Response, HttpStatus, Param, Body, Post, Request, Patch, Delete } from '@nestjs/common';
import { VvproductsService } from './vvproducts.service';
import { CreateVvproductDto} from './dto/createVvproduct.dto';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';

@ApiUseTags('vvproducts')
@Controller('vvproducts')
export class VvproductsController {
    constructor(private readonly vvproductsService: VvproductsService) {}

    @Get()
    public async getVvproducts(@Response() res) {
        const vvproducts = await this.vvproductsService.findAll();
        return res.status(HttpStatus.OK).send(JSON.stringify(vvproducts));
    }

    @Get('find')
    public async findVvproduct(@Response() res, @Body() body) {
        const queryCondition = body;
        const vvproducts = await this.vvproductsService.findOne(queryCondition);
        return res.status(HttpStatus.OK).send(JSON.stringify(vvproducts));
    }

    @Get('/:id')
    public async getVvproduct(@Response() res, @Param() param){
        const vvproducts = await this.vvproductsService.findById(param.id);
        return res.status(HttpStatus.OK).send(JSON.stringify(vvproducts));
    }

    @Post()
    @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async createVvproduct(@Response() res, @Body() createVvproductDTO: CreateVvproductDto) {

        const vvproduct = await this.vvproductsService.create(createVvproductDTO);
        return res.status(HttpStatus.OK).send(JSON.stringify(vvproduct));
    }

    @Patch('/:id')
    public async updateVvproduct(@Param() param, @Response() res, @Body() body) {

        const vvproduct = await this.vvproductsService.update(param.id, body);
        return res.status(HttpStatus.OK).send(JSON.stringify(vvproduct));
    }

    @Delete('/:id')
    public async deleteVvproduct(@Param() param, @Response() res) {

        const vvproduct = await this.vvproductsService.delete(param.id);
        return res.status(HttpStatus.OK).send(JSON.stringify(vvproduct));
    }
}
