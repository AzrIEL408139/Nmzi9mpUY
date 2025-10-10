// 代码生成时间: 2025-10-11 02:10:22
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from './interfaces/user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { throwError } from 'rxjs';

@Injectable()
export class JwtService {
    constructor(
        private jwt: JwtService,
        private configService: ConfigService,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    /**
     * Generates a JWT token for a user.
     * @param payload The payload to be included in the JWT token.
     * @returns The generated JWT token.
     */
    async generateToken(payload: JwtPayload): Promise<string> {
        const secret = this.configService.get('JWT_SECRET');
        if (!secret) {
            return throwError(new Error('JWT secret is not defined'));
        }
        const expiresIn = this.configService.get('JWT_EXPIRATION');
        return this.jwt.sign(payload, { secret, expiresIn });
    }

    /**
     * Validates a given JWT token and returns the payload if valid.
     * @param token The JWT token to be verified.
     * @returns The payload if the token is valid, or throws an error if not.
     */
    async validateToken(token: string): Promise<JwtPayload> {
        try {
            const secret = this.configService.get('JWT_SECRET');
            const payload = this.jwt.verify(token, { secret });
            return payload as JwtPayload;
        } catch (error) {
            return throwError(error);
        }
    }

    /**
     * Finds a user by the JWT payload.
     * @param payload The payload from the JWT.
     * @returns The user entity if found.
     */
    async getUserByPayload(payload: JwtPayload): Promise<User | null> {
        const { username } = payload;
        return this.userRepository.findOne({ where: { username } });
    }
}