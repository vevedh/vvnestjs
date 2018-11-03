import { Controller, Get, Response, HttpStatus, Param, Body, Post, Request, Patch, Delete } from '@nestjs/common';
import { VvticketsService } from './vvtickets.service';
import { CreateVvticketDto} from './dto/createVvticket.dto';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';

@ApiUseTags('vvtickets')
@Controller('vvtickets')
export class VvticketsController {
    constructor(private readonly vvticketsService: VvticketsService) {}

    @Get()
    public async getVvtickets(@Response() res) {
        const vvtickets = await this.vvticketsService.findAll();
        return res.status(HttpStatus.OK).send(JSON.stringify(vvtickets));
    }

    @Get('find')
    public async findVvticket(@Response() res, @Body() body) {
        const queryCondition = body;
        const vvtickets = await this.vvticketsService.findOne(queryCondition);
        return res.status(HttpStatus.OK).send(JSON.stringify(vvtickets));
    }

    @Get('/:id')
    public async getVvticket(@Response() res, @Param() param){
        const vvtickets = await this.vvticketsService.findById(param.id);
        return res.status(HttpStatus.OK).send(JSON.stringify(vvtickets));
    }

    @Post()
    @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async createVvticket(@Response() res, @Body() createVvticketDTO: CreateVvticketDto) {

        const vvticket = await this.vvticketsService.create(createVvticketDTO);
        return res.status(HttpStatus.OK).send(JSON.stringify(vvticket));
    }

    @Patch('/:id')
    public async updateVvticket(@Param() param, @Response() res, @Body() body) {

        const vvticket = await this.vvticketsService.update(param.id, body);
        return res.status(HttpStatus.OK).send(JSON.stringify(vvticket));
    }

    @Delete('/:id')
    public async deleteVvticket(@Param() param, @Response() res) {

        const vvticket = await this.vvticketsService.delete(param.id);
        return res.status(HttpStatus.OK).send(JSON.stringify(vvticket));
    }
}
