import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('verification')
@Controller('verification')
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) {}
}