import { Controller, Post, Response, Body, Req, HttpStatus, Get, Query } from '@nestjs/common';
import { ApiUseTags, ApiResponse, ApiImplicitParam } from '@nestjs/swagger';
import { ToolsService } from './tools.service';





@ApiUseTags('tools')
@Controller('tools')
export class ToolsController {

    constructor(private readonly toolsService: ToolsService) { 

    }


    @Get('getdir')
    public async getAppDir(@Response() res) {
        const result = await this.toolsService.getDirName();
        return res.status(HttpStatus.OK).send({ result: result});
    }

    @Get('getAppModInfos')
    public async getAppModInfos(@Response() res) {
        const result = await this.toolsService.getAppModInfos();
        return res.status(HttpStatus.OK).send({ result: result });
    }


    
    @Post('createTable')
    public async createTest(@Response() res, @Query('dbname') dbname: string, @Query('tblname') tblname: string, @Query('schvalue') schname: string) {

        const result = await this.toolsService.createTable(dbname,tblname,schname);

        return res.status(HttpStatus.OK).send({ result: result });

    }

    @Post()
    @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async createTodo(@Response() res, @Req() req) {

        //const todo = await this.todosService.create(createTodoDTO);
        return res.status(HttpStatus.OK).send({ status: 'success'});
    }
}
