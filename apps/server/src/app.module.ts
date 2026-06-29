import { Module } from '@nestjs/common';

import { PresentationAppModule } from '@/presentation/app';

@Module({
  imports: [PresentationAppModule],
})
export class AppModule {}
