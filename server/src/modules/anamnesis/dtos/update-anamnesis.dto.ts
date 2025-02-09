import { ApiProperty } from '@nestjs/swagger';

export class UpdateAnamnesisDto {
  @ApiProperty()
  studentId?: number;

  @ApiProperty()
  painLocation?: string;

  @ApiProperty()
  painStartDate?: string;

  @ApiProperty()
  painOnset?: string;

  @ApiProperty()
  painProgression?: string;

  @ApiProperty()
  painType?: string;

  @ApiProperty()
  painDuration?: string;

  @ApiProperty()
  painRadiation?: string;

  @ApiProperty()
  painIntensity?: string;

  @ApiProperty()
  painActivityLimitation?: string;

  @ApiProperty()
  painPeakTime?: string;

  @ApiProperty()
  painReliefFactors?: string;

  @ApiProperty()
  painWorseningFactors?: string;

  @ApiProperty()
  painRelatedSymptoms?: string;
}
