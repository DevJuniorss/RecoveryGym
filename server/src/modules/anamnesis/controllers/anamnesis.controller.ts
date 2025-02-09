import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AnamnesisService } from '../services/anamnesis.service';
import { CreateAnamnesisDto } from '../dtos/create-anamnesis.dto';
import { UpdateAnamnesisDto } from '../dtos/update-anamnesis.dto';

@Controller('anamnesis')
export class AnamnesisController {
  constructor(private readonly anamnesisService: AnamnesisService) {}

  @Get()
  async getAllAnamnesis() {
    return await this.anamnesisService.getAllAnamnesis();
  }

  @Get(':id')
  async getAnamnesisById(@Param('id') anamnesisId: string) {
    const id = parseInt(anamnesisId);
    return await this.anamnesisService.getAnamnesisById(id);
  }

  @Post()
  async createAnamnesis(@Body() createAnamnesisDto: CreateAnamnesisDto) {
    await this.anamnesisService.createAnamnesis(createAnamnesisDto);
  }

  @Put(':id')
  async updateAnamnesis(
    @Param('id') anamnesisId: string,
    @Body() updateAnamnesisDto: UpdateAnamnesisDto,
  ) {
    const id = parseInt(anamnesisId);
    await this.anamnesisService.updateAnamnesis(id, updateAnamnesisDto);
  }

  @Delete(':id')
  async deleteAnamnesis(@Param('id') anamnesisId: string) {
    const id = parseInt(anamnesisId);
    return await this.anamnesisService.deleteAnamnesis(id);
  }
}
