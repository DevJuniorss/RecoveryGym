import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateAnamnesisDto {
  @IsNotEmpty()
  @ApiProperty()
  studentId: number;

  @IsNotEmpty()
  @ApiProperty()
  painLocation: string;

  @IsNotEmpty()
  @ApiProperty()
  painStartDate: string;

  @IsNotEmpty()
  @ApiProperty()
  painOnset: string;

  @IsNotEmpty()
  @ApiProperty()
  painProgression: string;

  @IsNotEmpty()
  @ApiProperty()
  painType: string;

  @IsNotEmpty()
  @ApiProperty()
  painDuration: string;

  @IsNotEmpty()
  @ApiProperty()
  painRadiation: string;

  @IsNotEmpty()
  @ApiProperty()
  painIntensity: string;

  @IsNotEmpty()
  @ApiProperty()
  painActivityLimitation: string;

  @IsNotEmpty()
  @ApiProperty()
  painPeakTime: string;

  @IsNotEmpty()
  @ApiProperty()
  painReliefFactors: string;

  @IsNotEmpty()
  @ApiProperty()
  painWorseningFactors: string;

  @IsNotEmpty()
  @ApiProperty()
  painRelatedSymptoms: string;
}
