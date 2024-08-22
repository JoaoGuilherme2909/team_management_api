import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ReportService } from './report.service';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiBearerAuth()
@ApiTags('reports')
@Controller('report')
export class ReportController {
  constructor(private reportService: ReportService) {}

  @ApiOperation({ summary: 'Get the report' })
  @UseGuards(AuthGuard)
  @Get('/:projectId')
  @ApiParam({
    name: 'projectId',
    required: true,
    schema: { type: 'string' },
  })
  async getReport(@Param('projectId') projectId: string, @Req() req) {
    return this.reportService.generateReport(req.user.sub, projectId);
  }
}
