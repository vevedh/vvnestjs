import { Injectable } from '@nestjs/common';
//import * as dotenv from 'dotenv';
import { Project, ImportDeclaration } from "ts-simple-ast";
import *  as path from 'path';
import * as fs from 'fs';
//import { VvproductsModule } from 'vvproducts/vvproducts.module';


@Injectable()
export class ToolsService {
    constructor() {

    }
    getDirName(): string {
        return process.cwd()
    }


    getAppModInfos() {
        const parser = new Project(); 
        const parserapp = parser.addExistingSourceFile(path.resolve(process.cwd() + "/src/app.module.ts"));
        let txttoreplace = parserapp.getClass("AppModule").getDecorators()[0].getArguments()[0].getText().replace("UsersModule,","UsersModule,VvproductsModule,")
        parserapp.getClass("AppModule").getDecorators()[0].removeArgument(0).insertArgument(0, txttoreplace);
        parserapp.addImportDeclaration({
            defaultImport: "{ VvproductsModule }",
            moduleSpecifier: "./vvproducts/vvproducts.module"
        });
       /* console.log("App module :", parserapp.addImportDeclaration({
            defaultImport: "{ VvproductsModule }",
            moduleSpecifier: "./vvproducts/vvproducts.module"
        }));

        */
        
        parser.save();
    }

    async createTable(dbname: string, tblname: string, schvalue:string): Promise<boolean> {

        console.log("App path :", path.resolve(process.cwd() + "/src/" + tblname));
        
        return new Promise<boolean>((resolve, reject) => {


            


            let dirtbl = path.resolve(process.cwd() + "/src/" + tblname);
            let dirSchemas = path.resolve(process.cwd() + "/src/" + tblname + "/schemas");
            let dirInterfaces = path.resolve(process.cwd() + "/src/" + tblname + "/interfaces");
            let dirDto = path.resolve(process.cwd() + "/src/" + tblname + "/dto");

           

           

            let datasSch = "";
            schvalue.split(',').forEach((value) => {
                datasSch = datasSch+ value + ",\n";
            });

            let datasIntface = "";
            schvalue.split(',').forEach((value) => {
                datasIntface = datasIntface + 'readonly ' + value + ",\n";
            });

            let createObjdata = "";
            schvalue.split(',').forEach((value) => {
                createObjdata = createObjdata + '\n@ApiModelProperty()\nreadonly ' + value + ";\n";
            });


            let dataInterface = `import { Document } from 'mongoose';

export interface I${tblname.charAt(0).toUpperCase() + tblname.substr(1, tblname.length-2).toLowerCase()} extends Document {
    ${datasIntface}
}`;
            let dataSchema = `import * as mongoose from 'mongoose';

export const ${tblname.charAt(0).toUpperCase()+tblname.substr(1,tblname.length-2).toLowerCase()}Schema = new mongoose.Schema({
   ${datasSch}
});`;

            let createObj = `import { ApiModelProperty } from '@nestjs/swagger';

export class Create${tblname.charAt(0).toUpperCase() + tblname.substr(1, tblname.length-2).toLowerCase()}Dto {
    @ApiModelProperty()
    readonly _id: number;
    ${createObjdata}
    
}`;
            let ifceObj = "I"+tblname.charAt(0).toUpperCase() + tblname.substr(1, tblname.length-2).toLowerCase();
            let shortObj = tblname.charAt(0).toUpperCase() + tblname.substr(1, tblname.length - 2).toLowerCase();
            let mshortObj = tblname.charAt(0).toUpperCase() + tblname.substr(1, tblname.length - 2).toLowerCase();
        
            let serviceObj = `import { ${ifceObj} } from './${tblname.toLowerCase()}.interface';

export interface ${ifceObj}Service {
    findAll(): Promise<${ifceObj}[]>;
    findById(ID: number): Promise<${ifceObj} | null>;
    findOne(options: object): Promise<${ifceObj} | null>;
    create(${tblname.toLowerCase()}: ${ifceObj}): Promise<${ifceObj}>;
    update(ID: number, newValue: ${ifceObj}): Promise<${ifceObj} | null>;
    delete(ID: number): Promise<string>;
}`;

            let indexObj = `export * from './${ifceObj.toLowerCase()}s.service';
export * from './${tblname.toLowerCase()}.interface';`;


            let ctrlObj = `import { Controller, Get, Response, HttpStatus, Param, Body, Post, Request, Patch, Delete } from '@nestjs/common';
import { ${tblname.charAt(0).toUpperCase() + tblname.substr(1, tblname.length).toLowerCase()}Service } from './${tblname.toLowerCase()}.service';
import { Create${tblname.charAt(0).toUpperCase() + tblname.substr(1, tblname.length - 2).toLowerCase()}Dto} from './dto/create${tblname.charAt(0).toUpperCase() + tblname.substr(1, tblname.length - 2).toLowerCase()}.dto';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';

@ApiUseTags('${tblname.toLowerCase()}')
@Controller('${tblname.toLowerCase()}')
export class ${tblname.charAt(0).toUpperCase() + tblname.substr(1, tblname.length).toLowerCase()}Controller {
    constructor(private readonly ${tblname.toLowerCase()}Service: ${tblname.charAt(0).toUpperCase() + tblname.substr(1, tblname.length).toLowerCase()}Service) {}

    @Get()
    public async get${tblname.charAt(0).toUpperCase() + tblname.substr(1, tblname.length).toLowerCase()}(@Response() res) {
        const ${tblname.toLowerCase()} = await this.${tblname.toLowerCase()}Service.findAll();
        return res.status(HttpStatus.OK).send(JSON.stringify(${tblname.toLowerCase()}));
    }

    @Get('find')
    public async find${tblname.charAt(0).toUpperCase() + tblname.substr(1, tblname.length - 2).toLowerCase()}(@Response() res, @Body() body) {
        const queryCondition = body;
        const ${tblname.toLowerCase()} = await this.${tblname.toLowerCase()}Service.findOne(queryCondition);
        return res.status(HttpStatus.OK).send(JSON.stringify(${tblname.toLowerCase()}));
    }

    @Get('/:id')
    public async get${tblname.charAt(0).toUpperCase() + tblname.substr(1, tblname.length - 2).toLowerCase()}(@Response() res, @Param() param){
        const ${tblname.toLowerCase()} = await this.${tblname.toLowerCase()}Service.findById(param.id);
        return res.status(HttpStatus.OK).send(JSON.stringify(${tblname.toLowerCase()}));
    }

    @Post()
    @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async create${tblname.charAt(0).toUpperCase() + tblname.substr(1, tblname.length - 2).toLowerCase()}(@Response() res, @Body() create${tblname.charAt(0).toUpperCase() + tblname.substr(1, tblname.length - 2).toLowerCase()}DTO: Create${tblname.charAt(0).toUpperCase() + tblname.substr(1, tblname.length - 2).toLowerCase()}Dto) {

        const ${tblname.substr(0, tblname.length - 1).toLowerCase()} = await this.${tblname.toLowerCase()}Service.create(create${tblname.charAt(0).toUpperCase() + tblname.substr(1, tblname.length - 2).toLowerCase()}DTO);
        return res.status(HttpStatus.OK).send(JSON.stringify(${tblname.substr(0, tblname.length -1).toLowerCase()}));
    }

    @Patch('/:id')
    public async update${tblname.charAt(0).toUpperCase() + tblname.substr(1, tblname.length - 2).toLowerCase()}(@Param() param, @Response() res, @Body() body) {

        const ${tblname.substr(0, tblname.length - 1).toLowerCase()} = await this.${tblname.toLowerCase()}Service.update(param.id, body);
        return res.status(HttpStatus.OK).send(JSON.stringify(${tblname.substr(0, tblname.length - 1).toLowerCase()}));
    }

    @Delete('/:id')
    public async delete${tblname.charAt(0).toUpperCase() + tblname.substr(1, tblname.length - 2).toLowerCase()}(@Param() param, @Response() res) {

        const ${tblname.substr(0, tblname.length - 1).toLowerCase()} = await this.${tblname.toLowerCase()}Service.delete(param.id);
        return res.status(HttpStatus.OK).send(JSON.stringify(${tblname.substr(0, tblname.length - 1).toLowerCase()}));
    }
}
`;


            let srvObj = `import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ${ifceObj},${ifceObj}sService } from './interfaces/index';
import { Create${shortObj}Dto } from './dto/create${shortObj}.dto';
import { debug } from 'console';

@Injectable()
export class ${shortObj}sService implements ${ifceObj}sService{
    constructor(@InjectModel('${shortObj}') private readonly ${shortObj.toLowerCase()}Model: Model<${ifceObj}>) { }

    async findAll(): Promise<${ifceObj}[]> {
        return await this.${shortObj.toLowerCase()}Model.find().exec();
    }

    async findOne(options: object): Promise<${ifceObj}> {
        return await this.${shortObj.toLowerCase()}Model.findOne(options).exec();
    }

    async findById(ID: number): Promise<${ifceObj}> {
        return await this.${shortObj.toLowerCase()}Model.findById(ID).exec();
    }
    async create(create${shortObj}Dto: Create${shortObj}Dto): Promise<${ifceObj}> {
        const created${shortObj} = new this.${shortObj.toLowerCase()}Model(create${shortObj}Dto);
        return await created${shortObj}.save();
    }

    async update(ID: number, newValue: ${ifceObj}): Promise<${ifceObj}> {
        const ${shortObj.toLowerCase()} = await this.${shortObj.toLowerCase()}Model.findById(ID).exec();

        if (!${shortObj.toLowerCase()}._id) {
            debug('${shortObj.toLowerCase()} not found');
        }

        await this.${shortObj.toLowerCase()}Model.findByIdAndUpdate(ID, newValue).exec();
        return await this.${shortObj.toLowerCase()}Model.findById(ID).exec();
    }
    async delete(ID: number): Promise<string> {
        try {
            await this.${shortObj.toLowerCase()}Model.findByIdAndRemove(ID).exec();
            return 'The ${shortObj.toLowerCase()} has been deleted';
        }
        catch (err){
            debug(err);
            return 'The ${shortObj.toLowerCase()} could not be deleted';
        }
    }
}
`;

            let moduleObj = `import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ${mshortObj}sController } from './${shortObj.toLowerCase()}s.controller';
import { ${mshortObj}sService } from './${shortObj.toLowerCase()}s.service';
import { ${mshortObj}Schema } from './schemas/${shortObj.toLowerCase()}.schema';
@Module({
    imports: [MongooseModule.forFeature([{ name: '${mshortObj}', schema: ${mshortObj}Schema }])],
    controllers: [${mshortObj}sController],
    providers: [${mshortObj}sService],
})
export class ${mshortObj}sModule {}`;



            const parser = new Project();
            const parserapp = parser.addExistingSourceFile(path.resolve(process.cwd() + "/src/app.module.ts"));
            let txttoreplace = parserapp.getClass("AppModule").getDecorators()[0].getArguments()[0].getText().replace("UsersModule,", `UsersModule,${mshortObj}sModule,`)
            parserapp.getClass("AppModule").getDecorators()[0].removeArgument(0).insertArgument(0, txttoreplace);
            parserapp.addImportDeclaration({
                defaultImport: `{ ${mshortObj}sModule }`,
                moduleSpecifier: `./${mshortObj.toLowerCase()}s/${mshortObj.toLowerCase()}s.module`
            });

            parser.save();


            fs.exists(dirtbl, (exists) => {
                console.log('Exists :', exists);
                if (exists) {
                    resolve(false);
                } else {
                    fs.mkdir(dirtbl, (err) => {
                        if (!err) {
                            // creation du schemas
                            fs.mkdir(dirSchemas, (err) => {
                                if (!err) {
                                    fs.mkdir(dirInterfaces, (err) => {
                                        if (!err) {
                                            fs.mkdir(dirDto, (err) => {
                                                if (!err) {
                                                    fs.writeFile(dirSchemas + "/" + tblname.substr(0, tblname.length - 1).toLowerCase()+".schema.ts",dataSchema ,(err)=>{
                                                        if (!err) {
                                                            fs.writeFile(dirInterfaces + "/" + tblname.toLowerCase() + ".interface.ts", dataInterface, (err) => {
                                                                if (!err) {
                                                                    fs.writeFile(dirDto + "/create" + tblname.charAt(0).toUpperCase() + tblname.substr(1, tblname.length-2).toLowerCase() + ".dto.ts", createObj, (err) => {
                                                                        if (!err) {
                                                                            fs.writeFile(dirInterfaces + "/i" + tblname.toLowerCase() + ".service.ts", serviceObj, (err) => {
                                                                                if (!err) {
                                                                                    fs.writeFile(dirInterfaces + "/index.ts", indexObj, (err) => {
                                                                                        if (!err) {
                                                                                            fs.writeFile(dirtbl + "/" + tblname.toLowerCase() + ".controller.ts", ctrlObj, (err) => {
                                                                                                if (!err) {
                                                                                                    fs.writeFile(dirtbl + "/" + tblname.toLowerCase() + ".service.ts", srvObj, (err) => {
                                                                                                        if (!err) {
                                                                                                            fs.writeFile(dirtbl + "/" + tblname.toLowerCase() + ".module.ts", moduleObj, (err) => {
                                                                                                                if (!err) {
                                                                                                                    resolve(true);
                                                                                                                } else {
                                                                                                                    reject(err);
                                                                                                                }
                                                                                                            });
                                                                                                        } else {
                                                                                                            reject(err);
                                                                                                        }
                                                                                                    });
                                                                                                } else {
                                                                                                    reject(err);
                                                                                                }
                                                                                            });
                                                                                        } else {
                                                                                            reject(err);
                                                                                        }
                                                                                    });
                                                                                } else {
                                                                                    reject(err);
                                                                                }
                                                                            });
                                                                        } else {
                                                                            reject(err);
                                                                        }
                                                                    });
                                                                } else {
                                                                    reject(err);
                                                                }
                                                            });
                                                        } else {
                                                            reject(err);
                                                        }
                                                    });
                                                } else {
                                                    reject(err);
                                                }
                                            })
                                        } else {
                                            reject(err);
                                        }
                                    })
                                } else {
                                    reject(err);
                                }
                            })
                            //resolve(true);
                        } else {
                            reject(err);
                        }
                    })
                }

            });
        });


    }
}
