"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const crypto_1 = require("crypto");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../../config/user.entity");
let AuthService = class AuthService {
    constructor(usersRepository, jwtService) {
        this.usersRepository = usersRepository;
        this.jwtService = jwtService;
    }
    async register(input) {
        const existing = await this.usersRepository.findOne({
            where: { email: input.email.toLowerCase() },
        });
        if (existing) {
            throw new common_1.ConflictException('An account with this email already exists');
        }
        const user = this.usersRepository.create({
            name: input.name.trim(),
            email: input.email.trim().toLowerCase(),
            password: this.hashPassword(input.password),
            city: input.city?.trim() || 'Dushanbe',
            phone: input.phone?.trim() || '',
            plan: 'Starter',
        });
        const savedUser = await this.usersRepository.save(user);
        return this.buildAuthResponse(savedUser);
    }
    async login(input) {
        const user = await this.usersRepository.findOne({
            where: { email: input.email.trim().toLowerCase() },
        });
        if (!user || !this.verifyPassword(input.password, user.password)) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        return this.buildAuthResponse(user);
    }
    async me(userId) {
        const user = await this.usersRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return this.serializeUser(user);
    }
    async requestPasswordReset(input) {
        const user = await this.usersRepository.findOne({
            where: { email: input.email.trim().toLowerCase() },
        });
        return {
            message: user
                ? 'Reset instructions have been sent to your email'
                : 'If this email exists, reset instructions have been sent',
        };
    }
    buildAuthResponse(user) {
        const expiresIn = 60 * 60 * 24 * 2;
        const accessToken = this.jwtService.sign({
            sub: user.id,
            email: user.email,
        }, {
            secret: process.env.JWT_SECRET || 'ai-mechanic-dev-secret',
            expiresIn,
        });
        return {
            accessToken,
            expiresIn,
            user: this.serializeUser(user),
        };
    }
    serializeUser(user) {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            city: user.city,
            phone: user.phone,
            plan: user.plan,
            createdAt: user.createdAt,
        };
    }
    hashPassword(password) {
        const salt = (0, crypto_1.randomBytes)(16).toString('hex');
        const hash = (0, crypto_1.scryptSync)(password, salt, 64).toString('hex');
        return `${salt}:${hash}`;
    }
    verifyPassword(password, stored) {
        const [salt, originalHash] = stored.split(':');
        const comparisonHash = (0, crypto_1.scryptSync)(password, salt, 64);
        const originalBuffer = Buffer.from(originalHash, 'hex');
        return (0, crypto_1.timingSafeEqual)(originalBuffer, comparisonHash);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map