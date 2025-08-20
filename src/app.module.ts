import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactModule } from './contact/contact.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',   // your db username
      password: '1234',   // your db password
      database: 'biruha_contact', // your db name
      autoLoadEntities: true,
      synchronize: true, // ❗only in dev (auto creates tables)
    }),
    ContactModule,
    AuthModule,
  ],
})
export class AppModule {}
