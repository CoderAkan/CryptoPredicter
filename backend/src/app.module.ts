import { Module } from '@nestjs/common';
import { AssetsModule } from './assets/assets.module';
import { PricesModule } from './prices/prices.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { configValidationSchema } from './config/validation.schema';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { ExternalApisModule } from './external-apis/external-apis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: configValidationSchema,
      envFilePath: ['.env.local', '.env'],
      expandVariables: true,
    }),
    AssetsModule,
    PricesModule,
    PrismaModule,
    ExternalApisModule
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
