import { Controller, Get, Req, Res, Session, HttpStatus, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/createUser.dto';

@ApiUseTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }
    @Get('')
    @ApiOperation({ title: 'Get List of All Users' })
    @ApiResponse({ status: 200, description: 'User Found.' })
    @ApiResponse({ status: 404, description: 'No Users found.' })
    public async getAllUsers(@Req() req: Request, @Res() res, @Session() session) {
        const users = await this.usersService.findAll();
        return res
            .status(HttpStatus.OK)
            .send(users);
    }
    @Post('')
    @ApiOperation({ title: 'Create User' })
    public async create(@Body() createUser: CreateUserDto, @Res() res) {
        await this.usersService.create(createUser);
        return res.status(HttpStatus.CREATED).send();
    }
}
